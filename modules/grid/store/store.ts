import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { GridStore } from './types'
import { filterInstructedRelativeIds, getFilledLines, getInitialTetras, linesToPositionIdSet } from './helpers'
import { doesInputMatchTetra, getRandomTetra } from "~/modules/tetra"
import { idToPosition } from "~/modules/position"
import { getCompletionLines } from "~/modules/grid/store/helpers"
import { getCollapseInstructions } from "~/modules/grid/store/helpers/getCollapseInstructions"
import { shiftCells } from "~/modules/grid/store/helpers/shiftCells"

export const useGridStore = create<GridStore>()(immer((set) => ({
  filledIds: [],
  selectedIds: [],
  tetras: getInitialTetras(),
  selectId: (id) => set(state => {
    if (state.selectedIds.includes(id)) return
    if (state.filledIds.includes(id)) return
    if (state.selectedIds.length >= 4) state.selectedIds.shift()
    state.selectedIds.push(id)
  }),
  commitSelectedIds: () => set(state => {
    if (state.selectedIds.length < 4) return
    const selectedTetra = state.selectedIds.map(idToPosition)

    for (const [key, tetra] of Object.entries(state.tetras)) {
      const index = Number(key) as 0 | 1
      if (!doesInputMatchTetra(selectedTetra, tetra)) continue

      // update matched tetra with a new random one
      const oldTetraTypes = state.tetras.map(tetra => tetra.type)
      state.tetras[index] = getRandomTetra(oldTetraTypes)

      // check possible completion lines based on input
      const completionLines = getCompletionLines(state.selectedIds)

      // commit selection to filled and clear it
      state.filledIds.push(...state.selectedIds)
      state.selectedIds.length = 0

      // remove filled lines
      const filledLines = getFilledLines(state.filledIds, completionLines)
      const filledLineIds = linesToPositionIdSet(filledLines)
      state.filledIds = state.filledIds.filter(id => !filledLineIds.includes(id))

      // shift remaining cells towards center
      for (const line of filledLines) {
        const instructions = getCollapseInstructions(line)
        const idsToShift = filterInstructedRelativeIds(state.filledIds, line, instructions)
        state.filledIds = state.filledIds.filter(id => !idsToShift.includes(id))
        state.filledIds.push(...shiftCells(idsToShift, line.axis, instructions))
      }

      break
    }
  })
})))
