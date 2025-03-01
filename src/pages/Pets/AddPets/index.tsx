import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { BiImageAdd, BiLeftArrowAlt, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AddPet } from "../../../types";
import { useAddPet, useUploadImage } from "../queries";
import { petSchema } from "../schema";

export const AddPets = () => {
  const navigate = useNavigate();

  const [showCancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);

  const [droppedImages, setDroppedImages] = useState<string[]>([]);

  const { getInputProps, setFieldValue, onSubmit, isDirty, setFieldError } =
    useForm({
      initialValues: {
        id: "",
        name: "",
        adoptionStatus: "",
        age: 0,
        breed: "",
        color: "",
        gender: "",
        healthCondition: "",
        type: "",
        vaccination: false,
        images: [] as string[],
        personality: {
          energyLevel: "",
          temperament: "",
          training: "",
          petBehavior: "",
          specialTraits: "",
        },
        adoptionInfo: {
          idealHome: "",
          childrenFriendly: false,
          otherPetsFriendly: false,
          experienceLevel: "",
          specialNeeds: "",
        },
      },
      validate: zodResolver(petSchema),
    });

  const { mutate: addPetMutation, isSuccess, error } = useAddPet();
  const { mutateAsync: uploadImage } = useUploadImage();

  const addPet = async (values: AddPet) => {
    addPetMutation(values);
  };

  useEffect(() => {
    if (isSuccess) {
      Notifications.show({
        title: "Added Successfully",
        message: "Pet added successfully 😊",
      });
      navigate("/pets");
    }
  }, [error, isSuccess, setFieldError, navigate]);

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
    <Container>
      <LoadingOverlay />
      <form onSubmit={onSubmit(addPet)}>
        <Flex justify="space-between" align="center" mb={32}>
          <Group>
            <Button size="sm" variant="outline" onClick={cancelData}>
              <BiLeftArrowAlt size={20} />
            </Button>

            <Title order={2}>Add New Pet</Title>
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

        <TextInput label="Pet Name" mb={16} {...getInputProps("name")} />

        <Select
          label="Adoption Status"
          data={["Available", "Pending", "Adopted"]}
          mb={16}
          {...getInputProps("adoptionStatus")}
        />

        <NumberInput label="Age" mb={16} {...getInputProps("age")} />

        <TextInput label="Breed" mb={16} {...getInputProps("breed")} />

        <TextInput label="Color" mb={16} {...getInputProps("color")} />

        <Select
          label="Gender"
          data={["Male", "Female"]}
          mb={16}
          {...getInputProps("gender")}
        />

        <TextInput
          label="Health Condition"
          mb={16}
          {...getInputProps("healthCondition")}
        />

        <Select
          label="Type"
          data={["Dog", "Cat", "Bird", "Other"]}
          mb={16}
          {...getInputProps("type")}
        />

        <Checkbox
          label="Vaccinated"
          mb={16}
          {...getInputProps("vaccination", { type: "checkbox" })}
        />

        <Title order={3}>Personality</Title>

        <Select
          label="Energy Level"
          data={["High", "Medium", "Low"]}
          mb={16}
          {...getInputProps("personality.energyLevel")}
        />

        <Select
          label="Temperament"
          data={["Friendly", "Shy", "Aggressive", "Calm", "Playful"]}
          mb={16}
          {...getInputProps("personality.temperament")}
        />

        <Select
          label="Training Level"
          data={["None", "Basic", "Advanced"]}
          mb={16}
          {...getInputProps("personality.training")}
        />

        <TextInput
          label="Pet Behavior"
          mb={16}
          {...getInputProps("personality.petBehavior")}
        />

        <TextInput
          label="Special Traits"
          mb={16}
          {...getInputProps("personality.specialTraits")}
        />

        {/* Adoption Information Section */}
        <Title order={3}>Adoption Information</Title>

        <TextInput
          label="Ideal Home"
          mb={16}
          {...getInputProps("adoptionInfo.idealHome")}
        />

        <Checkbox
          label="Children Friendly"
          mb={16}
          {...getInputProps("adoptionInfo.children", { type: "checkbox" })}
        />

        <Checkbox
          label="Other Pets Friendly"
          mb={16}
          {...getInputProps("adoptionInfo.otherPets", { type: "checkbox" })}
        />

        <Select
          label="Experience Level"
          data={["FirstTimeOwner", "ExperiencedOwner", "Both"]}
          mb={16}
          {...getInputProps("adoptionInfo.experienceLevel")}
        />

        <TextInput
          label="Special Needs"
          mb={16}
          {...getInputProps("adoptionInfo.specialNeeds")}
        />

        {/* Pet Image */}
        <Text fw={600} size="sm" mb={4}>
          Pet Image
        </Text>

        <Dropzone
          onDrop={handleDrop}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
          h={146}
          maxSize={1 * 1024 ** 2}
          multiple
        >
          {droppedImages.length > 0 ? (
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
