import React from "react"
import { View, StyleSheet } from "react-native"
import { StatusBar } from "expo-status-bar"
import { Grid, useGridStore } from "~/modules/grid"
import { Tetra } from "~/modules/tetra"

export default function App() {
  const tetras = useGridStore(state => state.tetras)

  return (
    <View style={styles.wrapper}>
      <View style={styles.tetras}>
        {tetras.map((tetra, index) => (
          <Tetra key={index} tetra={tetra} size={32} />
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
    alignItems: 'center',
    backgroundColor: '#333'
  },
  tetras: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8
  }
})
