import { WritableDraft } from "immer/dist/types/types-external"
import { ScoreStore } from "~/modules/score/store/types"
import { CompletionLine } from "~/modules/grid"
import { setHighScore, setScore } from "~/modules/score/store/mutations"
import { completionsToScore } from "~/modules/score/store/helpers"

export function updateScore(state: WritableDraft<ScoreStore>, lines: CompletionLine[]): void {
  const value = state.score + completionsToScore(lines)

  setScore(state, value)
  setHighScore(state, Math.max(state.highScore, value))
}
