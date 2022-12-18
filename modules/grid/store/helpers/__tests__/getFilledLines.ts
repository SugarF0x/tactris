import { Axis, PositionId, positionToId } from "~/modules/position"
import { CompletionLine, GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid"
import { getFilledLines } from '../getFilledLines'

describe('getFilledLines', () => {
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
    expect(getFilledLines(ids, lines)).toEqual(expect.arrayContaining(output))
  })
})
