import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score/store/types"

export function setHighScore(state: WritableDraft<ScoreStore>, value: number): void {
  state.highScore = value
}
