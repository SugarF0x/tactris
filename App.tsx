import React from "react"
import { View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Grid, useGridStore } from "~/modules/grid"
import { TetraDisplay } from "~/modules/tetra"

export default function App() {

  const tetras = useGridStore(state => state.tetras)

  return (
    <View style={styles.wrapper}>
      <View style={styles.tetras}>
        {tetras.map((tetra, index) => (
          <TetraDisplay key={index} tetra={tetra} />
        ))}
      </View>
      <Grid />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tetras: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 8
  }
})
