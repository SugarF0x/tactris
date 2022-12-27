import { getScoreStoreMock } from "~/modules/score/store/__mocks__"
import { setScore } from "~/modules/score/store/mutations"

describe('setScore', () => {
  it.each<number>([8, 800, 555, 353, 5])('should set score to given value %#', (score) => {
    const { draft } = getScoreStoreMock()
    expect(draft.score).toEqual(0)

    setScore(draft, score)
    expect(draft.score).toEqual(score)
  })
})
