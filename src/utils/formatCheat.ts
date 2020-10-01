import { parseVariation, realId } from './itemCodes';
import { decimalToHex } from './numeric';
import ot from '../data/output_template.json'
import { isRecipe } from './items';
import { Variant } from '../items/items';
import { Recipes } from '../items/recipes';

const outputTemplate = ot
type Player = keyof typeof ot

function recipeCheat(item: Recipes): string[] {
  return [decimalToHex(realId(item)), '000016A2']
}

function itemCheat(item: Variant): string[] {
  
  return [item.variantId != null ? parseVariation(item.variantId) : '00000000', decimalToHex(realId(item))]
}

export function formatCheat(item: Variant | Recipes, indexAsString: string, player: Player = "Player 1") {
  const index = parseInt(indexAsString, 10);
  const template = outputTemplate[player][index];
  const [thirdField, fourthField] =  isRecipe(item) ? recipeCheat(item) : itemCheat(item)
  return `${template[0]} ${template[1]} ${thirdField} ${fourthField}\n`;
}
