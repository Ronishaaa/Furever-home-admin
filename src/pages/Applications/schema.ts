import { z } from "zod";

export const ApplicationSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number format." }),
  address: z.string().min(1, { message: "Address is required." }),
  householdMembers: z
    .string()
    .min(1, { message: "Please specify household members." }),

  homeOwnership: z.coerce.boolean({
    invalid_type_error: "Home ownership must be selected.",
  }),
  petAllowed: z.coerce.boolean({
    invalid_type_error: "Pet allowance must be selected.",
  }),
  outdoorArea: z.coerce.boolean({
    invalid_type_error: "Outdoor area must be selected.",
  }),
  neuteredPets: z.coerce.boolean({
    invalid_type_error: "Neutered status must be selected.",
  }),

  aloneHours: z.coerce
    .number()
    .min(0, { message: "Hours cannot be negative." })
    .max(24, { message: "Hours cannot exceed 24." }),

  otherPetsInfo: z
    .string()
    .min(1, { message: "Please specify if you have other pets." }),

  upcomingEvents: z.string().optional(),
  applicationStatus: z.enum(["Pending", "Approved", "Rejected"]),
  userId: z.number(),
  petId: z.number(),
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
