import { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosInstance.get("/dashboard/Profile");

        setProfile(response.data.user);
      } catch (error) {
        console.error("Profile fetch failed:", error);

        setError(
          error.response?.data?.message ||
            "Unable to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Unable to load profile
        </h2>

        <p className="mt-2 text-gray-500">
          {error}
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-16 text-center text-gray-500">
        Profile not found.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-blue-600">
        My Profile
      </h1>

      <p className="mt-2 mb-10 text-center text-gray-600">
        View your account information
      </p>

      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex flex-col items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <User
              size={40}
              className="text-blue-600"
            />
          </div>

          <h2 className="mt-4 text-xl font-bold text-gray-900">
            {profile.fullname}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {profile.role}
          </p>

        </div>

        <div className="space-y-5">

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <User
                size={20}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Full Name
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {profile.fullname}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Mail
                size={20}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Email Address
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={20}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Account Type
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {profile.role}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <BadgeCheck
                size={20}
                className={
                  profile.isVerified
                    ? "text-green-600"
                    : "text-yellow-500"
                }
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Verification Status
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    profile.isVerified
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {profile.isVerified
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MyProfile;