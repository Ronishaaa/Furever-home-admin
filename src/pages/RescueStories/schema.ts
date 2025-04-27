import { z } from "zod";

export const RescueStorySchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, { message: "Description is required" }),
  rescueDate: z.date({ required_error: "Rescue date is required" }),
  imageUrl: z
    .array(
      z.string({
        required_error: "Image is required",
      })
    )
    .min(1, { message: "At least one image is required" }),
});

export type RescueStoryInput = z.infer<typeof RescueStorySchema>;
