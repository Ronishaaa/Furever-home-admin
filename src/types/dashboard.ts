export type DogStatus = {
  available: number;
  pendingAdoption: number;
  adopted: number;
};

export type BreedDistribution = {
  breed: string;
  count: number;
};

export type ApplicationStatus = "Approved" | "Rejected" | "Pending";

export type RecentApplication = {
  id: number;
  name: string;
  dog: string;
  status: ApplicationStatus;
};

export type RecentDonation = {
  id: number;
  amount: string;
  donor: string;
};

export type DashboardData = {
  totalDogs: number;
  pendingApplications: number;
  approvedThisMonth: number;
  dogStatus: DogStatus;
  breedDistribution: BreedDistribution[];
  recentApplications: RecentApplication[];
  recentDonations: RecentDonation[];
};

export type DashboardResponse = {
  data: DashboardData;
};
