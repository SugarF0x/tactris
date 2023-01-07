import { Position } from "~/utils"
import { getTetraSize } from "~/modules/tetra/utils/getTetraSize"
import { convertTetraToPositions, TetraType } from "~/modules/tetra"

describe('getTetraSize', () => {
  it.each<[TetraType, Position]>([
    [TetraType.L, { x: 1, y: 2 }],
    [TetraType.T, { x: 2, y: 1 }],
    [TetraType.O, { x: 1, y: 1 }],
    [TetraType.I, { x: 0, y: 3 }],
  ])('should calculate given tetra size %#', (type, output) => {
    expect(getTetraSize(convertTetraToPositions({ type, rotation: 0 }))).toEqual(output)
  })
})
