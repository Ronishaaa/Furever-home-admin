import { Box, Button } from "@mantine/core";
import { useContext } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuHeartHandshake } from "react-icons/lu";
import { MdOutlineDashboard, MdOutlineHome, MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { LinksGroup } from "./components/LinkGroups";
import classes from "./index.module.scss";

const links = [
  { label: "Dashboard", icon: MdOutlineDashboard, pathName: "/" },
  { label: "Pets", icon: MdPets, pathName: "/pets" },
  {
    label: "Applications",
    icon: IoDocumentTextOutline,
    pathName: "/applications",
  },
  {
    label: "Rescue Stories",
    icon: LuHeartHandshake,
    pathName: "/rescue-stories",
  },
  {
    label: "Success Stories",
    icon: MdOutlineHome,
    pathName: "/success-stories",
  },
];

export function Sidebars() {
  const navigate = useNavigate();

  const { setAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    navigate("/login");
    setAuthData(null);
  };

  return (
    <Box className={classes.container}>
      <Box
        px="md"
        pt={60}
        className={classes.links}
        style={{ padding: "16px" }}
      >
        <div className={classes.linksInner}>
          {links.map((item, idx) => (
            <LinksGroup {...item} key={idx} />
          ))}
        </div>
      </Box>
      <Button onClick={handleLogout} className={classes.button}>
        Logout
      </Button>
    </Box>
  );
}
