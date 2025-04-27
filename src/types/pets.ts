export interface AddPet {
  name: string;
  adoptionStatus?: string;
  age: number;
  breed: string;
  color?: string | null;
  gender: string;
  healthCondition?: string | null;
  vaccination: boolean;
  images?: string[];
  personality: string[];
  energyLevel: string;
  strangerBehavior?: string | null;
  trainingLevel: string;
  specialTraits?: string | null;
  adoptionInfo?: {
    idealHome?: string | null;
    childrenFriendly: boolean;
    otherPetsFriendly: boolean;
    experienceLevel: string;
    specialNeeds?: string | null;
  };
}
