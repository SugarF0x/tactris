import { Position } from "~/modules/position"
import { floorTetra } from '../floorTetra'

describe('floorTetra', () => {
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

  it.todo('should floor to appropriate given side at min grid size square for given tetra')
  it.todo('should floor to appropriate given side with predefined tetra size')
})
