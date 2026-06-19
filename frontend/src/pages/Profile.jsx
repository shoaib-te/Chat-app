import React, { useContext, useState, useEffect } from "react";
import { FiCamera, FiX, FiEdit2 } from "react-icons/fi";
import { AuthContext } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import {Socket} from "socket.io-client"
function Profile() {
  const { user, updateProfile } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  // Controls whether we are in "Edit Mode" (true) or "View Mode" (false)
  const [isEditing, setIsEditing] = useState(false);

  // Local state to manage form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });

  // Sync state if user data loads late from AuthContext
  useEffect(() => {
    if (!user) return;

    // Defer the state update to avoid cascading-render warnings
    queueMicrotask(() => {
      setFormData({
        username: user.name || "",
        email: user.email || "",
        profilePicture: user.profilePicture || "",
      });
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

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

      await updateProfile(formPayload);
      console.log("Profile updated successfully!");
      setIsEditing(false); // Return to view mode after saving
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const displayName = formData.name || "User";

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
                {isEditing ? "Edit Profile" : "User Profile"}
              </p>
              <h1 className="text-3xl font-semibold text-base-content truncate max-w-[240px]">
                {displayName}
              </h1>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-ghost btn-square text-base-content hover:bg-base-content/10"
                  title="Edit Profile"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn btn-ghost btn-square text-base-content hover:bg-base-content/10"
                  title="Cancel"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => navigate("/")}
                className="btn btn-ghost btn-square text-base-content hover:bg-base-content/10"
                title="Go Home"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
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
                {!formData.profilePicture && (
                  <span className="text-4xl font-bold text-white select-none">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}

                {isEditing && (
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
                )}
              </div>
            </div>

            <p className="mt-4 text-sm text-base-content/80 font-medium">
              {formData.email || "No email set"}
            </p>
          </div>

          {/* Conditional View: Form for Editing vs Static Data for Viewing */}
          {isEditing ? (
            <form onSubmit={handleSave} className="mt-8 space-y-4">
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
                  required
                />
              </div>

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
                  required
                />
              </div>

              <div className="mt-6 pt-2 flex gap-3">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-primary-content"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-4 border-t border-base-content/10 pt-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-base-content/50 block">Username</span>
                <span className="text-lg text-base-content font-medium">{formData.username || "—"}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-base-content/50 block">Email Address</span>
                <span className="text-lg text-base-content font-medium">{formData.email || "—"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
