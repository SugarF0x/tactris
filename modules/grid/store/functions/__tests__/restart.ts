import { mockRootStore } from "~/services/store/__mocks__"
import { mockUpdateMatchedTetra, mockClearSelection, mockClearFilledLines } from "~/modules/grid/store/mutations/__mocks__"
import { restart } from "~/modules/grid/store/functions"

describe('restart', () => {
  it('should reset state to its initial value via mutations', () => {
    const { draft } = mockRootStore()

    const updateMatchedTetra = mockUpdateMatchedTetra()
    const clearSelection = mockClearSelection()
    const clearFilledLines = mockClearFilledLines()

    restart(draft)

    expect(updateMatchedTetra).toHaveBeenCalledWith(draft, 0)
    expect(updateMatchedTetra).toHaveBeenCalledWith(draft, 1)

    expect(clearSelection).toHaveBeenCalledWith(draft)

    expect(clearFilledLines).toHaveBeenCalled()
    expect(draft.filledIds).toHaveLength(0)
  })
})
