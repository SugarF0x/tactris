import { getGridStoreInitialStateMock } from "~/modules/grid/store/__mocks__"
import { addSelectedId } from "~/modules/grid/store/mutations"
import { PositionId } from "~/modules/position"

describe('addSelectedId', () => {
  it('should push given ID to the selection array', () => {
    const { draft } = getGridStoreInitialStateMock()
    expect(draft.selectedIds).toHaveLength(0)

    const id: PositionId = '1/1'
    addSelectedId(draft, id)

    expect(draft.selectedIds).toHaveLength(1)
    expect(draft.selectedIds[draft.selectedIds.length - 1]).toEqual(id)
  })
})
