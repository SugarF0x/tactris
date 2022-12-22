import { filterInstructedRelativeIds } from '~/modules/grid/store/helpers'
import { Axis, PositionId } from "~/modules/position"
import { CompletionLine, ShiftInstructions } from "~/modules/grid"

describe('filterInstructedRelativeIds', () => {
  it.each<[PositionId[], CompletionLine]>([
    [[], { axis: Axis.X, value: 0 }],
    [['1/1'], { axis: Axis.X, value: 2 }],
    [['1/1', '2/2'], { axis: Axis.Y, value: 4 }],
    [['1/1', '2/2', '4/4'], { axis: Axis.Y, value: 8 }],
  ])('should return empty array on RETAIN instructions %#', (input, line) => {
    expect(filterInstructedRelativeIds(input, line, ShiftInstructions.RETAIN)).toMatchObject([])
  })

  it.each<[PositionId[], CompletionLine, ShiftInstructions, PositionId[]]>([
    [['1/1', '1/0', '0/2'], { axis: Axis.X, value: 1 }, ShiftInstructions.DECREASE, []],
    [['1/1', '1/0', '2/2'], { axis: Axis.X, value: 1 }, ShiftInstructions.DECREASE, ['2/2']],
    [['0/1', '1/1', '1/0', '2/2', '5/7'], { axis: Axis.X, value: 1 }, ShiftInstructions.DECREASE, ['2/2', '5/7']],
    [['0/1', '1/1', '1/0', '2/2', '3/5', '5/6'], { axis: Axis.X, value: 3 }, ShiftInstructions.INCREASE, ['0/1', '1/1', '1/0', '2/2']],
  ])('should not return ids on the given line value %#', (input, line, instructions, output) => {
    const result = filterInstructedRelativeIds(input, line, instructions)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })

  it.each<[PositionId[], CompletionLine, ShiftInstructions, PositionId[]]>([
    [['1/1'], { axis: Axis.X, value: 0 }, ShiftInstructions.INCREASE, []],
    [['1/1'], { axis: Axis.X, value: 0 }, ShiftInstructions.DECREASE, ['1/1']],
    [['0/0', '0/1', '2/1'], { axis: Axis.X, value: 1 }, ShiftInstructions.INCREASE, ['0/0', '0/1']],
    [['2/1', '1/2', '3/0', '5/5'], { axis: Axis.X, value: 3 }, ShiftInstructions.INCREASE, ['2/1', '1/2']],
    [['2/1', '1/2', '3/0', '5/5'], { axis: Axis.X, value: 3 }, ShiftInstructions.DECREASE, ['5/5']],
    [['5/5', '4/4', '6/6', '6/7', '9/9', '0/6'], { axis: Axis.Y, value: 7 }, ShiftInstructions.INCREASE, ['5/5', '4/4', '6/6', '0/6']],
    [['8/4', '5/5', '4/4', '6/6', '6/7', '9/9', '0/6'], { axis: Axis.Y, value: 5 }, ShiftInstructions.DECREASE, ['6/6', '6/7', '9/9', '0/6']],
  ])('should filter outs ids according to given instructions %#', (input, line, instructions, output) => {
    expect(filterInstructedRelativeIds(input, line, instructions)).toEqual(expect.arrayContaining(output))
  })
})
