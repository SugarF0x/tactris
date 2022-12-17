import { getSpecificTetra, TetraObject, TetraType } from "~/modules/tetra"

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
  it.todo('should return random tetra')
  it.todo('should return random tetra expect for given types')
})
