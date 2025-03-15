import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { BiImageAdd, BiLeftArrowAlt, BiX } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { AddPet } from "../../../types";
import { useGetUniquePets, useUpdatePet, useUploadImage } from "../queries";
import { PetInput, PetSchema } from "../schema";

export const EditPets = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showCancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);

  const {
    data,
    isSuccess,
    isLoading: petDataLoading,
  } = useGetUniquePets(Number(id), Boolean(id));

  const { mutate: updatePet, isSuccess: updatedPet } = useUpdatePet();

  const { mutateAsync: uploadImage } = useUploadImage();

  const [droppedImages, setDroppedImages] = useState<string[]>([]);

  const {
    getInputProps,
    setFieldValue,
    setInitialValues,
    onSubmit,
    isDirty,
    reset,
  } = useForm<PetInput>({
    initialValues: {
      name: "",
      adoptionStatus: "",
      age: 0,
      breed: "",
      color: "",
      gender: "",
      healthCondition: "",
      vaccination: false,
      images: droppedImages,
      personality: [],
      energyLevel: "",
      trainingLevel: "",
      specialTraits: "",
      strangerBehavior: "",
      adoptionInfo: {
        idealHome: "",
        childrenFriendly: false,
        otherPetsFriendly: false,
        experienceLevel: "",
        specialNeeds: "",
      },
    },
    validate: zodResolver(PetSchema),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues({
        ...data.pet,
      });
      setDroppedImages(data?.pet?.images);
      reset(); // reset the form state after updating initial values
    }
  }, [data, isSuccess, reset, setInitialValues]);

  const handleSubmit = (values: AddPet) => {
    console.log("hi");
    const validId: string | undefined = id ? id : undefined;

    if (validId) {
      updatePet({
        id: Number(validId),
        values: values,
      });
    }
  };

  useEffect(() => {
    if (updatedPet) {
      Notifications.show({
        title: "Updated Successfully",
        message: "Pet updated successfully 😊",
      });
    }
  }, [updatedPet]);

  const cancelData = () => {
    if (isDirty()) {
      openCancelModal();
    } else {
      navigate(-1);
    }
  };
  const handleDrop = async (acceptedFiles: File[]) => {
    try {
      const result = await uploadImage(acceptedFiles);

      if (result?.images?.length) {
        const uploadedUris = result.images.map(
          (img: { uri: string }) => img.uri
        );
        setDroppedImages((prev) => [...prev, ...uploadedUris]);
        setFieldValue("images", [...droppedImages, ...uploadedUris]);
      } else {
        console.error("Image upload failed. Response:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = (index: number) => {
    const updatedImages = droppedImages.filter((_, i) => i !== index);
    setDroppedImages(updatedImages);
    setFieldValue("images", updatedImages);
  };

  return (
    <Box w={{ lg: 736 }} mx="auto">
      <LoadingOverlay visible={petDataLoading} zIndex={1000} />
      <form onSubmit={onSubmit(handleSubmit)}>
        <Flex justify="space-between" align="center" mb={32}>
          <Group>
            <Button size="sm" variant="outline" onClick={cancelData}>
              <BiLeftArrowAlt size={20} />
            </Button>

            <Title order={2}>Edit Pet</Title>
          </Group>

          <Group>
            <Button variant="outline" onClick={cancelData}>
              Cancel
            </Button>

            <Button h={40} type="submit">
              Save changes
            </Button>
          </Group>
        </Flex>

        <Grid grow gutter="sm">
          <Grid.Col span={4}>
            <TextInput label="Pet Name" mb={16} {...getInputProps("name")} />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Adoption Status"
              data={["Available", "Pending"]}
              mb={16}
              {...getInputProps("adoptionStatus")}
            />
          </Grid.Col>
        </Grid>

        <Grid grow gutter="sm">
          <Grid.Col span={4}>
            <NumberInput label="Age" mb={16} {...getInputProps("age")} />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Gender"
              data={["Male", "Female"]}
              mb={16}
              {...getInputProps("gender")}
            />
          </Grid.Col>
        </Grid>

        <TextInput label="Breed" mb={16} {...getInputProps("breed")} />

        <TextInput label="Color" mb={16} {...getInputProps("color")} />

        <TextInput
          label="Health Condition"
          mb={16}
          {...getInputProps("healthCondition")}
        />
        <TextInput
          label="strangerBehavior"
          mb={16}
          {...getInputProps("strangerBehavior")}
        />

        <Checkbox
          label="Vaccinated"
          mb={16}
          {...getInputProps("vaccination", { type: "checkbox" })}
        />

        <MultiSelect
          label="Personality"
          data={[
            "Friendly",
            "Shy",
            "Aggressive",
            "Calm",
            "Playful",
            "Loyal",
            "Energetic",
            "Independent",
            "Protective",
            "Affectionate",
            "Curious",
            "Fearful",
            "Confident",
            "Social",
            "Reserved",
            "Obedient",
            "Dominant",
            "Mischievous",
            "Outgoing",
            "Laid-back",
          ]}
          mb={16}
          searchable
          {...getInputProps("personality")}
        />

        <Grid grow gutter="sm">
          <Grid.Col span={4}>
            <Select
              label="Energy Level"
              data={["High", "Medium", "Low"]}
              mb={16}
              {...getInputProps("energyLevel")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Training Level"
              data={["None", "Basic", "Advanced"]}
              mb={16}
              {...getInputProps("trainingLevel")}
            />
          </Grid.Col>
        </Grid>

        <TextInput
          label="Special Traits"
          mb={16}
          {...getInputProps("specialTraits")}
        />

        <Title order={3}>Adoption Information</Title>

        <TextInput
          label="Ideal Home"
          mb={16}
          {...getInputProps("adoptionInfo.idealHome")}
        />

        <Grid grow gutter="sm" align="center">
          <Grid.Col span={4}>
            <Select
              label="Experience Level"
              data={["FirstTimeOwner", "ExperiencedOwner"]}
              mb={16}
              {...getInputProps("adoptionInfo.experienceLevel")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Checkbox
              label="Children Friendly"
              mb={16}
              {...getInputProps("adoptionInfo.childrenFriendly", {
                type: "checkbox",
              })}
            />
            <Checkbox
              label="Other Pets Friendly"
              mb={16}
              {...getInputProps("adoptionInfo.otherPetsFriendly", {
                type: "checkbox",
              })}
            />
          </Grid.Col>
        </Grid>

        <Textarea
          label="Special Needs"
          mb={16}
          {...getInputProps("adoptionInfo.specialNeeds")}
        />

        <Text fw={600} size="sm" mb={4}>
          Pet Image
        </Text>

        <Dropzone
          onDrop={handleDrop}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
          h={146}
          multiple
          styles={{ inner: { pointerEvents: "all" } }}
        >
          {(droppedImages || []).length > 0 ? (
            <Flex wrap="wrap" gap={2}>
              {droppedImages.map((src, index) => (
                <Box key={index} pos="relative">
                  <Image
                    h={121}
                    w={121}
                    src={src}
                    alt="Pet Image"
                    fit="contain"
                  />
                  <div onClick={() => handleDelete(index)}>
                    <BiX
                      fill="#484848"
                      size={24}
                      cursor="pointer"
                      style={{
                        backgroundColor: "#E5E7EB",
                        position: "absolute",
                        left: 112,
                        top: 15,
                      }}
                    />
                  </div>
                </Box>
              ))}
            </Flex>
          ) : (
            <Flex justify="center" direction="column" h={114} align="center">
              <BiImageAdd size={24} color="#1D76E2" />
              <Text color="dimmed">
                Drop your pet's images here, or click to browse
              </Text>
            </Flex>
          )}
        </Dropzone>

        <Modal
          opened={showCancelModal}
          onClose={closeCancelModal}
          title="Unsaved changes"
          centered
        >
          <Stack>
            <Text my={14}>
              Leaving this page will delete all the unsaved changes.
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
    </Box>
  );
};
