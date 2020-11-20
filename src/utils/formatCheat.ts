import { parseVariation, realId } from './itemCodes';
import { decimalToHex } from './numeric';
import ot from '../data/output_template.json'
import { isRecipe } from './items';
import { Variant } from '../items/items';
import { Recipes } from '../items/recipes';

type Player = keyof typeof ot

const inventoryOffsets: Record<Player, number> = {
  "Player 1": 0xAD3C7FD8,
  "Player 2": 0xAD4FBB50,
  "Player 3": 0xAD62F6C8,
  "Player 4": 0xAD763240,
  "Player 5": 0xAD763240, //WRONG
  "Player 6": 0xAD763240, //WRONG
  "Player 7": 0xAD763240, //WRONG
  "Player 8": 0xAD763240, //WRONG
}

const slotSize = 0x8

function generateTemplate(index: number, player: Player = "Player 1"): [string, string, string, string] {
  const inventoryPosition = inventoryOffsets[player] + (index * slotSize)
  return ["08100000", inventoryPosition.toString(16).toUpperCase(), "00000000", "0000FFFE"]
}


function recipeCheat(item: Recipes): string[] {
  return [decimalToHex(realId(item)), '000016A2']
}

function itemCheat(item: Variant): string[] {
  return [item.variantId != null ? parseVariation(item.variantId) : '00000000', decimalToHex(realId(item))]
}

export function formatCheat(item: Variant | Recipes, indexAsString: string, player: Player = "Player 1") {
  const index = parseInt(indexAsString, 10);
  const template = generateTemplate(index, player)
  const [thirdField, fourthField] =  isRecipe(item) ? recipeCheat(item) : itemCheat(item)
  return `${template[0]} ${template[1]} ${thirdField} ${fourthField}\n`;
}
