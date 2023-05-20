import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { ScoreStore } from "~/modules/score/store/types"
import { restart, updateScore, undo } from "~/modules/score/store/functions"
import { temporal } from "zundo"
import { persist } from "zustand/middleware"
import { scorePersistOptions, scoreTemporalOptions } from "./options"

export const useScoreStore = create<ScoreStore>()(persist(temporal(immer((set) => ({
  score: 0,
  highScore: 0,
  updateScore: (lines) => set(state => updateScore(state, lines)),
  restart: () => set(restart),
  undoCount: 0,
  undo: (previousScore, shouldApplyPreviousScore) => set(state => undo(state, previousScore, shouldApplyPreviousScore))
})), scoreTemporalOptions), scorePersistOptions))

export const initialScoreStore = useScoreStore.getState()
export const useTemporalScoreStore = create(useScoreStore.temporal)
