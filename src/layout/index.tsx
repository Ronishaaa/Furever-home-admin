import { AppShell, Box } from "@mantine/core";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts";
import HeaderUI from "./Header";
import { Sidebars } from "./Sidebar";

const Layout = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AppShell padding="md">
      <AppShell.Header
        zIndex={120}
        style={{
          backgroundColor: "#FF7043",
          color: "#ffffff",
        }}
      >
        <HeaderUI />
      </AppShell.Header>

      <Box>
        <AppShell.Navbar
          style={{
            backgroundColor: "#FF7043",
          }}
        >
          <Sidebars />
        </AppShell.Navbar>

        <Box
          style={{
            backgroundColor: "#ffffff",
          }}
          w="80%"
          ml="auto"
          mt={60}
          p={40}
        >
          <Outlet />
        </Box>
      </Box>
    </AppShell>
  );
};

export default Layout;
