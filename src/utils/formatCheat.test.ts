import { range } from "lodash"
import { getInventoryAddres } from "./formatCheat"

describe('getInventoryAddres', () => {
  it('should generate valid addresses for all 40 slots', () => {
    const result = ["ACDAD530",
      "ACDAD538",
      "ACDAD540",
      "ACDAD548",
      "ACDAD550",
      "ACDAD558",
      "ACDAD560",
      "ACDAD568",
      "ACDAD570",
      "ACDAD578",
      "ACDAD580",
      "ACDAD588",
      "ACDAD590",
      "ACDAD598",
      "ACDAD5A0",
      "ACDAD5A8",
      "ACDAD5B0",
      "ACDAD5B8",
      "ACDAD5C0",
      "ACDAD5C8",
      "ACDAD5E8",
      "ACDAD5F0",
      "ACDAD5F8",
      "ACDAD600",
      "ACDAD608",
      "ACDAD610",
      "ACDAD618",
      "ACDAD620",
      "ACDAD628",
      "ACDAD630",
      "ACDAD638",
      "ACDAD640",
      "ACDAD648",
      "ACDAD650",
      "ACDAD658",
      "ACDAD660",
      "ACDAD668",
      "ACDAD670",
      "ACDAD678",
      "ACDAD680",]
    const generated = range(0, 40).map(i => getInventoryAddres(0, i))
    expect(generated).toStrictEqual(result)
  })
})