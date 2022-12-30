import { useEffect, useRef, useState } from "react"
import { Sound } from "expo-av/build/Audio/Sound"
import { Audio } from "expo-av"
import { useGridStore } from "~/modules/grid/store"

export function useGridSounds() {
  const selectedIdsLength = useGridStore(state => state.selectedIds.length)

  const [fillSound, setFillSound] = useState<Sound | null>(null)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('~/assets/sounds/fill.mp3'))
    setFillSound(sound)
    await sound.playAsync()
  }

  useEffect(() => {
    if (!fillSound) return undefined
    return () => { void fillSound?.unloadAsync() }
  }, [fillSound])

  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) { didMount.current = true }
    else { if (!selectedIdsLength) void playSound() }
  }, [selectedIdsLength])
}
