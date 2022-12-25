import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { Axis, PositionId } from "~/modules/position"
import { applyShiftInstructions } from "~/modules/grid/store/mutations"
import { CompletionLine } from "~/modules/grid"
import { getInstructionsMap, getSortedLines } from "~/modules/grid/store/helpers"
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('applyShiftInstructions', () => {
  mockGridConfig()

  it.each<[PositionId[], CompletionLine[], PositionId[]]>([
    [['1/2'], [{ axis: Axis.Y, value: 3 }], ['1/3']],
    [['1/2'], [{ axis: Axis.Y, value: 3 }, { axis: Axis.Y, value: 4 }], ['1/4']],
    [['1/2'], [{ axis: Axis.Y, value: 3 }, { axis: Axis.Y, value: 4 }, { axis: Axis.Y, value: 5 }], ['1/4']],
    [['1/2'], [{ axis: Axis.Y, value: 3 }, { axis: Axis.Y, value: 4 }, { axis: Axis.Y, value: 5 }, { axis: Axis.X, value: 3 }], ['2/4']],
    [
      ['0/2', '1/2', '2/2', '3/2', '0/7', '1/7', '2/7', '3/7'],
      [{ axis: Axis.Y, value: 3 }, { axis: Axis.Y, value: 4 }, { axis: Axis.Y, value: 5 }, { axis: Axis.Y, value: 6 }],
      ['0/4', '1/4', '2/4', '3/4', '0/5', '1/5', '2/5', '3/5']
    ],
    [
      ['2/0', '2/1', '2/2', '2/3', '7/0', '7/1', '7/2', '7/3'],
      [{ axis: Axis.X, value: 3 }, { axis: Axis.X, value: 4 }, { axis: Axis.X, value: 5 }, { axis: Axis.X, value: 6 }],
      ['4/0', '4/1', '4/2', '4/3', '5/0', '5/1', '5/2', '5/3']
    ],
  ])('should shift given IDs according to given instructions %#', (filledIds, lines, output) => {
    const { draft } = getGridStoreInitialStateMock({ filledIds })

    const instructions = getInstructionsMap(lines)
    const sortedLines = getSortedLines(lines, instructions)
    applyShiftInstructions(draft, sortedLines, instructions)

    expect(draft.filledIds.sort()).toMatchObject(output.sort())
  })
})
