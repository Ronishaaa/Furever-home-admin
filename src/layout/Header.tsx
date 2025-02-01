import { Avatar, Box, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
        w="100%"
        px={20}
        style={{
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{ cursor: "pointer", paddingLeft: 16, alignItems: "center" }}
          display="flex"
          onClick={() => navigate("/")}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>
            Furever Home
          </h1>
        </Box>
        <Menu width={200} position="bottom-end" shadow="md">
          <UnstyledButton style={{ cursor: "pointer", paddingRight: 16 }}>
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
