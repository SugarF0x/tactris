import React from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Grid } from "@/modules/grid"

export default function App() {

  return (
    <View>
      <Grid />
      <StatusBar style="auto" />
    </View>
  )
}
