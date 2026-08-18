import avatar_icon from "./avatar_icon.png";
import gallery_icon from "./gallery_icon.svg";
import help_icon from "./help_icon.png";
import logo_icon from "./logo_icon.svg";
import logo_big from "./logo_big.svg";
import login from "./login.png";
import logo from "./logo.png";
import profile_richard from "./profile_richard.png";
import profile_alison from "./profile_alison.png";
import profile_enrique from "./profile_enrique.png";
import profile_marco from "./profile_marco.png";
import profile_martin from "./profile_martin.png";
import search_icon from "./search_icon.png";
import send_button from "./send_button.svg";
import menu_icon from "./menu_icon.png";
import arrow_icon from "./arrow_icon.png";
import code from "./code.svg";
import bgImage from "./bgImage.svg";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

const assets = {
  avatar_icon,
  gallery_icon,
  help_icon,
  logo_big,
  login,
  logo_icon,
  logo,
  search_icon,
  send_button,
  menu_icon,
  arrow_icon,
  code,
  bgImage,
  profile_martin,
  profile_richard,
  profile_alison,
  profile_enrique,
  profile_marco,
  pic1,
  pic2,
  pic3,
  pic4,
  img1,
  img2,
};

export default assets;

// Default media grid presets
export const imagesDummyData = [pic1, pic2, pic3, pic4];

// Helper to resolve real avatar for all users and demo profiles
export const getUserAvatar = (user) => {
  if (user?.profilePicture && user.profilePicture.trim()) {
    return user.profilePicture;
  }
  const name = user?.fullName?.toLowerCase() || "";
  if (name.includes("alison") || name.includes("caroline")) return assets.profile_alison;
  if (name.includes("martin") || name.includes("presley")) return assets.profile_martin;
  if (name.includes("enrique")) return assets.profile_enrique;
  if (name.includes("marco")) return assets.profile_marco;
  if (name.includes("richard") || name.includes("alex")) return assets.profile_richard;
  if (name.includes("john")) return assets.profile_marco;

  const presets = [
    assets.profile_alison,
    assets.profile_martin,
    assets.profile_enrique,
    assets.profile_marco,
    assets.profile_richard,
  ];
  const charCode = (user?._id || user?.fullName || "a").charCodeAt(0) || 0;
  return presets[charCode % presets.length];
};


