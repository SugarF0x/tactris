import { CompletionLine } from "~/modules/grid"

export interface ScoreStore {
  score: number
  highScore: number
  updateScore: (lines: CompletionLine[]) => void
  restart: () => void
}
