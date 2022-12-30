import { getSize, Position } from "~/modules/position"
import { FloorCorner, floorTetra } from '../floorTetra'
import { getSpecificTetra, TetraType } from "~/modules/tetra"
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('floorTetra', () => {
  mockGridConfig()

  it.each<[Position[], Position[]]>([
    [
      [{ x: 1, y: 1 }],
      [{ x: 0, y: 0 }]
    ],
    [
      [{ x: 1, y: 0 }],
      [{ x: 0, y: 0 }]
    ],
    [
      [{ x: 0, y: 1 }],
      [{ x: 0, y: 0 }]
    ],
    [
      [{ x: 10, y: 15 }],
      [{ x: 0, y: 5 }]
    ],
    [
      [
        { x: 4, y: 7 },
        { x: 5, y: 5 },
        { x: 8, y: 3 },
        { x: 7, y: 8 }
      ],
      [
        { x: 0, y: 4 },
        { x: 1, y: 2 },
        { x: 4, y: 0 },
        { x: 3, y: 5 }
      ]
    ]
  ])('should reduce all positions in array to their lowest possible position %#', (input, output) => {
    const result = floorTetra(input)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })

  describe('directional floor', () => {
    const tetra = getSpecificTetra(TetraType.L, 2).positions

    it.each<[FloorCorner]>([
      [FloorCorner.TOP_LEFT],
      [FloorCorner.TOP_RIGHT],
      [FloorCorner.BOTTOM_LEFT],
      [FloorCorner.BOTTOM_RIGHT],
    ])('should not shift tetra given no specific size override %#', (side) => {
      expect(floorTetra(tetra, side).sort()).toEqual(tetra.sort())
    })

    it.each<[FloorCorner]>([
      [FloorCorner.TOP_LEFT],
      [FloorCorner.TOP_RIGHT],
      [FloorCorner.BOTTOM_LEFT],
      [FloorCorner.BOTTOM_RIGHT],
    ])('should not move tetra given impossible size options %#', (side) => {
      expect(floorTetra(tetra, side, getSize(0)).sort()).toEqual(tetra.sort())
      expect(floorTetra(tetra, side, getSize(1)).sort()).toEqual(tetra.sort())
    })

    it.each<[FloorCorner, Position, Position[]]>([
      [FloorCorner.TOP_LEFT, getSize(2), tetra],
      [FloorCorner.TOP_RIGHT, getSize(4), [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 1 }, { x: 4, y: 2 }]],
      [FloorCorner.BOTTOM_LEFT, getSize(7), [{ x: 0, y: 5 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }]],
      [FloorCorner.BOTTOM_RIGHT, getSize(9), [{ x: 8, y: 7 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 }]],
    ])('should floor to appropriate given side with predefined tetra size %#', (side, size, output) => {
      expect(floorTetra(tetra, side, size).sort()).toEqual(output.sort())
    })
  })
})
