import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
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
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import { BiImageAdd, BiLeftArrowAlt, BiX } from "react-icons/bi";
import { MdCalendarToday } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AddRescueStory } from "../../../types";
import { useAddRescueStories, useUploadImage } from "../queries";
import { RescueStoryInput, RescueStorySchema } from "../schema";

export const AddRescueStories = () => {
  const navigate = useNavigate();

  const [showCancelModal, { open: openCancelModal, close: closeCancelModal }] =
    useDisclosure(false);

  const [droppedImages, setDroppedImages] = useState<string[]>([]);
  const {
    getInputProps,
    setFieldValue,
    onSubmit,
    isDirty,
    setFieldError,
    values,
    errors,
  } = useForm<RescueStoryInput>({
    validate: zodResolver(RescueStorySchema),
  });

  const {
    mutate: AddRescueStoryMutation,
    isSuccess,
    error,
  } = useAddRescueStories();
  const { mutateAsync: uploadImage } = useUploadImage();

  const AddRescueStory = async (values: AddRescueStory) => {
    AddRescueStoryMutation(values);
  };

  useEffect(() => {
    if (isSuccess) {
      Notifications.show({
        title: "Added Successfully",
        message: "Rescue added successfully 😊",
      });
      navigate("/rescue-stories");
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

        setDroppedImages((prev) => {
          const updatedImages = [...prev, ...uploadedUris];
          setFieldValue("imageUrl", updatedImages);
          return updatedImages;
        });
      } else {
        console.error("Image upload failed. Response:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  useEffect(() => {
    console.log("Form values updated:", values);
  }, [values, values.imageUrl]);
  const handleDelete = (index: number) => {
    setDroppedImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      setFieldValue("imageUrl", updatedImages);
      return updatedImages;
    });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: values.description,
    onUpdate: ({ editor }) => setFieldValue("description", editor.getHTML()),
  });
  return (
    <Container>
      <LoadingOverlay />
      <form onSubmit={onSubmit(AddRescueStory)}>
        <Flex justify="space-between" align="center" mb={32}>
          <Group>
            <Button size="sm" variant="outline" onClick={cancelData}>
              <BiLeftArrowAlt size={20} />
            </Button>

            <Title order={2}>Add Rescue Story</Title>
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

        <Text fw={600}>Story</Text>
        <RichTextEditor
          editor={editor}
          style={{
            border: errors.description ? "1px solid #fa5252" : "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content __size="100px" />
        </RichTextEditor>
        {errors.description && (
          <Text c="red" size="sm" mt={8}>
            {errors.description}
          </Text>
        )}

        <DateInput
          label="Rescue Date"
          rightSection={<MdCalendarToday size={18} color="#757575" />}
          rightSectionPointerEvents="none"
          {...getInputProps("rescueDate")}
        />

        <Text fw={600}>Image</Text>

        <Dropzone
          onDrop={handleDrop}
          accept={["image/png", "image/jpeg", "image/webp", "image/jpg"]}
          h={146}
          maxSize={1 * 1024 ** 2}
          multiple
          styles={{ inner: { pointerEvents: "all" } }}
          style={{
            border: errors.imageUrl ? "1px dotted #fa5252" : "1px dotted #ddd",
            borderRadius: "4px",
          }}
        >
          {droppedImages.length > 0 ? (
            <Flex wrap="wrap" gap={2} className="z-50">
              {droppedImages.map((src, index) => (
                <Box key={index} pos="relative">
                  <Image
                    h={121}
                    w={121}
                    src={src}
                    className="z-30"
                    alt="Rescue Image"
                    fit="contain"
                  />
                  <div className="z-20" onClick={() => handleDelete(index)}>
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
        {errors.imageUrl && (
          <Text c="red" size="sm" mt={8}>
            {errors.imageUrl}
          </Text>
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
