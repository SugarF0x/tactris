import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score/store/types"
import { CompletionLine } from "~/modules/grid"

export function updateScore(state: WritableDraft<ScoreStore>, lines: CompletionLine[]): void {
  const value = state.score + lines.reduce((acc, _, index) => acc + 10 * (.8 + index + .2), 0)

  state.score = value
  state.highScore = Math.max(state.highScore, value)
}
