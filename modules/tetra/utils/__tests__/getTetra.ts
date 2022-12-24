import { Position } from "~/modules/position"
import { getRandomTetra, getSpecificTetra, TetraObject, TetrasDictionary, TetraType } from "~/modules/tetra"

describe('getSpecificTetra', () => {
  it.each<[TetraType, TetraObject]>([
    [TetraType.O, { type: TetraType.O, positions: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }],
    [TetraType.I, { type: TetraType.I, positions: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] }],
    [TetraType.L, { type: TetraType.L, positions: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] }],
  ])('should return specific tetra for type %s', (input, output) => {
    const result = getSpecificTetra(input)

    expect(result.type).toEqual(output.type)
    expect(result.positions).toEqual(expect.arrayContaining(output.positions))
  })

  it.each<[TetraType, number, TetraObject]>([
    [TetraType.T, 1, { type: TetraType.T, positions: [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }] }],
    [TetraType.I, 1, { type: TetraType.I, positions: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }] }],
    [TetraType.T, 2, { type: TetraType.T, positions: [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }] }],
    [TetraType.L, 3, { type: TetraType.L, positions: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 0 }] }],
  ])('should return specific tetras with proper rotation %#', (input, rotations, output) => {
    const result = getSpecificTetra(input, rotations)

    expect(result.type).toEqual(output.type)
    expect(result.positions).toEqual(expect.arrayContaining(output.positions))
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
      expect(result.positions).toEqual(expect.arrayContaining(expectedResults[i]))
    }
  })
})
