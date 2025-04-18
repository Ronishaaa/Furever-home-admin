import { BarChart, DonutChart } from "@mantine/charts";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  MdAssignment,
  MdCheckCircle,
  MdPayments,
  MdPets,
} from "react-icons/md";

export const Dashboard = () => {
  const stats = [
    {
      title: "Total Dogs",
      value: "87",
      icon: <MdPets size={24} />,
      color: "blue",
    },
    {
      title: "Pending Applications",
      value: "23",
      icon: <MdAssignment size={24} />,
      color: "orange",
    },
    {
      title: "Approved This Month",
      value: "18",
      icon: <MdCheckCircle size={24} />,
      color: "green",
    },
  ];

  const dogStatusData = [
    { name: "Available", value: 42, color: "green" },
    { name: "Pending Adoption", value: 15, color: "blue" },
    { name: "Adopted", value: 22, color: "violet" },
  ];

  const breedDistributionData = [
    { breed: "Labrador", count: 18 },
    { breed: "Beagle", count: 12 },
    { breed: "Bulldog", count: 8 },
    { breed: "Golden Retriever", count: 10 },
    { breed: "Others", count: 15 },
  ];

  const recentApplications = [
    {
      id: "APP-1001",
      name: "Sarah Johnson",
      dog: "Max (Labrador)",
      status: "Pending",
    },
    {
      id: "APP-1002",
      name: "Michael Brown",
      dog: "Buddy (Golden Retriever)",
      status: "Approved",
    },
  ];

  const recentDonations = [
    {
      id: "DON-0221",
      amount: "₹5,000",
      donor: "Anonymous",
    },
    {
      id: "DON-0220",
      amount: "₹2,500",
      donor: "Emma Wilson",
    },
  ];

  return (
    <Box w="100%" p="md">
      <Title mb="xl">Dashboard</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
        {stats.map((stat) => (
          <Card key={stat.title} withBorder radius="md">
            <Group>
              <ThemeIcon size="xl" variant="light" color={stat.color}>
                {stat.icon}
              </ThemeIcon>
              <div>
                <Text size="xs" c="dimmed">
                  {stat.title}
                </Text>
                <Text size="xl" fw={700}>
                  {stat.value}
                </Text>
              </div>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mb="xl">
        <Card withBorder radius="md" p="xl">
          <Group mb="md">
            <Text fw={600}>Dog Status</Text>
          </Group>
          <DonutChart
            data={dogStatusData}
            tooltipDataSource="segment"
            mx="auto"
          />
        </Card>

        <Card withBorder radius="md" p="xl">
          <Group mb="md">
            <Text fw={600}>Breed Distribution</Text>
          </Group>
          <BarChart
            h={200}
            data={breedDistributionData}
            dataKey="breed"
            series={[{ name: "count", color: "teal" }]}
            tickLine="y"
          />
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Card withBorder radius="md" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Applications</Title>
            <Button variant="subtle" size="sm">
              View All
            </Button>
          </Group>
          <Stack gap="sm">
            {recentApplications.map((app) => (
              <Paper key={app.id} withBorder p="sm" radius="sm">
                <Group justify="space-between">
                  <Group>
                    <Avatar radius="xl">{app.name.charAt(0)}</Avatar>
                    <div>
                      <Text fw={600}>{app.name}</Text>
                      <Text size="sm" c="dimmed">
                        {app.dog}
                      </Text>
                    </div>
                  </Group>
                  <Badge
                    color={app.status.includes("Verified") ? "green" : "blue"}
                  >
                    {app.status}
                  </Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Card>

        <Card withBorder radius="md" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Donations</Title>
            <Button variant="subtle" size="sm">
              View All
            </Button>
          </Group>
          <Stack gap="sm">
            {recentDonations.map((donation) => (
              <Paper key={donation.id} withBorder p="sm" radius="sm">
                <Group justify="space-between">
                  <Group>
                    <ThemeIcon variant="light" color="violet">
                      <MdPayments size={18} />
                    </ThemeIcon>
                    <div>
                      <Text fw={600}>{donation.amount}</Text>
                      <Text size="sm" c="dimmed">
                        {donation.donor}
                      </Text>
                    </div>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
};
