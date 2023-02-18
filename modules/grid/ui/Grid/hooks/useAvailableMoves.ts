import { TetraObject } from "~/modules/tetra"
import { useMemo } from "react"
import { PositionId } from "~/utils"
import { getAvailableTetraPosition } from "~/modules/grid/utils"
import { useRootStore } from "~/services/store"

export interface TetraGridState extends TetraObject {
  canPlace: boolean
}

export function useAvailableMoves(): [TetraGridState, TetraGridState] {
  const tetras = useRootStore(state => state.tetras.available)
  const filledIds = useRootStore(state => state.filledIds)

  const tetraToAvailablePositionsWeakMap = useMemo(() => {
    const map = new WeakMap<TetraObject, PositionId[]>()

    for (const tetra of tetras) {
      const availablePosition = getAvailableTetraPosition(tetra, filledIds)
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
