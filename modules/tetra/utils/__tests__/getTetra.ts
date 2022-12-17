import { getSpecificTetra, TetraObject, TetraType, TetrasDictionary, getRandomTetra } from "~/modules/tetra"

describe('getSpecificTetra', () => {
  it.each<[TetraType, TetraObject]>([
    [TetraType.O, { type: TetraType.O, positions: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] }],
    [TetraType.I, { type: TetraType.I, positions: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }] }],
    [TetraType.L, { type: TetraType.L, positions: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] }],
  ])('should return specific tetra for type %s', (input, output) => {
    expect(getSpecificTetra(input)).toMatchObject(output)
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

  it.todo('should return random tetra expect for given types')
})
