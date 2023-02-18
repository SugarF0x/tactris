import { PositionId } from "~/utils"
import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { commitSelection } from "~/modules/grid/store/mutations"

describe('commitSelection', () => {
  it('should add selection ids to filled ids', () => {
    const filledIds: PositionId[] = ['0/0', '1/1']
    const selectedIds: PositionId[] = ['2/2', '3/3', '4/4', '5/5']

    const { draft } = getGridStoreInitialStateMock({ filledIds, selectedIds })
    expect(draft.filledIds).not.toEqual(expect.arrayContaining(selectedIds))

    commitSelection(draft)
    expect(draft.filledIds).toEqual(expect.arrayContaining(selectedIds))
  })
})
