export interface Application {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  householdMembers: string;
  homeOwnership: boolean;
  petAllowed: boolean;
  outdoorArea: boolean;
  aloneHours: number;
  otherPetsInfo: string;
  neuteredPets: boolean;
  upcomingEvents?: string;
  applicationStatus?: "Pending" | "Approved" | "Rejected";
  userId: number;
  petId: number;
}
