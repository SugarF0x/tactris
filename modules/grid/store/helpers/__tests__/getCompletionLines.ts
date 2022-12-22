import { Axis, PositionId } from "~/modules/position"
import { CompletionLine } from "~/modules/grid"
import { getCompletionLines } from '../getCompletionLines'

describe('getCompletionLines', () => {
  it.each<[PositionId[], CompletionLine[]]>([
    [['0/0'], [{ axis: Axis.Y, value: 0 }, { axis: Axis.X, value: 0 }]],
    [['1/2'], [{ axis: Axis.Y, value: 2 }, { axis: Axis.X, value: 1 }]],
    [['3/3', '4/4'], [{ axis: Axis.Y, value: 3 }, { axis: Axis.Y, value: 4 }, { axis: Axis.X, value: 3 }, { axis: Axis.X, value: 4 }]],
    [['5/6', '5/7', '3/6'], [{ axis: Axis.Y, value: 6 }, { axis: Axis.Y, value: 7 }, { axis: Axis.X, value: 5 }, { axis: Axis.X, value: 3 }]]
  ])('should return completion lines for given position IDs %#', (input, output) => {
    const result = getCompletionLines(input)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })
})
