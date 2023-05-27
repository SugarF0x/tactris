import { getScoreStoreMock } from "~/modules/score/store/__mocks__"
import { setUndo } from "~/modules/score/store/mutations"

describe('setUndo', () => {
  it.each<number>([8, 800, 555, 353, 5])('should set undos count to: %#', (undoCount) => {
    const { draft } = getScoreStoreMock()
    expect(draft.undoCount).toEqual(0)

    setUndo(draft, undoCount)
    expect(draft.undoCount).toEqual(undoCount)
  })
})
