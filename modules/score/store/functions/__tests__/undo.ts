import { mockSetUndo, mockSetScore } from "~/modules/score/store/mutations/__mocks__"
import { getScoreStoreMock, getUndoCostMock } from "~/modules/score/store/__mocks__"
import { undo } from "~/modules/score/store/functions"

describe('undo', () => {
  it('should increase total undo count', () => {
    const { draft } = getScoreStoreMock()
    const setUndoMock = mockSetUndo()
    undo(draft, 0, false)
    expect(setUndoMock).toHaveBeenCalledWith(draft, 1)
  })

  describe('score change', () => {
    const score = 1000
    const previousScore = 950
    const undoCost = 50

    getUndoCostMock(undoCost)
    const setScoreMock = mockSetScore()

    describe('(true)', () => {
      it('should set post undo score to the one before increase minus the cost', () => {
        const { draft } = getScoreStoreMock({ score })

        undo(draft, previousScore, true)
        expect(setScoreMock).toHaveBeenCalledWith(draft, previousScore - undoCost)
      })
    })

    describe('(false)', () => {
      it('should set post undo score to current one minus the cost', () => {
        const { draft } = getScoreStoreMock({ score })

        undo(draft, previousScore, false)
        expect(setScoreMock).toHaveBeenCalledWith(draft, score - undoCost)
      })
    })
  })
})
