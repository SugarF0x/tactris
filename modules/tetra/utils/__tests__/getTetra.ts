import { Position, positionToId } from "~/utils"
import { getRandomTetra, convertTetraToPositions, TetraObject, TetraType, allPossibleTetras } from "~/modules/tetra"

describe('convertTetraToPositions', () => {
  it.each<[TetraType, Position[]]>([
    [TetraType.O, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]],
    [TetraType.I, [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]],
    [TetraType.L, [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }]],
  ])('should return specific tetra for type %s', (type, output) => {
    const result = convertTetraToPositions({ type, rotation: 0 })

    expect(result.map(positionToId).sort()).toEqual(output.map(positionToId).sort())
  })

  it.each<[TetraObject, Position[]]>([
    [{ type: TetraType.T, rotation: 1 }, [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]],
    [{ type: TetraType.I, rotation: 1 }, [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]],
    [{ type: TetraType.T, rotation: 2 }, [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }]],
    [{ type: TetraType.L, rotation: 3 }, [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }]],
  ])('should return specific tetras with proper rotation %#', (input, output) => {
    const result = convertTetraToPositions(input)

    expect(result.map(positionToId).sort()).toEqual(output.map(positionToId).sort())
  })
})

describe('getRandomTetra', () => {
  it('should return all possible tetra objects and throw on stack exhaustion', () => {
    const outputStack: TetraObject[] = []

    for (let i = 0; i < allPossibleTetras.length; i++) {
      outputStack.push(getRandomTetra(outputStack))
    }

    expect(outputStack).toEqual(expect.arrayContaining(allPossibleTetras))
    expect(allPossibleTetras).toEqual(expect.arrayContaining(outputStack))

    expect(() => { getRandomTetra(outputStack) }).toThrow()
  })
})
