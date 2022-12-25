import { Axis, PositionId, positionToId } from "~/modules/position"
import { CompletionLine, GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"
import { getFilledLines } from '../getFilledLines'
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('getFilledLines', () => {
  mockGridConfig()

  it.each<[PositionId[], CompletionLine[], CompletionLine[]]>([
    [[], [{ axis: Axis.X, value: 0 }], []],
    [['0/0'], [{ axis: Axis.X, value: 0 }, { axis: Axis.Y, value: 0 }], []],
    [
      Array.from({ length: GRID_HEIGHT }, (_, y) => positionToId({ x: 0, y })),
      [{ axis: Axis.X, value: 0 }, { axis: Axis.Y, value: 0 }],
      [{ axis: Axis.X, value: 0 }]
    ],
    [
      Array.from({ length: GRID_WIDTH }, (_, x) => positionToId({ x, y: 0 })),
      [{ axis: Axis.X, value: 0 }, { axis: Axis.Y, value: 0 }],
      [{ axis: Axis.Y, value: 0 }]
    ],
  ])('return given lines that have all their ids filled in given position IDs %#', (ids, lines, output) => {
    const result = getFilledLines(ids, lines)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })
})
