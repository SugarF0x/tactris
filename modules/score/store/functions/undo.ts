import { WritableDraft } from "immer/dist/types/types-external"
import { getUndoCost } from "~/modules/score/store/selectors"
import { ScoreStore } from "~/modules/score/store/types"
import { setUndo, setScore } from "~/modules/score/store/mutations"

export function undo(state: WritableDraft<ScoreStore>, previousScore: number, shouldApplyPreviousScore: boolean): void {
  const baseScore = shouldApplyPreviousScore ? previousScore : state.score
  const newScore = baseScore - getUndoCost(state)

  setUndo(state, state.undoCount + 1)
  setScore(state, newScore)
}
