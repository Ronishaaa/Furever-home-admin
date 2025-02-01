import {
  Button,
  Container,
  Flex,
  Image,
  LoadingOverlay,
  Menu,
  MenuItem,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { BiDotsHorizontalRounded, BiPlus } from "react-icons/bi";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useGetPets } from "./queries";

const Pets = () => {
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetPets();
  console.log(data?.data);

  const rows = data?.data.map(
    (
      element: {
        id: number;
        name: string;
        adoptionStatus: string;
        age: number;
        breed: string;
        color: string;
        gender: "Male";
        healthCondition: string;
        type: string;
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
            // style={{ height: 40 }}
            fit="contain"
            h={40}
            src={element.images[0]}
            alt={`${element.name}`}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Table.Td>
        <Table.Td w={230}>{element.name}</Table.Td>
        <Table.Td w={230}>{element.breed}</Table.Td>
        <Table.Td w={230}>{element.age}</Table.Td>
        <Table.Td w={230}>{element.gender}</Table.Td>
        <Table.Td w={230}>{element.color}</Table.Td>
        <Table.Td w={230}>{element.healthCondition}</Table.Td>
        <Table.Td w={230}>{element.vaccination}</Table.Td>
        <Table.Td w={230}>{element.adoptionStatus}</Table.Td>
        <Table.Td w={230}>{element.type}</Table.Td>
        <Table.Td w={54}>
          <Menu offset={1}>
            <Menu.Target>
              <UnstyledButton>
                <BiDotsHorizontalRounded onClick={() => {}} />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <MenuItem>Edit</MenuItem>
              <MenuItem c="red">Delete</MenuItem>
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
          color="rgb(255, 112, 67)"
          leftSection={<BiPlus size={18} />}
        >
          Add Pet
        </Button>
      </Flex>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>S.No</Table.Th>
            <Table.Th>Image</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Breed</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Color</Table.Th>
            <Table.Th>Health Condition</Table.Th>
            <Table.Th>Vaccination</Table.Th>
            <Table.Th>Adoption Status</Table.Th>
            <Table.Th>Type</Table.Th>
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
    </Container>
  );
};

export default Pets;
