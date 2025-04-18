
export interface ScentFamily {
  id: string;
  name: string;
  description: string;
}

export interface PerfumeNote {
  name: string;
  type: 'top' | 'heart' | 'base';
}

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  scentFamily: string;
  notes: PerfumeNote[];
  imageUrl: string;
  size: string;
  inStock: boolean;
  isNew: boolean;
  isBestseller: boolean;
}

export interface UserPreferences {
  scentFamilies: string[];
  occasions: string[];
  brands: string[];
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  preferences?: UserPreferences;
  favorites?: string[];
  cart?: CartItem[];
  completedQuiz?: boolean;
  quizResults?: {
    recommendedScentFamilies: string[];
    personalityType: string;
    recommendedPerfumes: string[];
  };
}

export type QuizQuestion = {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    scentAssociation: string[];
  }[];
};

export type QuizResult = {
  scentFamilies: string[];
  personalityType: string;
  recommendedPerfumeIds: string[];
};
