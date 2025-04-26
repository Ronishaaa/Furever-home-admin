import { BarChart, PieChart } from "@mantine/charts";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
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
import { useNavigate } from "react-router-dom";
import { useDashboardStats } from "./queries";

interface RecentApplication {
  id: number;
  name: string;
  dog: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface RecentDonation {
  id: number;
  amount: string;
  donor: string;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboardStats();
  console.log(data);
  if (error) {
    return (
      <Box p="md">
        <Text c="red">Error loading dashboard data</Text>
      </Box>
    );
  }

  const stats = [
    {
      title: "Total Dogs",
      value: data?.data.totalDogs ?? "0",
      icon: <MdPets size={24} />,
      color: "blue",
    },
    {
      title: "Pending Applications",
      value: data?.data.pendingApplications ?? "0",
      icon: <MdAssignment size={24} />,
      color: "orange",
    },
    {
      title: "Approved This Month",
      value: data?.data.approvedThisMonth ?? "0",
      icon: <MdCheckCircle size={24} />,
      color: "green",
    },
  ];

  const dogStatusData = [
    {
      name: "Available",
      value: data?.data.dogStatus.available ?? 0,
      color: "green",
    },
    {
      name: "Pending Adoption",
      value: data?.data.dogStatus.pendingAdoption ?? 0,
      color: "blue",
    },
    {
      name: "Adopted",
      value: data?.data.dogStatus.adopted ?? 0,
      color: "violet",
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
                {isLoading ? (
                  <Skeleton height={28} width={60} mt={4} />
                ) : (
                  <Text size="xl" fw={700}>
                    {stat.value}
                  </Text>
                )}
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

          {isLoading ? (
            <Skeleton height={300} />
          ) : dogStatusData.every((d) => d.value === 0) ? (
            <Text ta="center" c="dimmed">
              No dog status data available
            </Text>
          ) : (
            <PieChart
              data={dogStatusData}
              withLabelsLine
              labelsPosition="outside"
              labelsType="value"
              withLabels
              mx="auto"
            />
          )}
        </Card>

        <Card withBorder radius="md" p="xl">
          <Group mb="md">
            <Text fw={600}>Breed Distribution</Text>
          </Group>
          {isLoading ? (
            <Skeleton height={200} />
          ) : (
            <BarChart
              h={200}
              data={data?.data.breedDistribution ?? []}
              dataKey="breed"
              series={[{ name: "count", color: "teal" }]}
              tickLine="y"
            />
          )}
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Card withBorder radius="md" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Applications</Title>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => navigate("/applications")}
            >
              View All
            </Button>
          </Group>
          <Stack gap="sm">
            {isLoading ? (
              <>
                <Skeleton height={80} />
                <Skeleton height={80} />
              </>
            ) : (
              data?.data.recentApplications.map((app: RecentApplication) => (
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
                      color={
                        app.status === "Approved"
                          ? "green"
                          : app.status === "Rejected"
                          ? "red"
                          : "blue"
                      }
                    >
                      {app.status}
                    </Badge>
                  </Group>
                </Paper>
              ))
            )}
          </Stack>
        </Card>

        <Card withBorder radius="md" p="xl">
          <Group justify="space-between" mb="md">
            <Title order={4}>Recent Donations</Title>
            <Button
              variant="subtle"
              size="sm"
              onClick={() => navigate("/donations")}
            >
              View All
            </Button>
          </Group>
          <Stack gap="sm">
            {isLoading ? (
              <>
                <Skeleton height={80} />
                <Skeleton height={80} />
              </>
            ) : (
              data?.data.recentDonations.map((donation: RecentDonation) => (
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
              ))
            )}
          </Stack>
        </Card>
      </SimpleGrid>
    </Box>
  );
};
