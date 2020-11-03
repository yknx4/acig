import { Recipes } from "../items/recipes";
import {Items, Variant} from '../items/items'
export interface InvertedVariant extends Variant {
  name: string
  item: Omit<Items, 'variants'>
}
export type AnyItem = InvertedVariant | Recipes
