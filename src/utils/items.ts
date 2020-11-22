import { has } from "lodash";
import { InvertedVariant, ExtendedRecipe } from "./definitions";
import { Recipes } from "../items/recipes";
import {Item} from '../items/all'
import allItems from '../items/all.json'

export function isRecipe(input: any): input is Recipes {
  return has(input, 'craftedItemInternalId')
}

export function isVariant(input: any): input is InvertedVariant {
  return has(input, 'uniqueEntryId') && !has(input, 'craftedItemInternalId')
}

export function inflateRecipes(recipe: Recipes): ExtendedRecipe {
  return {
    ...recipe,
    // @ts-expect-error
    item: (allItems as Item[]).find(i => i.internalId === recipe.craftedItemInternalId)
  }
}