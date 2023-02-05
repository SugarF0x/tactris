import { WritableDraft } from "immer/dist/types/types-external"
import { UndoStore } from "~/services/undo"
import { useGridStore } from "~/modules/grid"
import { useScoreStore } from "~/modules/score"
import { setUndoItems } from '~/services/undo/mutations'

export function update(state: WritableDraft<UndoStore>): void {
  const gridState = useGridStore.getState()
  const scoreState = useScoreStore.getState()

  setUndoItems(state, [gridState, scoreState])
}
