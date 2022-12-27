import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score/store/types"
import { CompletionLine } from "~/modules/grid"
import { setHighScore, setScore } from "~/modules/score/store/mutations"

export function updateScore(state: WritableDraft<ScoreStore>, lines: CompletionLine[]): void {
  const value = state.score + lines.reduce((acc, _, index) => acc + 10 * (.8 + index + .2), 0)

  setScore(state, value)
  setHighScore(state, Math.max(state.highScore, value))
}
