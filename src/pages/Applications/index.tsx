import {
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  MenuItem,
  Modal,
  Pill,
  Stack,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDelApplication, useGetAllApplications } from "./queries";

export const Applications = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetAllApplications();

  const [selectedApplication, setSelectedApplication] = useState<number>();

  const { mutate: deleteApplicationMutate } = useDelApplication();

  const [showDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const deleteApplication = () => {
    closeDeleteModal();
    deleteApplicationMutate(selectedApplication ?? 0);
    Notifications.show({
      title: "Deleted Successfully",
      message: "Application deleted successfully 😊",
    });
  };

  const rows = data?.data.map(
    (
      element: {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: number;
        applicationStatus: string;
      },
      index: number
    ) => (
      <Table.Tr key={element.id}>
        <Table.Td w={230}>{index + 1}</Table.Td>
        <Table.Td w={230}>
          {element.firstName} {element.lastName}
        </Table.Td>
        <Table.Td w={230}>{element.phoneNumber}</Table.Td>
        <Table.Td w={230}>{element.email}</Table.Td>
        <Table.Td w={230}>
          <Pill
            bg={
              element.applicationStatus === "Pending"
                ? "#FFE5B4"
                : element.applicationStatus === "Adopted"
                ? "#A8E6A3"
                : "#ADD8FF"
            }
          >
            {element.applicationStatus}
          </Pill>
        </Table.Td>

        <Table.Td w={54}>
          <Menu offset={1}>
            <Menu.Target>
              <UnstyledButton>
                <BiDotsHorizontalRounded
                  onClick={() => {
                    setSelectedApplication(element.id);
                  }}
                />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <MenuItem
                onClick={() =>
                  navigate(`/application/edit-application/${element.id}`)
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
        <Title>Adoption Application</Title>
      </Flex>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone Number</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Status</Table.Th>

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
        title="Delete this Application?"
        centered
      >
        <Stack>
          <div>
            This action will permanently delete the selected Application. You
            can’t undo this action.
          </div>
          <Group justify="end">
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button onClick={deleteApplication} color="red">
              Yes, delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
