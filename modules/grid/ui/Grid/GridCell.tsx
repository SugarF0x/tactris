import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent } from "react-native"
import { Cell } from "~/modules/tetra/ui"
import { useGridStore } from "~/modules/grid/store"
import { PositionId } from "~/modules/position"
import { Sound } from "expo-av/build/Audio/Sound"
import { Audio } from "expo-av"

export interface GridCellProps {
  onLayout: (e: LayoutChangeEvent) => void
  size: number
  posId: PositionId
}

export function GridCell(props: GridCellProps) {
  const { size, onLayout, posId } = props

  const isFilled = useGridStore(state => state.filledIds.includes(posId))
  const isSelected = useGridStore(state => state.selectedIds.includes(posId))

  const [selectSound, setSelectSound] = useState<Sound | null>(null)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('~/assets/sounds/select.mp3'))
    setSelectSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    if (!selectSound) return undefined
    return () => { void selectSound?.unloadAsync() }
  }, [selectSound])

  useEffect(() => {
    if (isSelected) void playSound()
  }, [isSelected])

  return (
    <Cell
      size={size}
      filled={isFilled}
      selected={isSelected}
      onLayout={onLayout}
    />
  )
}
