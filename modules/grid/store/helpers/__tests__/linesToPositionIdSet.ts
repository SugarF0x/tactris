import { linesToPositionIdSet } from '../linesToPositionIdSet'
import { CompletionLine, GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"
import { Axis, PositionId, positionToId } from "~/modules/position"

describe('linesToPositionIdSet', () => {
  it.each<[CompletionLine[], PositionId[]]>([
    [[], []],
    [
      [{ axis: Axis.X, value: 0 }],
      Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 0, y }))
    ],
    [
      [{ axis: Axis.X, value: 1 }, { axis: Axis.X, value: 2 }],
      [
        ...Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 1, y })),
        ...Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 2, y })),
      ]
    ],
    [
      [{ axis: Axis.X, value: 3 }, { axis: Axis.Y, value: 3 }],
      [
        ...Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 3, y })),
        ...Array.from({ length: GRID_WIDTH }, (_, x) => x === 3 ? null : positionToId({ x, y: 3 })).filter((e): e is PositionId => Boolean(e))
      ]
    ]
  ])("should return all completion lines' position IDs %#", (input, output) => {
    const result = linesToPositionIdSet(input)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })
})
