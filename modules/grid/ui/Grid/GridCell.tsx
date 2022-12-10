import React from 'react'
import { LayoutChangeEvent } from "react-native"
import { Cell } from "~/modules/tetra/ui"
import { useGridStore } from "~/modules/grid/store"
import { PositionId } from "~/modules/position"

export interface GridCellProps {
  onLayout: (e: LayoutChangeEvent) => void
  size: number
  posId: PositionId
}

export function GridCell(props: GridCellProps) {
  const { size, onLayout, posId } = props
  const { filledIds, selectedIds } = useGridStore()

  const isFilled = filledIds.includes(posId)
  const isSelected = selectedIds.includes(posId)

  return (
    <Cell
      size={size}
      filled={isFilled}
      selected={isSelected}
      onLayout={onLayout}
    />
  )
}
