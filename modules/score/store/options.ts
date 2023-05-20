import { PersistOptions } from "zustand/middleware/persist"
import { ScoreStore } from "~/modules/score"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ZundoOptions } from "zundo"
import { isEqual } from "lodash"
import { persist } from "zustand/middleware"

export const scorePersistOptions: PersistOptions<ScoreStore> = {
  name: 'score-storage',
  getStorage: () => AsyncStorage
}

export const scoreTemporalOptions: ZundoOptions<ScoreStore, Pick<ScoreStore, 'score' | 'highScore'>> = {
  limit: 1,
  partialize: (state) => {
    const { score, highScore } = state
    return { score, highScore }
  },
  equality: isEqual,
  wrapTemporal: setup => persist(setup, {
    name: 'score-storage-temporal',
    getStorage: () => AsyncStorage
  })
}
