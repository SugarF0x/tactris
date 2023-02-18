import { mockSetHighScore, mockSetScore } from "~/modules/score/store/mutations/__mocks__"
import { getScoreStoreMock } from "~/modules/score/store/__mocks__"
import { restart } from "~/modules/score/store/functions"

describe('restart', () => {
  it('should call setScore with value of 0', () => {
    const { draft } = getScoreStoreMock()
    const setScoreMock = mockSetScore()
    restart(draft)
    expect(setScoreMock).toHaveBeenCalledWith(draft, 0)
  })

  it('should not affect high score', () => {
    const { draft } = getScoreStoreMock()
    const setHighScoreMock = mockSetHighScore()
    restart(draft)
    expect(setHighScoreMock).not.toHaveBeenCalled()
  })
})
