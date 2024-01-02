import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
const navigation = [
    {
      id: 0,
      name: "Home",
      route: "/",
      icon: HomeIcon,
    },
    {
      id: 1,
      name: "My Uploads",
      route: "/uploads",
      icon: UploadFileIcon,
    },
    {
      id: 2,
      name: "Settings",
      route: "/settings",
      icon: SettingsIcon,
    },
  ];

  export default navigation;