import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score/store/types"

export function setUndo(state: WritableDraft<ScoreStore>, value: number): void {
  state.undoCount = value
}
