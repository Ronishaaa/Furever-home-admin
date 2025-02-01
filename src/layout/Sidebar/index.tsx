import { Box, Button } from "@mantine/core";
import { useContext } from "react";
import { MdOutlineDashboard, MdPets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { LinksGroup } from "./components/LinkGroups";
import classes from "./index.module.scss";

const links = [
  { label: "Dashboard", icon: MdOutlineDashboard, pathName: "/" },
  { label: "Pets", icon: MdPets, pathName: "/pets" },
];

export function Sidebars() {
  const navigate = useNavigate();

  const { setAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    navigate("/login");
    setAuthData(null);
  };

  return (
    <Box pos="relative" w={"100%"}>
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
