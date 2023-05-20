import { CompletionLine } from "~/modules/grid"

export interface ScoreStore {
  score: number
  highScore: number
  updateScore: (lines: CompletionLine[]) => void
  restart: () => void
  undoCount: number
  undo: (previousScore: number, shouldApplyPreviousScore: boolean) => void
}
