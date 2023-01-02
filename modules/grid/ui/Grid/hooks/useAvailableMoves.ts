import { useGridStore } from "~/modules/grid/store"
import { TetraObject } from "~/modules/tetra"
import { useMemo } from "react"
import { PositionId } from "~/utils"
import { getAvailableTetraPosition } from "~/modules/grid/utils"

export interface TetraGridState extends TetraObject {
  canPlace: boolean
}

export function useAvailableMoves(): [TetraGridState, TetraGridState] {
  const tetras = useGridStore(state => state.tetras)
  const filledIds = useGridStore(state => state.filledIds)

  const tetraToAvailablePositionsWeakMap = useMemo(() => {
    const map = new WeakMap<TetraObject, PositionId[]>()

    for (const tetra of tetras) {
      const availablePosition = getAvailableTetraPosition(tetra.positions, filledIds)
      if (!availablePosition) continue
      map.set(tetra, availablePosition)
    }

    return map
  }, [tetras, filledIds])

  return useMemo(() => tetras.map(tetra => {
    return {
      ...tetra,
      canPlace: tetraToAvailablePositionsWeakMap.has(tetra)
    }
  }) as [TetraGridState, TetraGridState], [tetras, tetraToAvailablePositionsWeakMap])
}
