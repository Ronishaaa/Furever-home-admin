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
    <AppShell
      padding="md"
      styles={{
        main: {
          minHeight: "100vh",
        },
      }}
    >
      <AppShell.Header zIndex={120}>
        <HeaderUI />
      </AppShell.Header>

      {/* Flex container for the sidebar and content */}
      <Box
        style={{
          display: "flex",
          height: "100vh",
          flex: 1,
        }}
      >
        {/* Sidebar */}
        <AppShell.Navbar
          style={{
            backgroundColor: "#FF7043",
            width: "20%",
            height: "100%",
            display: "flex",
          }}
        >
          <Sidebars />
        </AppShell.Navbar>

        <Box
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            flex: 1,
            padding: "40px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </AppShell>
  );
};

export default Layout;
