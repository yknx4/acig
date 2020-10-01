import { has } from "lodash";
import { Variant } from "../items/items";
import { Recipes } from "../items/recipes";

export function isRecipe(input: any): input is Recipes {
  return has(input, 'craftedItemInternalId')
}

export function isVariant(input: any): input is Variant {
  return has(input, 'uniqueEntryId')
}