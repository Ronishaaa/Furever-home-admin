import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Input,
  LoadingOverlay,
  Menu,
  MenuItem,
  Modal,
  Pagination,
  Pill,
  Stack,
  Table,
  Tabs,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useState } from "react";
import { BiDotsHorizontalRounded, BiPlus, BiSearch } from "react-icons/bi";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDelPet, useGetPets } from "./queries";

export const Pets = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useDebouncedState("", 300, {
    leading: true,
  });

  const [skip, setSkip] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const [activeTab, setActiveTab] = useState<string | null>("All");

  const { data, isLoading, isFetching } = useGetPets({
    searchTerm,
    skip,
    sortBy: "createdAt",
    sortOrder: "asc",
    adoptionStatus:
      activeTab === "All"
        ? undefined
        : (activeTab as "Available" | "Pending" | "Adopted"),
  });

  const [selectedPet, setSelectedPet] = useState<number>();

  const { mutate: deletePetMutate } = useDelPet();

  const [showDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const deletePet = () => {
    closeDeleteModal();
    deletePetMutate(selectedPet ?? 0);
    Notifications.show({
      title: "Deleted Successfully",
      message: "Pet deleted successfully 😊",
    });
  };

  const rows = data?.data.map(
    (
      element: {
        id: number;
        name: string;
        adoptionStatus: string;
        age: number;
        breed: string;
        gender: string;
        healthCondition: string;
        vaccination: boolean;
        images: string[];
      },
      index: number
    ) => (
      <Table.Tr key={element.id}>
        <Table.Td w={230}>{index + 1}</Table.Td>

        <Table.Td>
          <Image
            radius="sm"
            fit="contain"
            h={40}
            src={element.images[0]}
            alt={`${element.name}`}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Table.Td>
        <Table.Td w={230}>{element.name}</Table.Td>
        <Table.Td w={230}>{element.breed}</Table.Td>
        <Table.Td w={50}>{element.age}</Table.Td>
        <Table.Td w={230}>{element.gender}</Table.Td>
        <Table.Td w={230} align="center">
          <Pill bg={element.vaccination ? "#A8E6A3" : "#FFB3B3"}>
            {element.vaccination ? "Yes" : "No"}
          </Pill>
        </Table.Td>
        <Table.Td w={230}>
          <Pill
            bg={
              element.adoptionStatus === "Available"
                ? "#ADD8FF"
                : element.adoptionStatus === "Adopted"
                ? "#A8E6A3"
                : "#FFE5B4"
            }
          >
            {element.adoptionStatus}
          </Pill>
        </Table.Td>
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
                onClick={() => navigate(`/pets/edit-pet/${element.id}`)}
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
        <Title>Pets</Title>

        <Button
          onClick={() => navigate("/pets/add-pet")}
          h={40}
          w={155}
          leftSection={<BiPlus size={18} />}
        >
          Add Pet
        </Button>
      </Flex>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="All">All</Tabs.Tab>
          <Tabs.Tab value="Available">Available</Tabs.Tab>
          <Tabs.Tab value="Pending">Pending</Tabs.Tab>
          <Tabs.Tab value="Adopted">Adopted</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Input
        w="100%"
        mt={14}
        mb={4}
        styles={{ section: { height: 40 }, input: { height: 40 } }}
        placeholder="Search by pet name and breed"
        leftSection={<BiSearch />}
        defaultValue={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.currentTarget.value);
          setSkip(0);
          setActivePage(1);
        }}
      />

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Breed</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Vaccination</Table.Th>
            <Table.Th>Adoption Status</Table.Th>
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
              <Table.Td colSpan={9}>
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
