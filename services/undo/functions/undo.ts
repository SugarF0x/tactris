import { WritableDraft } from "immer/dist/types/types-external"
import { selectCanUndo, selectUndoCost, UndoStore } from "~/services/undo"
import { useScoreStore } from "~/modules/score"
import { useGridStore } from "~/modules/grid"
import { incTotalUndos, unsetUndoItems } from "~/services/undo/mutations"

export function undo(state: WritableDraft<UndoStore>) {
  const canUndo = selectCanUndo(state)
  if (!canUndo) return

  const currentScore = useScoreStore.getState().score
  const undoCost = selectUndoCost(state)
  const canAffordUndo = currentScore >= undoCost
  if (!canAffordUndo) return

  const [undoGridState, undoScoreState] = state.items
  incTotalUndos(state)
  unsetUndoItems(state)

  if (undoGridState) useGridStore.setState(undoGridState)

  const modifiedScore = currentScore - undoCost
  if (undoScoreState) useScoreStore.setState({ ...undoScoreState, score: modifiedScore })
}
