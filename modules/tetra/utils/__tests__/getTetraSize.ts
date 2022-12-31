import { Position } from "~/utils"
import { getTetraSize } from "~/modules/tetra/utils/getTetraSize"
import { getSpecificTetra, TetraType } from "~/modules/tetra"

describe('getTetraSize', () => {
  it.each<[TetraType, Position]>([
    [TetraType.L, { x: 1, y: 2 }],
    [TetraType.T, { x: 2, y: 1 }],
    [TetraType.O, { x: 1, y: 1 }],
    [TetraType.I, { x: 0, y: 3 }],
  ])('should calculate given tetra size %#', (input, output) => {
    expect(getTetraSize(getSpecificTetra(input).positions)).toEqual(output)
  })
})
