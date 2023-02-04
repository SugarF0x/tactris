import React, { useCallback } from "react"
import { Playground } from "~/modules/playground"
import * as SplashScreen from 'expo-splash-screen'
import { Platform, StyleSheet, View } from "react-native"
import { useFonts } from "expo-font"
import { Fonts } from "~/styles"
import { setBehaviorAsync, setVisibilityAsync } from 'expo-navigation-bar'
import { useMountEffect } from "~/hooks"
import { StatusBar } from "expo-status-bar"
import { PortalProvider } from "@gorhom/portal"

void SplashScreen.preventAutoHideAsync()

export default function App() {
  useMountEffect(() => {
    if (Platform.OS !== 'android') return
    void setVisibilityAsync('hidden')
    void setBehaviorAsync('overlay-swipe')
  })

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
    <View onLayout={onLayoutRootView} style={styles.root}>
      <PortalProvider>
        <Playground />
        <StatusBar style="light" />
      </PortalProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})
