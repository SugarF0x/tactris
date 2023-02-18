import { getScoreStoreMock } from "~/modules/score/store/__mocks__"
import { setHighScore } from "~/modules/score/store/mutations"

describe('setHighScore', () => {
  it.each<number>([1, 5, 10, 0, 17, 25, 999999])('should set state high score to given value %#', (score) => {
    const { draft } = getScoreStoreMock()
    expect(draft.highScore).toEqual(0)

    setHighScore(draft, score)
    expect(draft.highScore).toEqual(score)
  })
})
