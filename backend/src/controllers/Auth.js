import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { User } from "../modal/UserSchema.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { sendEmail } from "../utils/sendEmail.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : "";

const generateOtp = () =>
  crypto.randomInt(100000, 1000000).toString();

const hashOtp = (otp) =>
  crypto.createHash("sha256").update(otp).digest("hex");

const clearOtp = (user) => {
  user.otpHash = undefined;
  user.otpExpiry = undefined;
  user.otpPurpose = undefined;
};

const createToken = (user) =>
  jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

const publicUser = (user) => ({
  fullname: user.fullname,
  email: user.email,
  role: user.role,
});

const sendOtpEmail = async (email, otp, purpose) => {
  const isSignup = purpose === "signup";

  await sendEmail({
    to: email,
    subject: isSignup
      ? "Verify your MineQueue account"
      : "Reset your MineQueue password",
    text: `Your MineQueue verification code is ${otp}. It expires in 10 minutes. If you did not request this, ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px">
        <h2 style="color:#111827">MineQueue</h2>
        <p>${isSignup ? "Verify your email address" : "Reset your password"} using the code below.</p>
        <div style="font-size:30px;font-weight:bold;letter-spacing:6px;padding:20px;background:#f3f4f6;text-align:center;border-radius:8px">
          ${otp}
        </div>
        <p>This code expires in 10 minutes.</p>
        <p style="color:#6b7280;font-size:13px">If you did not request this, you can ignore this email. Never share this code.</p>
      </div>
    `,
  });
};

const signup = async (req, res) => {
  try {
    const { fullname, password, role } = req.body;
    const email = normalizeEmail(req.body.email);

    if (
      typeof fullname !== "string" ||
      fullname.trim().length < 2 ||
      !email ||
      typeof password !== "string" ||
      password.length < 8 ||
      !["Doctor", "Patient"].includes(role)
    ) {
      return res.status(400).json({
        message: "Please provide valid signup details. Password must be at least 8 characters.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const otp = generateOtp();

    const user = await User.create({
      fullname: fullname.trim(),
      email,
      password: await bcrypt.hash(password, 10),
      role,
      authProvider: "local",
      isVerified: false,
      otpHash: hashOtp(otp),
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      otpPurpose: "signup",
    });

    try {
      await sendOtpEmail(email, otp, "signup");
    } catch (mailError) {
      console.error("Signup email error:", mailError);
      await User.deleteOne({ _id: user._id, isVerified: false });
      return res.status(503).json({
        message: "Unable to send verification email. Please try again.",
      });
    }

    return res.status(201).json({
      message: "Account created. Please verify the OTP sent to your email.",
      email: user.email,
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({ message: "Signup failed." });
  }
};

const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const { password } = req.body;

    if (!email || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = await User.findOne({ email });

    if (!user || user.authProvider !== "local" || !user.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        requiresVerification: true,
      });
    }

    return res.status(200).json({
      message: "Login successful",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed." });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();

    if (!email || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      user.authProvider !== "local" ||
      user.isVerified ||
      user.otpPurpose !== "signup" ||
      !user.otpHash ||
      !user.otpExpiry
    ) {
      return res.status(400).json({
        message: "Invalid or expired verification code.",
      });
    }

    if (Date.now() > user.otpExpiry.getTime()) {
      return res.status(400).json({
        message: "Invalid or expired verification code.",
      });
    }

    if (hashOtp(otp) !== user.otpHash) {
      return res.status(400).json({
        message: "Invalid or expired verification code.",
      });
    }

    user.isVerified = true;
    clearOtp(user);
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ message: "OTP verification failed." });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);

    if (!email) {
      return res.status(400).json({ message: "Valid email is required." });
    }

    const user = await User.findOne({ email });

    // Same response prevents revealing whether an account exists.
    const responseMessage =
      "If an eligible account exists, a password reset code has been sent.";

    if (!user || user.authProvider !== "local") {
      return res.status(200).json({ message: responseMessage });
    }

    const otp = generateOtp();

    user.otpHash = hashOtp(otp);
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otpPurpose = "reset";
    await user.save();

    try {
      await sendOtpEmail(email, otp, "reset");
    } catch (mailError) {
      console.error("Reset email error:", mailError);
      return res.status(503).json({
        message: "Unable to send reset email. Please try again.",
      });
    }

    return res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Request failed." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const otp = String(req.body.otp || "").trim();
    const { newPassword } = req.body;

    if (
      !email ||
      !/^\d{6}$/.test(otp) ||
      typeof newPassword !== "string" ||
      newPassword.length < 8
    ) {
      return res.status(400).json({
        message: "Valid OTP and a password of at least 8 characters are required.",
      });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      user.authProvider !== "local" ||
      user.otpPurpose !== "reset" ||
      !user.otpHash ||
      !user.otpExpiry ||
      Date.now() > user.otpExpiry.getTime() ||
      hashOtp(otp) !== user.otpHash
    ) {
      return res.status(400).json({
        message: "Invalid or expired reset code.",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    clearOtp(user);
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully. Please log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Password reset failed." });
  }
};

const GoogleOAuth = async (req, res) => {
  try {
    const { credential, role = "Patient" } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google credential is required" });
    }

    if (!["Patient", "Doctor"].includes(role)) {
      return res.status(400).json({ message: "Invalid account role" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload?.email || !payload.email_verified) {
      return res.status(401).json({
        message: "Google account verification failed",
      });
    }

    const googleId = payload.sub;
    const email = payload.email.toLowerCase().trim();
    const fullname = payload.name || email.split("@")[0];

    let user = await User.findOne({ googleId });

    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        if (user.authProvider !== "google") {
          return res.status(409).json({
            message: "An account with this email already exists. Please sign in using your password.",
          });
        }

        if (user.googleId && user.googleId !== googleId) {
          return res.status(409).json({
            message: "This email is linked to another Google account",
          });
        }

        user.googleId = googleId;
        user.isVerified = true;
        await user.save();
      } else {
        user = await User.create({
          fullname,
          email,
          role,
          googleId,
          authProvider: "google",
          isVerified: true,
        });
      }
    }

    return res.status(200).json({
      message: "Google authentication successful",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Google OAuth error:", error);
    return res.status(401).json({
      message: "Google authentication failed",
    });
  }
};

export {
  signup,
  login,
  verifyOtp,
  GoogleOAuth,
  forgetPassword,
  resetPassword,
};