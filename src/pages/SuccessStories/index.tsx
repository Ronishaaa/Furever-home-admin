import {
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDelSuccessStories, useGetAllSuccessStories } from "./queries";

export const SuccessStories = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetAllSuccessStories();

  const [selectedPet, setSelectedPet] = useState<number>();

  const { mutate: deletePetMutate } = useDelSuccessStories();

  const [showDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const deletePet = () => {
    closeDeleteModal();
    deletePetMutate(selectedPet ?? 0);
    Notifications.show({
      title: "Deleted Successfully",
      message: "Success story deleted successfully 😊",
    });
  };

  const rows = data?.data.map(
    (
      element: {
        id: number;
        title: string;
        description: string;
        adoptionDate: number;
        images: string[];
      },
      index: number
    ) => (
      <Table.Tr key={element.id}>
        <Table.Td w={230}>{index + 1}</Table.Td>
        <Table.Td w={230}>{element.title}</Table.Td>
        <Table.Td w={230}>{element.adoptionDate}</Table.Td>

        <Table.Td w={54}>
          <Menu offset={1}>
            <Menu.Target>
              <UnstyledButton>
                <BiDotsHorizontalRounded
                  onClick={() => {
                    setSelectedPet(element.id);
                  }}
                />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <MenuItem
                onClick={() =>
                  navigate(`/success-stories/edit-success-story/${element.id}`)
                }
              >
                Edit
              </MenuItem>
              <MenuItem c="red" onClick={openDeleteModal}>
                Delete
              </MenuItem>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <Container>
      <Flex justify="space-between" align="center" mb={24}>
        <Title>Success Stories</Title>

        <Button
          onClick={() => navigate("/success-stories/add-success-story")}
          h={40}
          leftSection={<BiPlus size={18} />}
        >
          Add success story
        </Button>
      </Flex>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Success Date</Table.Th>

            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody pos="relative">
          <LoadingOverlay
            h={600}
            visible={isLoading || isFetching}
            zIndex={1000}
          />
          {rows?.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={5}>
                <Flex direction="column" align="center">
                  <TbDatabaseOff size={24} />
                  No records to show
                </Flex>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={showDeleteModal}
        onClose={closeDeleteModal}
        title="Delete this Pet?"
        centered
      >
        <Stack>
          <div>
            This action will permanently delete the selected pet. You can’t undo
            this action.
          </div>
          <Group justify="end">
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button onClick={deletePet} color="red">
              Yes, delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
