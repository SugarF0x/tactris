import { ShiftInstructions } from "~/modules/grid/types"
import { Axis, PositionId } from "~/utils"
import { shiftCells } from '../shiftCells'

describe('shiftCells', () => {
  it.each<[PositionId[], Axis]>([
    [['1/1'], Axis.X],
    [['2/1', '3/5'], Axis.Y],
    [['1/2', '3/3', '7/8'], Axis.X],
    [['2/2', '9/9', '1/9', '5/2', '7/6'], Axis.Y],
  ])('should return same unmodified array on RETAIN instructions %#', (input, axis) => {
    expect(shiftCells(input, axis, ShiftInstructions.RETAIN)).toBe(input)
  })

  it.each<[PositionId[], Axis, ShiftInstructions, PositionId[]]>([
    [[], Axis.X, ShiftInstructions.INCREASE, []],
    [['0/0'], Axis.X, ShiftInstructions.DECREASE, ['-1/0']],
    [['0/0'], Axis.Y, ShiftInstructions.DECREASE, ['0/-1']],
    [['5/3'], Axis.X, ShiftInstructions.INCREASE, ['6/3']],
    [['5/3'], Axis.Y, ShiftInstructions.INCREASE, ['5/4']],
    [['1/1', '2/2', '3/3'], Axis.X, ShiftInstructions.INCREASE, ['2/1', '3/2', '4/3']],
    [['1/1', '2/2', '3/3'], Axis.Y, ShiftInstructions.DECREASE, ['1/0', '2/1', '3/2']],
  ])('should return a new array of given items shifted according to instructions %#', (input, axis, instructions, output) => {
    const result = shiftCells(input, axis, instructions)

    expect(result).toEqual(expect.arrayContaining(output))
    expect(output).toEqual(expect.arrayContaining(result))
  })
})
