import {
  Button,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Stack,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import { useState } from "react";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDelSuccessStories, useGetAllSuccessStories } from "./queries";

export const SuccessStories = () => {
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, isFetching } = useGetAllSuccessStories({ skip });

  const [selectedStory, setSelectedStory] = useState<number>();

  const { mutate: deleteStoryMutate } = useDelSuccessStories();

  const [showDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const deleteStory = () => {
    closeDeleteModal();
    deleteStoryMutate(selectedStory ?? 0);
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
        <Table.Td w={50}>{index + 1}</Table.Td>
        <Table.Td>{element.title}</Table.Td>
        <Table.Td w={230}>
          {dayjs(element.adoptionDate).format("DD MMM YYYY")}
        </Table.Td>

        <Table.Td w={54}>
          <Menu offset={1}>
            <Menu.Target>
              <UnstyledButton>
                <BiDotsHorizontalRounded
                  onClick={() => {
                    setSelectedStory(element.id);
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
              <Table.Td colSpan={4}>
                <Flex direction="column" align="center">
                  <TbDatabaseOff size={24} />
                  No records to show
                </Flex>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

      {rows?.length > 0 && (
        <Group mt={12} justify="space-between">
          <div>{`${skip + 1} to ${Math.min(skip + 10, data?.meta.total)} of ${
            data?.meta.total
          } entries`}</div>
          <Pagination
            total={Math.ceil(data?.meta.total / 10)}
            value={activePage}
            onChange={(page: number) => {
              setSkip((page - 1) * 10);
              setActivePage(page);
            }}
          />
        </Group>
      )}

      <Modal
        opened={showDeleteModal}
        onClose={closeDeleteModal}
        title="Delete this Story?"
        centered
      >
        <Stack>
          <div>
            This action will permanently delete the selected Story. You can’t
            undo this action.
          </div>
          <Group justify="end">
            <Button variant="outline" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button onClick={deleteStory} color="red">
              Yes, delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};
