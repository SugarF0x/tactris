import { CompletionLine } from "~/modules/grid"
import { getInstructionsMap, getSortedLines } from "~/modules/grid/store/helpers"
import { Axis } from "~/utils"
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('getSortedLines', () => {
  mockGridConfig()

  it.each<[CompletionLine[], CompletionLine[]]>([
    [
      [{ axis: Axis.Y, value: 3 }, { axis: Axis.X, value: 4 }, { axis: Axis.X, value: 5 }, { axis: Axis.Y, value: 6 }],
      [{ axis: Axis.Y, value: 6 }, { axis: Axis.X, value: 5 }, { axis: Axis.Y, value: 3 }, { axis: Axis.X, value: 4 }]
    ],
    [
      [{ axis: Axis.X, value: 4 }, { axis: Axis.X, value: 3 }, { axis: Axis.X, value: 1 }, { axis: Axis.X, value: 2 }],
      [{ axis: Axis.X, value: 1 }, { axis: Axis.X, value: 2 }, { axis: Axis.X, value: 3 }, { axis: Axis.X, value: 4 }]
    ],
    [
      [{ axis: Axis.X, value: 8 }, { axis: Axis.X, value: 9 }, { axis: Axis.X, value: 5 }, { axis: Axis.X, value: 6 }],
      [{ axis: Axis.X, value: 9 }, { axis: Axis.X, value: 8 }, { axis: Axis.X, value: 6 }, { axis: Axis.X, value: 5 }]
    ],
  ])('should sort lines inwards according to given instructions', (lines, output) => {
    const instructions = getInstructionsMap(lines)
    expect(getSortedLines(lines, instructions)).toMatchObject(output)
  })
})
