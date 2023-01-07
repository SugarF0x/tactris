import { doesInputMatchTetra, TetraType } from "~/modules/tetra"
import { Position } from "~/utils"

describe('doesInputMatchTetra', () => {
  it('should return true on proper tetra match', () => {
    const input: Position[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]

    expect(doesInputMatchTetra(input, { type: TetraType.O, rotation: 0 })).toBeTruthy()
  })

  it('should return false on tetra mismatch', () => {
    const input: Position[] = [
      { x: 1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]

    expect(doesInputMatchTetra(input, { type: TetraType.O, rotation: 0 })).not.toBeTruthy()
  })
})
