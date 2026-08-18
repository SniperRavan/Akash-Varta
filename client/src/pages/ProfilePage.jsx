import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [selectedImg, setSelectedImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [saving, setSaving] = useState(false);

  // Synchronize state when authUser finishes loading
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
      if (authUser.profilePicture) {
        setPreviewUrl(authUser.profilePicture);
      }
    }
  }, [authUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      setSaving(false);
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onloadend = async () => {
      await updateProfile({
        profilePicture: reader.result,
        fullName: name,
        bio,
      });
      setSaving(false);
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl overflow-hidden shadow-2xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-4 flex-1">
          <h3 className="text-xl font-medium text-white">Profile Details</h3>

          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer group">
            <input
              onChange={handleImageChange}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg, .gif, .webp"
              className="hidden"
            />
            <img
              src={previewUrl || authUser?.profilePicture || assets.avatar_icon}
              alt="Avatar Preview"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 group-hover:opacity-80 transition-opacity"
            />
            <span className="text-sm text-purple-300 group-hover:text-purple-200">
              Upload Profile image
            </span>
          </label>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-stone-400">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="p-2.5 rounded-md border border-gray-500 bg-white/10 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-stone-400">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell others about yourself..."
              className="p-2.5 rounded-md border border-gray-500 bg-white/10 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-purple-500 to-violet-900 text-white font-semibold py-3 px-4 rounded-md shadow-[0_4px_24px_0_rgba(111,78,124,0.17)] hover:shadow-[0_8px_32px_0_rgba(111,78,124,0.28)] active:scale-95 transition-all duration-150 ease-out cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>

        <div className="flex flex-col items-center justify-center p-6">
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-purple-500/50 shadow-lg"
            src={previewUrl || authUser?.profilePicture || assets.avatar_icon}
            alt="Profile View"
          />
          <p className="mt-3 text-sm font-medium text-white">{name || "Your Name"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

