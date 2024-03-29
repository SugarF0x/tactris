import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score"
import { setScore, setUndo } from "~/modules/score/store/mutations"

export function restart(state: WritableDraft<ScoreStore>): void {
  setScore(state, 0)
  setUndo(state, 0)
}
