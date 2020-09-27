import { has } from "lodash";
import { Insertable, Art, VariableInsertable, Garment, Floor, HasColor, Recipe } from "../definitions/acnh";

export function isArt(val: Insertable | Art): val is Art {
  return has(val, 'Genuine')
}

export function isVariableInsertable(val: Insertable | VariableInsertable): val is VariableInsertable {
  return has(val, 'Variant ID')
}

export function isGarment(val: Insertable | Garment): val is Garment {
  return has(val, 'Style')
}

export function isFloor(val: Insertable | Floor): val is Floor {
  return has(val, 'HHA Concept 1')
}

export function hasColor(val: any): val is HasColor {
  return has(val, 'Color 1') && has(val, 'Color 2')
}

export function isRecipe(val: Insertable): val is Recipe {
  return has(val, 'Crafted Item Internal ID')
}