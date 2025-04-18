import {
  Avatar,
  Badge,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { TbDatabaseOff } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useGetAllApplications } from "./queries";

export const Applications = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetAllApplications();

  const rows = data?.data.map(
    (
      element: {
        id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        applicationStatus: string;
        pet: {
          name: string;
          breed: string;
          images: string[];
        };
      },
      index: number
    ) => (
      <Table.Tr
        key={element.id}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/applications/${element.id}`)}
      >
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={40} src={element.pet.images?.[0]} radius="sm" />
            <div>
              <Text>{element.pet.name}</Text>
              <Text size="sm" c="dimmed">
                {element.pet.breed}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text>
            {element.firstName} {element.lastName}
          </Text>
        </Table.Td>
        <Table.Td>
          <div>
            <Text>{element.phoneNumber}</Text>
            <Text size="sm" c="dimmed">
              {element.email}
            </Text>
          </div>
        </Table.Td>
        <Table.Td>
          <Badge
            color={
              element.applicationStatus === "Pending"
                ? "yellow"
                : element.applicationStatus === "Approved"
                ? "teal"
                : "gray"
            }
            variant="light"
          >
            {element.applicationStatus}
          </Badge>
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
            <Table.Th w={80}>S.No.</Table.Th>
            <Table.Th w={180}>Pet Details</Table.Th>
            <Table.Th w={150}>Applicant</Table.Th>
            <Table.Th w={160}>Contact Info</Table.Th>
            <Table.Th w={120}>Status</Table.Th>
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
