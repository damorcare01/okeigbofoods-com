import spinach from "@/assets/products/spinach.jpg";
import okra from "@/assets/products/okra.jpg";
import ugu from "@/assets/products/ugu.jpg";
import tomato from "@/assets/products/tomato.jpg";
import pepper from "@/assets/products/pepper.jpg";
import onion from "@/assets/products/onion.jpg";
import beef from "@/assets/products/beef.jpg";
import chicken from "@/assets/products/chicken.jpg";
import goat from "@/assets/products/goat.jpg";
import turkey from "@/assets/products/turkey.jpg";
import yam from "@/assets/products/yam.jpg";
import rice from "@/assets/products/rice.jpg";
import beans from "@/assets/products/beans.jpg";
import millet from "@/assets/products/millet.jpg";
import garri from "@/assets/products/garri.jpg";
import egusi from "@/assets/products/egusi.jpg";
import crayfish from "@/assets/products/crayfish.jpg";
import uziza from "@/assets/products/uziza.jpg";
import ehuru from "@/assets/products/ehuru.jpg";
import suya from "@/assets/products/suya.jpg";

export type CategorySlug = "vegetables" | "halal-meat" | "grains-cereals" | "spices";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  origin: string;
  price: number; // in NGN
  unit: string;
  img: string;
  organic: boolean;
  halal: boolean;
  tags: string[];
  description: string;
  rating: number;
}

export const CATEGORIES: { slug: CategorySlug; title: string; emoji: string; desc: string }[] = [
  { slug: "vegetables", title: "Fresh Vegetables", emoji: "🥬", desc: "Ugu, spinach, okra, tomato & more" },
  { slug: "halal-meat", title: "Halal Meat", emoji: "🥩", desc: "Certified halal beef, chicken, goat" },
  { slug: "grains-cereals", title: "Grains & Cereals", emoji: "🌾", desc: "Ofada rice, beans, millet, garri" },
  { slug: "spices", title: "Spices & Herbs", emoji: "🌶️", desc: "Uziza, ehuru, crayfish, suya mix" },
];

export const PRODUCTS: Product[] = [
  // Vegetables
  { id: "v1", name: "Organic Spinach (Efo Tete)", slug: "spinach", category: "vegetables", origin: "Ogun State", price: 650, unit: "large bunch", img: spinach, organic: true, halal: true, tags: ["Organic", "New"], description: "Hand-picked tender spinach leaves from organic Ogun farms.", rating: 4.9 },
  { id: "v2", name: "Fresh Okra", slug: "okra", category: "vegetables", origin: "Kano State", price: 900, unit: "500g bag", img: okra, organic: true, halal: true, tags: ["Organic"], description: "Crisp, young okra perfect for soups and stews.", rating: 4.8 },
  { id: "v3", name: "Ugu (Pumpkin Leaves)", slug: "ugu", category: "vegetables", origin: "Enugu State", price: 750, unit: "bunch", img: ugu, organic: true, halal: true, tags: ["Organic", "Bestseller"], description: "Iron-rich pumpkin leaves, freshly harvested.", rating: 4.9 },
  { id: "v4", name: "Plum Tomatoes", slug: "tomato", category: "vegetables", origin: "Kaduna State", price: 1200, unit: "1kg", img: tomato, organic: false, halal: true, tags: ["Bestseller"], description: "Ripe Roma-style tomatoes, perfect for stew.", rating: 4.7 },
  { id: "v5", name: "Scotch Bonnet Pepper", slug: "pepper", category: "vegetables", origin: "Ogun State", price: 1500, unit: "500g", img: pepper, organic: true, halal: true, tags: ["Organic", "Hot"], description: "Fiery red ata rodo with deep flavor.", rating: 4.9 },
  { id: "v6", name: "Red Onions", slug: "onion", category: "vegetables", origin: "Sokoto State", price: 1800, unit: "2kg net", img: onion, organic: false, halal: true, tags: ["Bestseller"], description: "Sweet northern red onions, large bulbs.", rating: 4.6 },

  // Halal meat
  { id: "m1", name: "Halal Beef (Bone-In)", slug: "beef", category: "halal-meat", origin: "Kaduna State", price: 6500, unit: "1kg", img: beef, organic: true, halal: true, tags: ["Halal", "Bestseller"], description: "Grass-fed beef, butchered same-day under halal certification.", rating: 4.9 },
  { id: "m2", name: "Halal Whole Chicken", slug: "chicken", category: "halal-meat", origin: "Oyo State", price: 4500, unit: "~1.5kg", img: chicken, organic: true, halal: true, tags: ["Halal", "New"], description: "Free-range chicken, halal-slaughtered and cleaned.", rating: 4.8 },
  { id: "m3", name: "Halal Goat Meat", slug: "goat", category: "halal-meat", origin: "Sokoto State", price: 8200, unit: "1kg", img: goat, organic: true, halal: true, tags: ["Halal"], description: "Tender goat meat for asun, pepper soup, and stews.", rating: 4.9 },
  { id: "m4", name: "Halal Turkey Drumsticks", slug: "turkey", category: "halal-meat", origin: "Oyo State", price: 5800, unit: "1kg", img: turkey, organic: false, halal: true, tags: ["Halal"], description: "Smoky, meaty turkey drumsticks ready to grill.", rating: 4.7 },

  // Grains
  { id: "g1", name: "Premium Benue Yam", slug: "yam", category: "grains-cereals", origin: "Benue State", price: 3200, unit: "tuber", img: yam, organic: true, halal: true, tags: ["Organic", "Bestseller"], description: "Large, sweet white yams from Benue's yam belt.", rating: 4.9 },
  { id: "g2", name: "Ofada Rice", slug: "ofada-rice", category: "grains-cereals", origin: "Ogun State", price: 5500, unit: "5kg bag", img: rice, organic: true, halal: true, tags: ["Organic"], description: "Locally-grown unpolished Ofada rice.", rating: 4.8 },
  { id: "g3", name: "Brown Beans (Honey Beans)", slug: "beans", category: "grains-cereals", origin: "Kebbi State", price: 4200, unit: "5kg", img: beans, organic: true, halal: true, tags: ["Organic"], description: "Sweet honey beans for moi-moi and akara.", rating: 4.7 },
  { id: "g4", name: "Pearl Millet", slug: "millet", category: "grains-cereals", origin: "Jigawa State", price: 3800, unit: "5kg", img: millet, organic: true, halal: true, tags: ["Organic"], description: "Whole pearl millet grain, gluten-free.", rating: 4.6 },
  { id: "g5", name: "White Garri (Ijebu)", slug: "garri", category: "grains-cereals", origin: "Ogun State", price: 2200, unit: "4L bowl", img: garri, organic: false, halal: true, tags: ["Bestseller"], description: "Fine, sour Ijebu garri for eba or soaking.", rating: 4.8 },

  // Spices
  { id: "s1", name: "Egusi (Melon Seed)", slug: "egusi", category: "spices", origin: "Kogi State", price: 2800, unit: "1kg", img: egusi, organic: true, halal: true, tags: ["Organic"], description: "Hand-shelled melon seeds for egusi soup.", rating: 4.9 },
  { id: "s2", name: "Dried Crayfish", slug: "crayfish", category: "spices", origin: "Cross River", price: 3500, unit: "500g", img: crayfish, organic: false, halal: true, tags: ["Bestseller"], description: "Smoky, sun-dried crayfish — finely ground.", rating: 4.9 },
  { id: "s3", name: "Uziza Seeds", slug: "uziza", category: "spices", origin: "Imo State", price: 1600, unit: "200g jar", img: uziza, organic: true, halal: true, tags: ["Organic"], description: "Aromatic uziza for pepper soup and yam.", rating: 4.7 },
  { id: "s4", name: "Ehuru (Calabash Nutmeg)", slug: "ehuru", category: "spices", origin: "Edo State", price: 1900, unit: "150g", img: ehuru, organic: true, halal: true, tags: ["Organic"], description: "Warm, woody ehuru for pepper soup spice mix.", rating: 4.8 },
  { id: "s5", name: "Suya Spice Mix (Yaji)", slug: "suya", category: "spices", origin: "Kaduna State", price: 1800, unit: "200g jar", img: suya, organic: false, halal: true, tags: ["Halal", "Bestseller"], description: "Authentic northern yaji blend with peanut & ginger.", rating: 4.9 },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getProductsByCategory = (slug: CategorySlug) => PRODUCTS.filter((p) => p.category === slug);
