import { CompletionLine, ShiftInstructions } from "~/modules/grid"
import { getInstructionsMap } from "~/modules/grid/store/helpers"
import { Axis } from "~/modules/position"

describe('getInstructionsMap', () => {
  it('should return a weak map of instructions per each given completion line', () => {
    const input: CompletionLine = { axis: Axis.X, value: 3 }
    const output = new WeakMap<CompletionLine, ShiftInstructions>([[input, ShiftInstructions.INCREASE]])

    expect(getInstructionsMap([input])).toMatchObject(output)
  })
})
