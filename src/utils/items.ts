import { has } from "lodash";
import { InvertedVariant } from "./definitions";
import { Recipes } from "../items/recipes";

export function isRecipe(input: any): input is Recipes {
  return has(input, 'craftedItemInternalId')
}

export function isVariant(input: any): input is InvertedVariant {
  return has(input, 'uniqueEntryId') && !has(input, 'craftedItemInternalId')
}