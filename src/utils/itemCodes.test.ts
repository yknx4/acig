import { parseVariation } from "./itemCodes"

describe('itemCodes', () => {

  const testVariation = (variation: string, expected: string) => test(`should generate ${expected} for variation ${variation}`, () => expect(parseVariation(variation)).toEqual(expected))
  
  describe('parseVariation', () => {
    testVariation('NA', '00000000')
    testVariation('0_0', '00000000')
    testVariation('1_0', '00000001')
    testVariation('2_0', '00000002')
    testVariation('3_0', '00000003')
    testVariation('4_0', '00000004')
    testVariation('5_0', '00000005')
    testVariation('6_0', '00000006')
    testVariation('7_0', '00000007')
    testVariation('7_0', '00000007')
    testVariation('0_1', '00000020')
    testVariation('1_1', '00000021')
    testVariation('7_6', '00000127')
  })
  
})
