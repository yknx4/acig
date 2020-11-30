import { range } from "lodash"
import { getInventoryAddres } from "./formatCheat"

describe('getInventoryAddres', () => {
  it('should generate valid addresses for all 40 slots', () => {
    const result = ["AD3C7FD8",
      "AD3C7FE0",
      "AD3C7FE8",
      "AD3C7FF0",
      "AD3C7FF8",
      "AD3C8000",
      "AD3C8008",
      "AD3C8010",
      "AD3C8018",
      "AD3C8020",
      "AD3C8028",
      "AD3C8030",
      "AD3C8038",
      "AD3C8040",
      "AD3C8048",
      "AD3C8050",
      "AD3C8058",
      "AD3C8060",
      "AD3C8068",
      "AD3C8070",
      "AD3C7F20",
      "AD3C7F28",
      "AD3C7F30",
      "AD3C7F38",
      "AD3C7F40",
      "AD3C7F48",
      "AD3C7F50",
      "AD3C7F58",
      "AD3C7F60",
      "AD3C7F68",
      "AD3C7F70",
      "AD3C7F78",
      "AD3C7F80",
      "AD3C7F88",
      "AD3C7F90",
      "AD3C7F98",
      "AD3C7FA0",
      "AD3C7FA8",
      "AD3C7FB0",
      "AD3C7FB8",]
    const generated = range(0, 40).map(i => getInventoryAddres(0, i))
    expect(generated).toStrictEqual(result)
  })
})