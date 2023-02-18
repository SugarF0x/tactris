import { useEffect, useRef } from "react"
import { Audio } from "expo-av"
import { playAndUnload } from "~/utils"
import { useRootStore } from "~/services/store"

export function useGridSounds() {
  const selectedIdsLength = useRootStore(state => state.selectedIds.length)

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('~/assets/sounds/fill.mp3'))
    await playAndUnload(sound)
  }

  const didMount = useRef(false)
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
    } else {
      if (!selectedIdsLength) void playSound()
    }
  }, [selectedIdsLength])
}
