import { parseVariation, realId } from './itemCodes';
import { decimalToHex } from './numeric';
import { Insertable, Recipe, VariableInsertable } from '../definitions/acnh';
import ot from '../data/output_template.json'
import { isRecipe, isVariableInsertable } from './items';

const outputTemplate = ot as string[][]

function recipeCheat(item: Recipe): string[] {
  return [decimalToHex(realId(item)), '000016A2']
}

function itemCheat(item: Insertable | VariableInsertable): string[] {
  return [isVariableInsertable(item) ? parseVariation(item["Variant ID"]) : '00000000', decimalToHex(realId(item))]
}

export function formatCheat(item: Insertable | VariableInsertable, indexAsString: string) {
  const index = parseInt(indexAsString, 10);
  const template = outputTemplate[index];
  const [thirdField, fourthField] =  isRecipe(item) ? recipeCheat(item) : itemCheat(item)
  return `${template[0]} ${template[1]} ${thirdField} ${fourthField}\n`;
}
