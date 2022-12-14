import { Position, positionToId } from "~/utils"
import { getRandomTetra, convertTetraToPositions, TetraObject, TetrasDictionary, TetraType, TetraRotation, getRandomTetraRotation } from "~/modules/tetra"

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

describe('getRandomTetraRotation', () => {
  it.each<[number, TetraRotation]>([
    [0, 0],
    [.25, 1],
    [.5, 2],
    [.75, 3],
  ])('should return random rotations %#', (randomValue, result) => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(randomValue)
    expect(getRandomTetraRotation()).toEqual(result)
  })

  it.each<[TetraRotation[]]>([
    [[]],
    [[0]],
    [[0, 1]],
    [[0, 1, 2]],
    [[0, 1, 2, 3]],
    [[0, 1, 3]],
    [[1, 3]],
    [[0, 2]],
    [[0, 3]],
    [[1, 2]],
    [[2]],
  ])('should properly exclude given array from possible results %#', (exclusions) => {
    for (let i = 0; i < 4; i++) {
      jest.spyOn(Math, 'random').mockReturnValueOnce(.25 * i)
      expect(exclusions.includes(getRandomTetraRotation(exclusions))).toBeFalsy()
    }
  })
})

describe('getRandomTetra', () => {
  const tetraTypes = Object.keys(TetrasDictionary)
  const tetraCount = tetraTypes.length
  const typeToIndexTuple = Object.entries(tetraTypes).map((t): [TetraType, number] => [t[1] as TetraType, Number(t[0])])

  it.each(typeToIndexTuple)('should return random tetra (%s) at random rotation', (type, index) => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(index / tetraCount)

    const tetra = getRandomTetra()

    expect(tetra.type).toBe(type)
  })

  it.each<[TetraObject[]]>([
    [[{ type: TetraType.L, rotation: 0 }]],
    [[{ type: TetraType.O, rotation: 0 }, { type: TetraType.I, rotation: 0 }]],
    [[{ type: TetraType.Z, rotation: 0 }, { type: TetraType.T, rotation: 0 }, { type: TetraType.P, rotation: 0 }, { type: TetraType.S, rotation: 0 }]],
  ])('should on same random tetra type return different rotation %#', (exclusions) => {
    const excludedTypeWithIndexTuple = exclusions.map<[TetraType, number]>(exclusion => [exclusion.type, tetraTypes.indexOf(exclusion.type)])

    excludedTypeWithIndexTuple.forEach(([type, typeIndex], index) => {
      jest.spyOn(Math, 'random')
        // mock tetra
        .mockReturnValueOnce(typeIndex / tetraCount)
        // mock rotation
        .mockReturnValueOnce(0)

      const result = getRandomTetra(exclusions)

      expect(result.type).toEqual(type)
      expect(result.rotation).not.toEqual(exclusions[index].rotation)
    })
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
