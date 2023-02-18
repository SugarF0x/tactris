import { mockRootStore } from "~/services/store/__mocks__"
import { clearSelection } from "~/modules/grid/store/mutations"

describe('clearSelection', () => {
  it('should clear selection', () => {
    const { draft } = mockRootStore({ selectedIds: ['1/1', '2/2', '3/3', '4/4'] })
    expect(draft.selectedIds.length).toBeGreaterThan(0)

    clearSelection(draft)
    expect(draft.selectedIds).toHaveLength(0)
  })
})
