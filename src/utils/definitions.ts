import { Recipes } from "../items/recipes";
import {Items, Variant} from '../items/items'

export interface ExtendedRecipe extends Recipes {
  item?: Omit<Items, 'variants' | 'sourceSheet'>
}
export interface InvertedVariant extends Variant {
  name: string
  item: Omit<Items, 'variants' | 'sourceSheet'>
}
export type AnyItem = InvertedVariant | ExtendedRecipe
