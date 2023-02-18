import { mockSetHighScore, mockSetScore } from "~/modules/score/store/mutations/__mocks__"
import { restart } from "~/modules/score/store/functions"
import { mockRootStore } from "~/services/store/__mocks__"

describe('restart', () => {
  it('should call setScore with value of 0', () => {
    const { draft } = mockRootStore()
    const setScoreMock = mockSetScore()
    restart(draft)
    expect(setScoreMock).toHaveBeenCalledWith(draft, 0)
  })

  it('should not affect high score', () => {
    const { draft } = mockRootStore()
    const setHighScoreMock = mockSetHighScore()
    restart(draft)
    expect(setHighScoreMock).not.toHaveBeenCalled()
  })
})
