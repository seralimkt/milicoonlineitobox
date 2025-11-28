import {
  Pizza,
  Coffee,
  Cake,
  Salad,
  Sandwich,
  IceCream,
  CupSoda,
  Beef,
  Fish,
  Egg,
  Apple,
  Cherry,
  Grape,
  GemIcon as Lemon,
  Carrot,
  Soup,
  Cookie,
  Croissant,
  Donut,
  Candy,
  Wine,
  Beer,
  GlassWater,
  Milk,
  UtensilsCrossed,
  ChefHat,
  ShoppingBasket,
  Store,
  Utensils,
  Heart,
  Star,
  Sparkles,
  Flame,
  Leaf,
  type LucideIcon,
} from "lucide-react"

export const AVAILABLE_ICONS = {
  // Comidas
  Pizza: Pizza,
  Sandwich: Sandwich,
  Beef: Beef,
  Fish: Fish,
  Egg: Egg,
  Salad: Salad,
  Soup: Soup,
  Utensils: Utensils,
  UtensilsCrossed: UtensilsCrossed,
  ChefHat: ChefHat,

  // Bebidas
  Coffee: Coffee,
  CupSoda: CupSoda,
  Wine: Wine,
  Beer: Beer,
  GlassWater: GlassWater,
  Milk: Milk,

  // Postres y Dulces
  Cake: Cake,
  IceCream: IceCream,
  Cookie: Cookie,
  Croissant: Croissant,
  Donut: Donut,
  Candy: Candy,

  // Frutas y Vegetales
  Apple: Apple,
  Cherry: Cherry,
  Grape: Grape,
  Lemon: Lemon,
  Carrot: Carrot,
  Leaf: Leaf,

  // Otros
  ShoppingBasket: ShoppingBasket,
  Store: Store,
  Heart: Heart,
  Star: Star,
  Sparkles: Sparkles,
  Flame: Flame,
} as const

export type IconName = keyof typeof AVAILABLE_ICONS

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName || !(iconName in AVAILABLE_ICONS)) {
    return UtensilsCrossed
  }
  return AVAILABLE_ICONS[iconName as IconName]
}
