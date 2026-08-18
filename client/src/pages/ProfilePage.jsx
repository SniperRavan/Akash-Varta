import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import assets, { getUserAvatar } from "../assets/assets";
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

  const displayAvatar = previewUrl || (authUser ? getUserAvatar(authUser) : assets.avatar_icon);

  return (
    <div
      className="min-h-screen bg-[#090814] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundImage: `url(${assets.bgImage})` }}
    >
      <div className="w-full max-w-2xl backdrop-blur-3xl bg-white/[0.04] border border-white/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-8 relative z-10">
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Profile Details</h2>
          <Link
            to="/"
            className="text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5"
          >
            ← Back to Chat
          </Link>
        </div>

        <div className="flex items-center justify-between max-sm:flex-col-reverse gap-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 w-full">
            <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer group">
              <input
                onChange={handleImageChange}
                type="file"
                id="avatar"
                accept="image/*"
                className="hidden"
              />
              <img
                src={displayAvatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-400 group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-medium text-purple-300 group-hover:text-purple-200">
                Upload Profile image
              </span>
            </label>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-stone-300 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="p-3 rounded-xl border border-white/15 bg-white/[0.07] backdrop-blur-md text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-stone-300 font-medium">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell others about yourself..."
                className="p-3 rounded-xl border border-white/15 bg-white/[0.07] backdrop-blur-md text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-medium py-3 px-6 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] active:scale-95 transition-all cursor-pointer disabled:opacity-50 text-sm"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>

          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/40 shadow-2xl"
                src={displayAvatar}
                alt="Profile View"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{name || "Your Name"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


