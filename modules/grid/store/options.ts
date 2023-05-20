import { PersistOptions } from "zustand/middleware/persist"
import { GridStore } from './types'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ZundoOptions } from "zundo"
import { isEqual } from "lodash"
import { persist } from "zustand/middleware"
import { getRandomTetra, TetraObject } from "~/modules/tetra"
import { getInitialTetras } from "~/modules/grid/store/helpers"

export const gridPersistOptions: PersistOptions<GridStore> = {
  name: 'grid-storage',
  getStorage: () => AsyncStorage,
  version: 2,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  migrate: (state: any, version) => {
    switch (version) {
      case 0: {
        state.tetras = { available: state.tetras, reserve: getRandomTetra(state.tetras.map((tetra: TetraObject) => tetra.type)) }
        break
      }
      case 1: {
        state.tetras = getInitialTetras()
        break
      }
    }

    return state
  }
}
export const gridTemporalOptions: ZundoOptions<GridStore, Pick<GridStore, 'filledIds' | 'tetras'>> = {
  limit: 1,
  partialize: (state) => {
    const { filledIds, tetras } = state
    return { filledIds, tetras }
  },
  equality: isEqual,
  wrapTemporal: setup => persist(setup, {
    name: 'grid-storage-temportal',
    getStorage: () => AsyncStorage
  })
}
