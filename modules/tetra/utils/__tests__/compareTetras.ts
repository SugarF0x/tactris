import { doesInputMatchTetra, getSpecificTetra, TetraObject, TetraType } from "~/modules/tetra"
import { Position } from "~/modules/position"

describe('doesInputMatchTetra', () => {
  it('should return true on proper tetra match', () => {
    const input: Position[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]

    const tetra: TetraObject = getSpecificTetra(TetraType.O)

    expect(doesInputMatchTetra(input, tetra)).toBeTruthy()
  })

  it('should return false on tetra mismatch', () => {
    const input: Position[] = [
      { x: 1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ]

    const tetra: TetraObject = getSpecificTetra(TetraType.O)

    expect(doesInputMatchTetra(input, tetra)).not.toBeTruthy()
  })
})
