
import { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What scents draw you in most naturally?",
    options: [
      {
        id: "q1o1",
        text: "Fresh flowers and botanical gardens",
        scentAssociation: ["floral"]
      },
      {
        id: "q1o2",
        text: "Warm spices and vanilla",
        scentAssociation: ["oriental", "gourmand"]
      },
      {
        id: "q1o3",
        text: "Forest walks and earthy aromas",
        scentAssociation: ["woody"]
      },
      {
        id: "q1o4",
        text: "Citrus fruits and ocean breeze",
        scentAssociation: ["fresh"]
      }
    ]
  },
  {
    id: "q2",
    question: "How would you describe your personal style?",
    options: [
      {
        id: "q2o1",
        text: "Classic and elegant",
        scentAssociation: ["floral", "woody"]
      },
      {
        id: "q2o2",
        text: "Bold and dramatic",
        scentAssociation: ["oriental"]
      },
      {
        id: "q2o3",
        text: "Casual and effortless",
        scentAssociation: ["fresh", "fruity"]
      },
      {
        id: "q2o4",
        text: "Eclectic and creative",
        scentAssociation: ["gourmand", "fruity"]
      }
    ]
  },
  {
    id: "q3",
    question: "What season best represents your personality?",
    options: [
      {
        id: "q3o1",
        text: "Spring - fresh and renewed",
        scentAssociation: ["floral", "fresh"]
      },
      {
        id: "q3o2",
        text: "Summer - vibrant and playful",
        scentAssociation: ["fresh", "fruity"]
      },
      {
        id: "q3o3",
        text: "Fall - warm and sophisticated",
        scentAssociation: ["woody", "oriental"]
      },
      {
        id: "q3o4",
        text: "Winter - cozy and introspective",
        scentAssociation: ["oriental", "gourmand"]
      }
    ]
  },
  {
    id: "q4",
    question: "When do you typically wear fragrance?",
    options: [
      {
        id: "q4o1",
        text: "Daily, as part of my routine",
        scentAssociation: ["fresh", "floral"]
      },
      {
        id: "q4o2",
        text: "Special occasions and evenings out",
        scentAssociation: ["oriental", "woody"]
      },
      {
        id: "q4o3",
        text: "Whenever the mood strikes",
        scentAssociation: ["fruity", "gourmand"]
      },
      {
        id: "q4o4",
        text: "Seasonally, changing with the weather",
        scentAssociation: ["fresh", "oriental"]
      }
    ]
  },
  {
    id: "q5",
    question: "What kind of memory would you like your fragrance to evoke?",
    options: [
      {
        id: "q5o1",
        text: "A garden in full bloom",
        scentAssociation: ["floral"]
      },
      {
        id: "q5o2",
        text: "A cozy evening by the fire",
        scentAssociation: ["woody", "oriental"]
      },
      {
        id: "q5o3",
        text: "A tropical vacation",
        scentAssociation: ["fresh", "fruity"]
      },
      {
        id: "q5o4",
        text: "A decadent dessert",
        scentAssociation: ["gourmand"]
      }
    ]
  }
];

export const personalityTypes = [
  {
    id: "romantic",
    name: "The Romantic",
    description: "You're drawn to classic, timeless scents that evoke elegance and sophistication. Floral and soft oriental fragrances are your natural match.",
    scentFamilies: ["floral", "oriental"],
    recommendedPerfumeIds: ["p1", "p3", "p5"]
  },
  {
    id: "adventurer",
    name: "The Adventurer",
    description: "Vibrant and energetic, you're drawn to fresh, invigorating scents that awaken the senses and inspire action. Citrus and aquatic notes speak to your spirit.",
    scentFamilies: ["fresh", "fruity"],
    recommendedPerfumeIds: ["p4", "p7"]
  },
  {
    id: "sophisticate",
    name: "The Sophisticate",
    description: "You appreciate complexity and depth, gravitating toward rich, layered fragrances that make a statement. Woody and oriental blends complement your refined taste.",
    scentFamilies: ["woody", "oriental"],
    recommendedPerfumeIds: ["p2", "p6"]
  },
  {
    id: "sensualist",
    name: "The Sensualist",
    description: "You enjoy indulgence and comfort, preferring warm, enveloping scents that create a cocoon of pleasure. Gourmand and rich oriental fragrances suit your hedonistic side.",
    scentFamilies: ["gourmand", "oriental"],
    recommendedPerfumeIds: ["p5", "p8"]
  }
];

export const determinePersonalityType = (scentFamilies: string[]) => {
  // Count the frequency of each scent family in the user's answers
  const scentCounts: Record<string, number> = {};
  scentFamilies.forEach(scent => {
    scentCounts[scent] = (scentCounts[scent] || 0) + 1;
  });
  
  // Sort the scent families by frequency
  const topScentFamilies = Object.keys(scentCounts).sort((a, b) => scentCounts[b] - scentCounts[a]);
  
  // Find the personality type that best matches the top scent families
  const matchingType = personalityTypes.find(type => 
    type.scentFamilies.includes(topScentFamilies[0]) && 
    (topScentFamilies[1] ? type.scentFamilies.includes(topScentFamilies[1]) : true)
  );
  
  // Default to the first personality type if no match is found
  return matchingType || personalityTypes[0];
};
