import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { Application } from "../../../types";
import {
  useGetUniqueApplication,
  useUpdateApplicationStatus,
} from "../queries";
import { ApplicationInput } from "../schema";

export const ReviewApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showCancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);

  const [openAccordions, setOpenAccordions] = useState<string[]>([
    "personal-info",
    "living-situation",
    "additional-info",
  ]);

  const {
    data,
    isSuccess,
    isLoading: isDataLoading,
  } = useGetUniqueApplication(Number(id), Boolean(id));

  const { mutate: updateApplicationStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();

  const form = useForm<ApplicationInput>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      householdMembers: "",
      homeOwnership: false,
      petAllowed: false,
      outdoorArea: false,
      neuteredPets: false,
      aloneHours: 0,
      otherPetsInfo: "",
      upcomingEvents: "",
      applicationStatus: "Pending",
      userId: 0,
      petId: 0,
    },
  });

  const { getInputProps, setInitialValues, reset, onSubmit, isDirty, values } =
    form;

  const cancelData = () => {
    if (isDirty()) {
      openCancelModal();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues({
        ...data.data,
      });
      reset();
    }
  }, [data, isSuccess, setInitialValues, reset]);

  const handleSubmit = (values: Application) => {
    updateApplicationStatus({
      id: Number(id),
      values: values,
    });
    Notifications.show({
      title: "Status Updated",
      message: "Application status updated successfully!",
      autoClose: false,
    });
  };

  const getBooleanDisplay = (value: boolean) => (
    <Badge color={value ? "green" : "red"} variant="light">
      {value ? "Yes" : "No"}
    </Badge>
  );

  const handleAccordionChange = (value: string[]) => {
    setOpenAccordions(value);
  };

  return (
    <Container size="lg">
      <LoadingOverlay visible={isDataLoading || isUpdating} zIndex={1000} />
      <form onSubmit={onSubmit(handleSubmit)}>
        <Flex justify="space-between" align="center" mb={32}>
          <Group>
            <Button size="sm" variant="outline" onClick={cancelData}>
              <BiLeftArrowAlt size={20} />
            </Button>
            <Title order={2}>Adoption Application Review</Title>
          </Group>
        </Flex>

        <Accordion
          variant="contained"
          multiple
          value={openAccordions}
          onChange={handleAccordionChange}
        >
          <Accordion.Item value="personal-info">
            <Accordion.Control>
              <Text fw={500}>Personal Information</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Group grow>
                  <Box>
                    <Text size="sm" c="dimmed">
                      First Name
                    </Text>
                    <Text>{values.firstName}</Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Last Name
                    </Text>
                    <Text>{values.lastName}</Text>
                  </Box>
                </Group>

                <Group grow>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Email
                    </Text>
                    <Text>{values.email}</Text>
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Phone Number
                    </Text>
                    <Text>{values.phoneNumber}</Text>
                  </Box>
                </Group>

                <Box>
                  <Text size="sm" c="dimmed">
                    Address
                  </Text>
                  <Text>{values.address}</Text>
                </Box>

                <Box>
                  <Text size="sm" c="dimmed">
                    Household Members
                  </Text>
                  <Text>{values.householdMembers}</Text>
                </Box>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="living-situation">
            <Accordion.Control>
              <Text fw={500}>Living Situation</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Group grow>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Home Ownership
                    </Text>
                    {getBooleanDisplay(values.homeOwnership)}
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Pets Allowed
                    </Text>
                    {getBooleanDisplay(values.petAllowed)}
                  </Box>
                </Group>

                <Group grow>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Outdoor Area
                    </Text>
                    {getBooleanDisplay(values.outdoorArea)}
                  </Box>
                  <Box>
                    <Text size="sm" c="dimmed">
                      Current Pets Neutered
                    </Text>
                    {getBooleanDisplay(values.neuteredPets)}
                  </Box>
                </Group>

                <Box>
                  <Text size="sm" c="dimmed">
                    Hours pet would be alone
                  </Text>
                  <Text>{values.aloneHours}</Text>
                </Box>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="additional-info">
            <Accordion.Control>
              <Text fw={500}>Additional Information</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack>
                <Box>
                  <Text size="sm" c="dimmed">
                    Other Pets Info
                  </Text>
                  <Text>{values.otherPetsInfo || "N/A"}</Text>
                </Box>

                <Box>
                  <Text size="sm" c="dimmed">
                    Upcoming Events
                  </Text>
                  <Text>{values.upcomingEvents || "N/A"}</Text>
                </Box>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Card withBorder shadow="sm" radius="md" mb="md" mt={12}>
          <Card.Section withBorder inheritPadding py="xs">
            <Text fw={500}>Application Status</Text>
          </Card.Section>
          <Box pt="sm">
            <Select
              data={
                data?.data.applicationStatus === "Pending"
                  ? [
                      { value: "Pending", label: "Pending" },
                      { value: "Approved", label: "Approved" },
                      { value: "Rejected", label: "Rejected" },
                    ]
                  : [
                      { value: "Approved", label: "Approved" },
                      { value: "Rejected", label: "Rejected" },
                    ]
              }
              disabled={data?.data.applicationStatus !== "Pending"}
              {...getInputProps("applicationStatus")}
            />
          </Box>
        </Card>

        {data?.data.applicationStatus === "Pending" && (
          <Flex justify="end" align="center" mb={32}>
            <Group>
              <Button variant="outline" onClick={cancelData}>
                Cancel
              </Button>
              <Button h={40} type="submit">
                Save changes
              </Button>
            </Group>
          </Flex>
        )}

        <Modal
          opened={showCancelModal}
          onClose={closeCancelModal}
          title="Unsaved changes"
          centered
        >
          <Stack>
            <Text my={14}>
              Leaving this page will cancel all the unsaved changes.
            </Text>

            <Group justify="end">
              <Button variant="outline" onClick={closeCancelModal}>
                Stay on Page
              </Button>

              <Button color="red" onClick={() => navigate(-1)}>
                Discard changes
              </Button>
            </Group>
          </Stack>
        </Modal>
      </form>
    </Container>
  );
};
