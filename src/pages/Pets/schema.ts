import { z } from "zod";

export const PetSchema = z.object({
  name: z.string().min(1, { message: "Pet name is required" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  age: z.number().min(0, { message: "Age must be a positive number" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  color: z.string().nullable().optional(),
  healthCondition: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  vaccination: z.boolean(),
  adoptionStatus: z.string(),
  images: z.array(z.string()).optional(),
  energyLevel: z.string(),
  trainingLevel: z.string(),
  strangerBehavior: z.string().nullable().optional(),
  specialTraits: z.string().nullable().optional(),
  personality: z.array(z.string()),
  adoptionInfo: z
    .object({
      idealHome: z.string().nullable().optional(),
      childrenFriendly: z.boolean(),
      otherPetsFriendly: z.boolean(),
      experienceLevel: z.string(),
      specialNeeds: z.string().nullable().optional(),
    })
    .optional(),
});

export type PetInput = z.infer<typeof PetSchema>;
