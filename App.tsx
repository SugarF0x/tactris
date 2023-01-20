import React, { useCallback } from "react"
import { Playground } from "~/modules/playground"
import * as SplashScreen from 'expo-splash-screen'
import { View } from "react-native"
import { useFonts } from "expo-font"
import { Fonts } from "~/styles"

void SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    [Fonts.MAIN]: require('~/assets/fonts/ChakraPetch-Regular.ttf'),
    [Fonts.MAIN_BOLD]: require('~/assets/fonts/ChakraPetch-Bold.ttf'),
    [Fonts.LCD]: require('~/assets/fonts/lcdmono2bold.ttf'),
    [Fonts.TITLE]: require('~/assets/fonts/NicoMoji-Regular.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null
  return (
    <View onLayout={onLayoutRootView}>
      <Playground />
    </View>
  )
}
