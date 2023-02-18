import { setScore } from "~/modules/score/store/mutations"
import { mockRootStore } from "~/services/store/__mocks__"

describe('setScore', () => {
  it.each<number>([8, 800, 555, 353, 5])('should set score to given value %#', (score) => {
    const { draft } = mockRootStore()
    expect(draft.score).toEqual(0)

    setScore(draft, score)
    expect(draft.score).toEqual(score)
  })
})
