import {
  Badge,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { TbDatabaseOff } from "react-icons/tb";
import { useGetAllDonations } from "./queries";

export const Donations = () => {
  const [skip, setSkip] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const { data, isLoading, isFetching } = useGetAllDonations({ skip });

  const rows = data?.data?.map(
    (
      donation: {
        id: number;
        name: string;
        email: string;
        phone: string;
        amount: number;
        message: string;
        status: string;
      },
      index: number
    ) => (
      <Table.Tr key={donation.id} style={{ cursor: "pointer" }}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{donation.name}</Table.Td>
        <Table.Td>
          <Text>{donation.phone}</Text>
          <Text size="sm" c="dimmed">
            {donation.email}
          </Text>
        </Table.Td>
        <Table.Td>{donation.amount}</Table.Td>
        <Table.Td>{donation.message || "-"}</Table.Td>
        <Table.Td>
          <Badge
            color={
              donation.status === "completed"
                ? "teal"
                : donation.status === "initiated"
                ? "yellow"
                : "gray"
            }
            variant="light"
          >
            {donation.status}
          </Badge>
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <Container>
      <Flex justify="space-between" align="center" mb={24}>
        <Title>Donations</Title>
      </Flex>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={80}>S.No.</Table.Th>
            <Table.Th w={180}>Donor Name</Table.Th>
            <Table.Th w={200}>Contact Info</Table.Th>
            <Table.Th w={100}>Amount</Table.Th>
            <Table.Th w={200}>Message</Table.Th>
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
              <Table.Td colSpan={6}>
                <Flex direction="column" align="center">
                  <TbDatabaseOff size={24} />
                  No donation records to show
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
    </Container>
  );
};
