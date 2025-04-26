import { z } from "zod";

export const PetSchema = z.object({
  name: z
    .string({ required_error: "Pet name is required" })
    .min(1, { message: "Pet name cannot be empty" }),

  breed: z
    .string({ required_error: "Breed is required" })
    .min(1, { message: "Breed cannot be empty" }),

  age: z
    .number({ required_error: "Age is required" })
    .min(0, { message: "Age must be a positive number" }),

  gender: z
    .string({ required_error: "Gender is required" })
    .min(1, { message: "Gender cannot be empty" }),

  color: z
    .string({ invalid_type_error: "Color must be a string" })
    .nullable()
    .optional(),

  healthCondition: z
    .string({ invalid_type_error: "Health condition must be a string" })
    .nullable()
    .optional(),

  vaccination: z.boolean({ required_error: "Vaccination status is required" }),

  adoptionStatus: z.string({ required_error: "Adoption status is required" }),

  images: z.array(
    z.string({ invalid_type_error: "Each image must be a string URL" })
  ),
  energyLevel: z.string({ required_error: "Energy level is required" }),

  trainingLevel: z.string({ required_error: "Training level is required" }),

  strangerBehavior: z
    .string({ invalid_type_error: "Stranger behavior must be a string" })
    .nullable()
    .optional(),

  specialTraits: z
    .string({ invalid_type_error: "Special traits must be a string" })
    .nullable()
    .optional(),

  personality: z.array(
    z.string({ invalid_type_error: "Each personality must be a string" }),
    { required_error: "At least one personality trait is required" }
  ),

  adoptionInfo: z
    .object({
      idealHome: z
        .string({ invalid_type_error: "Ideal home must be a string" })
        .nullable()
        .optional(),

      childrenFriendly: z.boolean({
        required_error: "Children-friendly status is required",
      }),

      otherPetsFriendly: z.boolean({
        required_error: "Other pets-friendly status is required",
      }),

      experienceLevel: z.string({
        required_error: "Experience level is required",
      }),

      specialNeeds: z
        .string({ invalid_type_error: "Special needs must be a string" })
        .nullable()
        .optional(),
    })
    .optional(),
});

export type PetInput = z.infer<typeof PetSchema>;
