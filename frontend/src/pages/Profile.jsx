import React, { useContext, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import { AuthContext } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";

function Profile() {
  // Assuming AuthContext provides user, logout, and an update function
  const { user, updateProfile  } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  // Local state to manage form fields
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Captures the actual binary File object
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file, // Stores the file object in your form state
      }));
    }
  };
  // Handle profile save submission
  const handleSave = async (e) => {
    e.preventDefault();
    if (!updateProfile) return;

    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("email", formData.email);
      if (formData.profilePicture instanceof File) {
        formPayload.append("profilePicture", formData.profilePicture);
      }
      // Trigger context update (usually makes an API call internally)
      await updateProfile(formPayload);
        console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  // Fallback styling display text if data hasn't loaded yet
  const displayName = formData.username || "User";

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-base-content/10 bg-base-100 shadow-2xl backdrop-blur-xl">
        {/* Background Ambient Glow */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-primary/20 to-transparent blur-2xl opacity-90 pointer-events-none"></div>

        <div className="relative p-6">
          {/* Header Block */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-base-content/60">
                Profile
              </p>
              <h1 className="text-3xl font-semibold text-base-content truncate max-w-[280px]">
                {displayName}
              </h1>
            </div>
            <button
              onClick={() => navigate("/")}
              className="btn btn-ghost btn-square text-base-content hover:bg-base-content/10"
              title="Logout"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Interactive Avatar Block */}
          <div className="mt-6 flex flex-col items-center text-center">
            <div className="avatar">
              <div
                className="w-28 h-28 rounded-full ring ring-primary ring-offset-4 ring-offset-base-100 shadow-2xl relative group overflow-hidden bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundColor: "#7c3aed",
                  backgroundImage: formData.profilePicture
                    ? `url(${formData.profilePicture instanceof File ? URL.createObjectURL(formData.profilePicture) : formData.profilePicture})`
                    : "none",
                }}
              >
                {/* Only show the first letter fallback if there is no image */}
                {!formData.profilePicture && (
                  <span className="text-4xl font-bold text-white transition-opacity group-hover:opacity-20 select-none">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}

                <label
                  htmlFor="profilePicture"
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <FiCamera className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    id="profilePicture"
                    onChange={handleFileChange}
                    name="profilePicture"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <p className="mt-4 text-sm text-base-content/80 font-medium">
              {formData.email || "No email set"}
            </p>
          </div>

          {/* User Fields Form */}
          <form onSubmit={handleSave} className="mt-8 space-y-4">
            {/* Username Input */}
            <div className="form-control w-full">
              <label className="label p-1">
                <span className="label-text text-base-content/70 font-semibold uppercase tracking-wider text-xs">
                  Username
                </span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input input-bordered w-full bg-base-200 text-base-content focus:outline-none focus:border-primary"
                placeholder="Enter username"
              />
            </div>

            {/* Email Address Input */}
            <div className="form-control w-full">
              <label className="label p-1">
                <span className="label-text text-base-content/70 font-semibold uppercase tracking-wider text-xs">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full bg-base-200 text-base-content focus:outline-none focus:border-primary"
                placeholder="Enter email address"
              />
            </div>

            {/* Action Footer Button placed inside form to handle submit naturally */}
            <div className="mt-6 pt-2 flex gap-3">
              <button
                type="submit"
                className="btn btn-primary flex-1 text-primary-content"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
