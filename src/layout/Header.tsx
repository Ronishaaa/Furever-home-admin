import { Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../contexts";

// const HeaderUI = () => {
//   const navigate = useNavigate();

//   //   const { setAuthData } = useContext(AuthContext);

//   //   const handleLogout = () => {
//   //     navigate("/login");
//   //     setAuthData(null);
//   //   };

//   return (
//     <Group
//       h={56}
//       p="xs"
//       style={{
//         zIndex: 120,
//         backgroundColor: "#FF7043",
//         color: "#ffffff",
//       }}
//       display="flex"
//       align="center"
//       justify="space-between"
//     >
//       {/* Header content */}
//       <Group
//         display="flex"
//         justify="space-between"
//         px={20}
//         w="100%"
//         style={{ justifyContent: "space-between" }}
//       >
//         <Box style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
//           <Group>
//             <h1>Furever Home</h1>
//           </Group>
//         </Box>
//         <Menu width={200} position="bottom-end" shadow="md">
//           <UnstyledButton className="ec-button-hover">
//             <Group gap={7}>
//               <Avatar alt="admin-image" radius={"xl"} size={32} />
//               <Text
//                 fw={500}
//                 size="sm"
//                 lh={1}
//                 mr={3}
//                 style={{ color: "#ffffff" }}
//               >
//                 Admin
//               </Text>
//             </Group>
//           </UnstyledButton>
//           {/* <Menu.Item
//               leftSection={<RiAccountCircleLine size={16} />}
//               onClick={() => navigate("/account")}
//               p={12}
//             >
//               View Profile
//             </Menu.Item> */}
//           {/* <Menu.Item
//               leftSection={<RiLogoutCircleLine size={16} />}
//               onClick={handleLogout}
//               p={12}
//             >
//               Log out
//             </Menu.Item> */}
//         </Menu>
//       </Group>
//     </Group>
//   );
// };

const HeaderUI = () => {
  const navigate = useNavigate();

  return (
    <Group
      h={56}
      p="xs"
      style={{
        zIndex: 120,
        backgroundColor: "#FF7043",
        color: "#ffffff",
      }}
      display="flex"
      align="center"
      justify="space-between"
    >
      <Group
        display="flex"
        justify="space-between"
        px={20}
        w="100%"
        style={{ justifyContent: "space-between" }}
      >
        <Box style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            Furever Home
          </h1>
        </Box>
        <Menu width={200} position="bottom-end" shadow="md">
          <UnstyledButton style={{ cursor: "pointer" }}>
            <Group gap={7}>
              <Avatar alt="admin-image" radius={"xl"} size={32} />
              <Text
                fw={500}
                size="sm"
                lh={1}
                mr={3}
                style={{ color: "#ffffff" }}
              >
                Admin
              </Text>
            </Group>
          </UnstyledButton>
        </Menu>
      </Group>
    </Group>
  );
};

export default HeaderUI;
