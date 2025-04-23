import { Perfume, ScentFamily } from "../types";

export const scentFamilies: ScentFamily[] = [
  {
    id: "floral",
    name: "Floral",
    description: "Romantic and feminine scents featuring flowers like rose, jasmine, and lily."
  },
  {
    id: "oriental",
    name: "Oriental",
    description: "Rich, warm scents with notes of vanilla, spices, and amber."
  },
  {
    id: "woody",
    name: "Woody",
    description: "Earthy and sophisticated scents with notes of sandalwood, cedar, and patchouli."
  },
  {
    id: "fresh",
    name: "Fresh",
    description: "Clean, vibrant scents with citrus, aquatic, or green notes."
  },
  {
    id: "fruity",
    name: "Fruity",
    description: "Sweet and vibrant scents featuring fruit notes like apple, peach, and berry."
  },
  {
    id: "gourmand",
    name: "Gourmand",
    description: "Sweet, edible scents with notes of vanilla, caramel, and chocolate."
  }
];

export const perfumes: Perfume[] = [
  {
    id: "p1",
    name: "Midnight Orchid",
    brand: "Maison Elixir",
    price: 125,
    description: "A mysterious and sensual fragrance that unfolds like a night-blooming flower. Top notes of black currant and bergamot open to a heart of rare orchid and jasmine, with a base of warm vanilla and amber.",
    scentFamily: "floral",
    notes: [
      { name: "Black Currant", type: "top" },
      { name: "Bergamot", type: "top" },
      { name: "Orchid", type: "heart" },
      { name: "Jasmine", type: "heart" },
      { name: "Vanilla", type: "base" },
      { name: "Amber", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "50ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p2",
    name: "Amber Woods",
    brand: "Lumineux",
    price: 180,
    description: "A sophisticated woody fragrance that captures the essence of a sunlit forest. Bergamot and citrus give way to heart notes of cedarwood and vetiver, settling into a rich base of amber and musk.",
    scentFamily: "woody",
    notes: [
      { name: "Bergamot", type: "top" },
      { name: "Citrus", type: "top" },
      { name: "Cedarwood", type: "heart" },
      { name: "Vetiver", type: "heart" },
      { name: "Amber", type: "base" },
      { name: "Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "75ml",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: "p3",
    name: "Velvet Rose",
    brand: "Maison Elixir",
    price: 150,
    description: "An opulent floral fragrance built around the queen of flowers. Bulgarian rose and peony are accentuated by hints of raspberry, while patchouli and white musk create a lasting impression.",
    scentFamily: "floral",
    notes: [
      { name: "Raspberry", type: "top" },
      { name: "Bulgarian Rose", type: "heart" },
      { name: "Peony", type: "heart" },
      { name: "Patchouli", type: "base" },
      { name: "White Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "50ml",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: "p4",
    name: "Mediterranean Citrus",
    brand: "Soleil Parfums",
    price: 110,
    description: "A vibrant, refreshing fragrance inspired by the Italian coast. Bursting with lemon, bergamot, and orange blossom, balanced by a light base of white musk and cedar.",
    scentFamily: "fresh",
    notes: [
      { name: "Lemon", type: "top" },
      { name: "Bergamot", type: "top" },
      { name: "Orange Blossom", type: "heart" },
      { name: "White Musk", type: "base" },
      { name: "Cedar", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p5",
    name: "Vanilla Dreams",
    brand: "Lumineux",
    price: 135,
    description: "A warm, indulgent fragrance that envelops you like a cashmere blanket. Madagascar vanilla is complemented by tonka bean and praline, creating a deliciously comforting scent.",
    scentFamily: "oriental",
    notes: [
      { name: "Almond", type: "top" },
      { name: "Madagascar Vanilla", type: "heart" },
      { name: "Tonka Bean", type: "heart" },
      { name: "Praline", type: "base" },
      { name: "Sandalwood", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "50ml",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: "p6",
    name: "Oud Royale",
    brand: "Noir Collection",
    price: 220,
    description: "A majestic and luxurious fragrance centered around precious oud. Spicy saffron and cardamom create an opulent opening, while rose and oud form a rich heart, finishing with a base of smoky incense.",
    scentFamily: "woody",
    notes: [
      { name: "Saffron", type: "top" },
      { name: "Cardamom", type: "top" },
      { name: "Rose", type: "heart" },
      { name: "Oud", type: "heart" },
      { name: "Incense", type: "base" },
      { name: "Amber", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "75ml",
    inStock: false,
    isNew: false,
    isBestseller: false
  },
  {
    id: "p7",
    name: "Berry Bliss",
    brand: "Soleil Parfums",
    price: 95,
    description: "A playful and vibrant fruity fragrance that sparkles with red berries and mandarin, blended with a touch of peony and jasmine for a delicate floral heart.",
    scentFamily: "fruity",
    notes: [
      { name: "Red Berries", type: "top" },
      { name: "Mandarin", type: "top" },
      { name: "Peony", type: "heart" },
      { name: "Jasmine", type: "heart" },
      { name: "White Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "50ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p8",
    name: "Caramel Embrace",
    brand: "Noir Collection",
    price: 145,
    description: "A decadent gourmand fragrance featuring salted caramel and praline. The sweetness is balanced by a touch of sea salt and a warm base of sandalwood and vanilla.",
    scentFamily: "gourmand",
    notes: [
      { name: "Sea Salt", type: "top" },
      { name: "Caramel", type: "heart" },
      { name: "Praline", type: "heart" },
      { name: "Sandalwood", type: "base" },
      { name: "Vanilla", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "50ml",
    inStock: true,
    isNew: false,
    isBestseller: true
  },
  {
    id: "p9",
    name: "Bold Devotion",
    brand: "Luxury Scents",
    price: 1550,
    description: "A passionate oriental fragrance that captures the essence of unwavering devotion. Rich amber and exotic spices blend with deep vanilla and precious woods.",
    scentFamily: "oriental",
    notes: [
      { name: "Saffron", type: "top" },
      { name: "Pink Pepper", type: "top" },
      { name: "Rose", type: "heart" },
      { name: "Amber", type: "heart" },
      { name: "Vanilla", type: "base" },
      { name: "Oud", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p10",
    name: "Butterfly Kiss",
    brand: "Luxury Scents",
    price: 1550,
    description: "A delicate floral fragrance as light as a butterfly's touch. Blends tender petals of jasmine and lily of the valley with a hint of sweet nectar.",
    scentFamily: "floral",
    notes: [
      { name: "Bergamot", type: "top" },
      { name: "Peach Blossom", type: "top" },
      { name: "Jasmine", type: "heart" },
      { name: "Lily of the Valley", type: "heart" },
      { name: "White Musk", type: "base" },
      { name: "Honey", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p11",
    name: "Ramoz-e-Ishaq",
    brand: "Luxury Scents",
    price: 1550,
    description: "A mysterious oriental blend that unveils the secrets of love. Rich spices and precious resins create an enigmatic and captivating aroma.",
    scentFamily: "oriental",
    notes: [
      { name: "Cardamom", type: "top" },
      { name: "Black Pepper", type: "top" },
      { name: "Rose Absolute", type: "heart" },
      { name: "Agarwood", type: "heart" },
      { name: "Amber", type: "base" },
      { name: "Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p12",
    name: "Passion Amber",
    brand: "Luxury Scents",
    price: 1550,
    description: "An intense oriental fragrance where passionate amber meets exotic spices. A warm and sensual blend that leaves an unforgettable impression.",
    scentFamily: "oriental",
    notes: [
      { name: "Bergamot", type: "top" },
      { name: "Cinnamon", type: "top" },
      { name: "Amber", type: "heart" },
      { name: "Rose", type: "heart" },
      { name: "Vanilla", type: "base" },
      { name: "Patchouli", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p13",
    name: "Broke My Heart",
    brand: "Luxury Scents",
    price: 1550,
    description: "A bittersweet symphony of dark roses and smoky incense. This profound oriental fragrance captures the essence of intense emotions.",
    scentFamily: "oriental",
    notes: [
      { name: "Black Rose", type: "top" },
      { name: "Red Berries", type: "top" },
      { name: "Dark Vanilla", type: "heart" },
      { name: "Incense", type: "heart" },
      { name: "Leather", type: "base" },
      { name: "Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p14",
    name: "Mazi",
    brand: "Luxury Scents",
    price: 1550,
    description: "A nostalgic oriental fragrance that captures memories of the past. Sweet vanilla and precious woods create a comforting and lasting impression.",
    scentFamily: "oriental",
    notes: [
      { name: "Sweet Orange", type: "top" },
      { name: "Almond", type: "top" },
      { name: "Vanilla Pod", type: "heart" },
      { name: "Cedarwood", type: "heart" },
      { name: "Sandalwood", type: "base" },
      { name: "Amber", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p15",
    name: "Wild Affection",
    brand: "Luxury Scents",
    price: 1550,
    description: "An untamed floral fragrance that speaks of passionate love. Wild roses and exotic flowers blend with warm woods and musk.",
    scentFamily: "floral",
    notes: [
      { name: "Wild Rose", type: "top" },
      { name: "Pink Pepper", type: "top" },
      { name: "Jasmine", type: "heart" },
      { name: "Orchid", type: "heart" },
      { name: "Sandalwood", type: "base" },
      { name: "Musk", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  },
  {
    id: "p16",
    name: "Angel Veil",
    brand: "Luxury Scents",
    price: 1550,
    description: "A heavenly floral fragrance as soft as angel wings. Delicate white flowers and powdery notes create an ethereal and pure aroma.",
    scentFamily: "floral",
    notes: [
      { name: "White Lily", type: "top" },
      { name: "Iris", type: "top" },
      { name: "Jasmine", type: "heart" },
      { name: "Orange Blossom", type: "heart" },
      { name: "White Musk", type: "base" },
      { name: "Vanilla", type: "base" }
    ],
    imageUrl: "/placeholder.svg",
    size: "100ml",
    inStock: true,
    isNew: true,
    isBestseller: false
  }
];

export const getRelatedPerfumes = (perfumeId: string, limit: number = 4): Perfume[] => {
  const perfume = perfumes.find(p => p.id === perfumeId);
  if (!perfume) return [];
  
  return perfumes
    .filter(p => p.id !== perfumeId && p.scentFamily === perfume.scentFamily)
    .slice(0, limit);
};

export const getPerfumesByScentFamily = (scentFamilyId: string): Perfume[] => {
  return perfumes.filter(p => p.scentFamily === scentFamilyId);
};

export const getNewArrivals = (limit: number = 4): Perfume[] => {
  return perfumes.filter(p => p.isNew).slice(0, limit);
};

export const getBestsellers = (limit: number = 4): Perfume[] => {
  return perfumes.filter(p => p.isBestseller).slice(0, limit);
};

export const getPerfumeById = (id: string): Perfume | undefined => {
  return perfumes.find(p => p.id === id);
};
