import { useEffect, useState } from "react";
import {
  User,
  Upload,
  FileText,
  Building2,
  Stethoscope,
  Mail,
  BadgeCheck,
  CheckCircle2,
} from "lucide-react";

import axiosInstance from "../../utils/AxiosInstance";

function EnhanceProfile() {
  const [profile, setProfile] = useState(null);
  const [degreeCertificate, setDegreeCertificate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
            "Unable to load doctor profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("File size must be less than 5MB.");
      setDegreeCertificate(null);
      return;
    }

    setError("");
    setSuccess("");
    setDegreeCertificate(file);
  };

  const handleUploadDocument = async () => {
    if (!degreeCertificate) {
      setError("Please select a document first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("document", degreeCertificate);

      const response = await axiosInstance.post(
        "/upload/document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data.user);

      setSuccess("Document uploaded successfully.");
      setDegreeCertificate(null);
    } catch (error) {
      console.error("Document upload failed:", error);

      setError(
        error.response?.data?.message ||
          "Document upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading doctor profile...
        </p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Doctor profile unavailable
        </h2>

        <p className="mt-2 text-gray-500">
          {error || "Unable to fetch your profile."}
        </p>
      </div>
    );
  }

  return (
    <div className="text-gray-900">
      <h1 className="text-center text-3xl font-bold text-blue-600">
        Doctor Profile
      </h1>

      <p className="mb-10 mt-2 text-center text-gray-600">
        View your professional information and upload credentials
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
            Doctor
          </p>

          {profile.isDoctorVerified && (
            <div className="mt-2 flex items-center gap-1 text-sm font-semibold text-green-600">
              <BadgeCheck size={17} />
              Verified Doctor
            </div>
          )}
        </div>

        <div className="space-y-4">

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
              <Stethoscope
                size={20}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Specialization
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {profile.specialization ||
                    "Not added yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Building2
                size={20}
                className="text-blue-600"
              />

              <div>
                <p className="text-xs font-medium text-gray-400">
                  Hospital / Clinic
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {profile.hospital ||
                    "Not added yet"}
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-gray-900">
            Medical Credential
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload your medical degree or verification document.
          </p>
        </div>

        {profile.documents && (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4">

            <div className="flex items-center gap-3">
              <CheckCircle2
                size={20}
                className="text-green-600"
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-green-700">
                  Document Uploaded
                </p>

                <a
                  href={profile.documents}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block truncate text-sm text-blue-600 hover:underline"
                >
                  View uploaded document
                </a>
              </div>
            </div>

          </div>
        )}

        <div className="mt-5">

          <label
            htmlFor="degreeCertificate"
            className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 px-4 py-4 transition hover:border-blue-500 hover:bg-blue-100"
          >
            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                {degreeCertificate ? (
                  <FileText size={20} />
                ) : (
                  <Upload size={20} />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {degreeCertificate
                    ? degreeCertificate.name
                    : "Choose Medical Document"}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  PDF, JPG or PNG • Maximum 5MB
                </p>
              </div>
            </div>

            <span className="ml-3 shrink-0 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
              Choose
            </span>
          </label>

          <input
            type="file"
            id="degreeCertificate"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />

        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <button
          type="button"
          disabled={!degreeCertificate || uploading}
          onClick={handleUploadDocument}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {uploading
            ? "Uploading..."
            : profile.documents
              ? "Upload New Document"
              : "Upload Document"}
        </button>

        <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            Your uploaded medical document can be reviewed for doctor verification.
          </p>
        </div>

      </div>
    </div>
  );
}

export default EnhanceProfile;