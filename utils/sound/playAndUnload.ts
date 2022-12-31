import { Audio } from "expo-av"

export async function playAndUnload(sound: Audio.Sound): Promise<void> {
  sound.setOnPlaybackStatusUpdate(async (status) => {
    if (status.isLoaded && status.didJustFinish) await sound.unloadAsync()
  })

  await sound.playAsync()
}
