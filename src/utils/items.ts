import { has } from "lodash";
import { Insertable, Art, VariableInsertable, Garment, Floor } from "../definitions/acnh";

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