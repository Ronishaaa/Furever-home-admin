import { Box, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  const [menuExpand, { toggle: toggleMenuExpand, close: closeMenuExpand }] =
    useDisclosure(false);

  return (
    <Box pos="initial" w={"100%"}>
      <Box
        px="md"
        pt={60}
        className={classes.links}
        component={ScrollArea}
        style={{ padding: "16px" }}
      >
        <div className={classes.linksInner}>
          {links.map((item, idx) => (
            <LinksGroup
              toggleMenuExpand={toggleMenuExpand}
              closeMenuExpand={closeMenuExpand}
              menuExpand={menuExpand}
              {...item}
              key={idx}
            />
          ))}
        </div>
      </Box>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
}
