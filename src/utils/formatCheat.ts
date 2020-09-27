import { parseVariation, realId } from './itemCodes';
import { decimalToHex } from './numeric';
import { Insertable, VariableInsertable } from '../definitions/acnh';
import ot from '../data/output_template.json'
import { isVariableInsertable } from './items';

const outputTemplate = ot as string[][]

export function formatCheat(item: Insertable | VariableInsertable, indexAsString: string) {
  const index = parseInt(indexAsString, 10);
  const template = outputTemplate[index];
  const thirdField = isVariableInsertable(item) ? parseVariation(item["Variant ID"]) : '00000000'
  return `${template[0]} ${template[1]} ${thirdField} ${decimalToHex(realId(item))}\n`;
}
