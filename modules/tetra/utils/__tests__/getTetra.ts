import { Position, positionToId } from "~/utils"
import { getRandomTetra, convertTetraToPositions, TetraObject, TetrasDictionary, TetraType } from "~/modules/tetra"

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
  const tetraTypes = Object.keys(TetrasDictionary)
  const tetraCount = tetraTypes.length
  const typeToIndexTuple = Object.entries(tetraTypes).map((t): [TetraType, number] => [t[1] as TetraType, Number(t[0])])

  it.each(typeToIndexTuple)('should return random tetra (%s)', (type, index) => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(index / tetraCount)

    const tetra = getRandomTetra()

    expect(tetra.type).toBe(type)
  })

  it.each<TetraType[][]>([
    [[TetraType.L]],
    [[TetraType.O, TetraType.I]],
    [[TetraType.Z, TetraType.T, TetraType.P, TetraType.S]],
  ])('should return random tetra expect for given types (%p)', (exclude) => {
    const excludedTypeWithIndexTuple = exclude.map<[TetraType, number]>(excludedType => [excludedType, tetraTypes.indexOf(excludedType)])

    for (const [type, index] of excludedTypeWithIndexTuple) {
      jest.spyOn(Math, 'random').mockReturnValueOnce(index / tetraCount)

      expect(getRandomTetra(exclude).type).not.toEqual(type)
    }
  })

  it('should return all tetra rotations', () => {
    const desiredTetraType = TetraType.T
    const desiredTetraRandomValue = tetraTypes.indexOf(desiredTetraType)

    const expectedResults: Array<Position[]> = [
      [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
      [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
      [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
      [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }]
    ]

    for (let i = 0; i < 4; i++) {
      jest.spyOn(Math, 'random')
        // mock tetra
        .mockReturnValueOnce(desiredTetraRandomValue / tetraCount)
        // mock rotation
        .mockReturnValueOnce(.25 * i)

      const result = getRandomTetra()

      expect(result.type).toEqual(desiredTetraType)
      expect(result.rotation).toEqual(i)
      expect(convertTetraToPositions(result).map(positionToId).sort()).toEqual(expectedResults[i].map(positionToId).sort())
    }
  })
})
