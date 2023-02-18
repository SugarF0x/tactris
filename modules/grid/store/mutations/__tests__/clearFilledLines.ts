import { CompletionLine } from "~/modules/grid"
import { mockRootStore } from "~/services/store/__mocks__"
import { Axis, PositionId } from "~/utils"
import { clearFilledLines } from "~/modules/grid/store/mutations"
import { mockGridConfig } from "~/modules/grid/__mocks__"

describe('clearFilledLines', () => {
  mockGridConfig()

  it.each<[PositionId[], CompletionLine[], PositionId[]]>([
    [
      ['1/2'],
      [{ axis: Axis.X, value: 1 }],
      []
    ],
    [
      ['2/2', '1/1', '0/0'],
      [{ axis: Axis.Y, value: 1 }],
      ['2/2', '0/0']
    ],
    [
      ['2/2', '1/1', '0/0', '3/5', '5/3'],
      [{ axis: Axis.Y, value: 1 }, { axis: Axis.X, value: 3 }],
      ['2/2', '0/0', '5/3']
    ],
    [
      ['2/2', '1/1', '0/0', '3/5', '5/3', '7/7'],
      [{ axis: Axis.Y, value: 1 }, { axis: Axis.X, value: 3 }, { axis: Axis.Y, value: 3 }],
      ['2/2', '0/0', '7/7']
    ],
  ])('should clear IDs for given lines', (filledIds, lines, expected) => {
    const { draft } = mockRootStore({ filledIds })

    clearFilledLines(draft, lines)

    expect(draft.filledIds.sort()).toMatchObject(expected.sort())
  })
})
