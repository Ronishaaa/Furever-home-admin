import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { BiImageAdd, BiLeftArrowAlt, BiX } from "react-icons/bi";
import { MdCalendarToday } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AddRescueStory } from "../../../types";
import {
  useGetUniqueRescueStories,
  useUpdateRescueStories,
  useUploadImage,
} from "../queries";
import { RescueStorySchema } from "../schema";
import { RichTextEditorComp } from "./components";

export const EditRescueStories = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showCancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);
  const {
    data,
    isSuccess,
    isLoading: isDataLoading,
  } = useGetUniqueRescueStories(Number(id), Boolean(id));
  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const {
    getInputProps,
    onSubmit,
    isDirty,
    setInitialValues,
    reset,
    values,
    setFieldValue,
  } = useForm({
    initialValues: {
      title: "",
      description: "",
      rescueDate: undefined,
      imageUrl: [] as string[],
    },
    validate: zodResolver(RescueStorySchema),
  });

  const { mutate: updateRescueStory, isSuccess: isUpdateStory } =
    useUpdateRescueStories();

  const { mutateAsync: uploadImage, isPending } = useUploadImage();

  const AddRescueStory = async (values: AddRescueStory) => {
    const validId: string | undefined = id ? id : undefined;

    if (validId) {
      updateRescueStory({
        id: Number(validId),
        values: values,
      });
    }
  };

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
        setFieldValue("imageUrl", [...droppedImages, ...uploadedUris]);
      } else {
        console.error("Image upload failed. Response:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues({
        ...data.data,
        rescueDate: data.data.rescueDate
          ? new Date(data.data.rescueDate)
          : undefined,
      });
      setDroppedImages(data?.data?.imageUrl);
      reset(); // reset the form state after updating initial values
    }
  }, [data, isSuccess, reset, setInitialValues]);

  useEffect(() => {
    if (isUpdateStory) {
      Notifications.show({
        title: "Updated Successfully",
        message: "Story updated successfully 😊",
      });
    }
  }, [isUpdateStory]);

  const handleDelete = (index: number) => {
    const updatedImages = droppedImages.filter((_, i) => i !== index);
    setDroppedImages(updatedImages);
    setFieldValue("imageUrl", updatedImages);
  };

  return (
    <Container>
      <LoadingOverlay visible={isDataLoading} zIndex={1000} />
      <form onSubmit={onSubmit(AddRescueStory)}>
        <Flex justify="space-between" align="center" mb={32}>
          <Group>
            <Button size="sm" variant="outline" onClick={cancelData}>
              <BiLeftArrowAlt size={20} />
            </Button>

            <Title order={2}>Edit Rescue Story</Title>
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

        <TextInput label="Title" mb={16} {...getInputProps("title")} />

        <Text>Story</Text>
        <RichTextEditorComp
          value={values.description}
          onChange={(value) => setFieldValue("description", value)}
        />

        <DateInput
          label="Rescue Date"
          rightSection={<MdCalendarToday size={18} color="#757575" />}
          rightSectionPointerEvents="none"
          {...getInputProps("rescueDate")}
        />

        <Text>Image</Text>

        <Dropzone
          onDrop={handleDrop}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
          h={146}
          maxSize={1 * 1024 ** 2}
          multiple
          styles={{ inner: { pointerEvents: "all" } }}
        >
          {isPending && (
            <Box
              pos="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              bg="rgba(255,255,255,0.6)"
              display="flex"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader size="md" color="blue" />
            </Box>
          )}
          {droppedImages?.length > 0 ? (
            <Flex wrap="wrap" gap={2}>
              {droppedImages.map((src, index) => (
                <Box key={index} pos="relative">
                  <Image
                    h={121}
                    w={121}
                    src={src}
                    alt="Rescue Image"
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
                Drop your Rescue's images here, or click to browse
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
