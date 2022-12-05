import {
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useRef } from "react"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  item: {
    margin: 16,
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

const children = [
  <TouchableOpacity key={0} style={styles.item} />,
  <TouchableOpacity key={1} style={styles.item} />,
  <TouchableOpacity key={2} style={styles.item} />,
  <TouchableOpacity key={3} style={styles.item} />
]

interface Pos {
  x: number
  y: number
}

function isWithin(pos: Pos, target: LayoutRectangle): boolean {
  if (!(target.x < pos.x && target.x + target.width > pos.x)) return false
  return target.y < pos.y && target.y + target.width > pos.y
}

export function Grid() {
  function handleMove(e: GestureResponderEvent) {
    const { pageX: x, pageY: y } = e.nativeEvent
    const pos: Pos = { x, y }

    for (const [id, item] of Object.entries(itemLayouts.current)) {
      if (!isWithin(pos, item)) continue

      // eslint-disable-next-line no-console
      console.log('found ', id)
      break
    }
  }

  const itemLayouts = useRef<Record<string, LayoutRectangle>>({})

  function onLayout(e: LayoutChangeEvent, id: string) {
    itemLayouts.current[id] = e.nativeEvent.layout
  }

  const mappedChildren = children.map((child, index) => React.cloneElement(child, { onLayout: (e: LayoutChangeEvent) => onLayout(e, String(index)), key: index }))

  return (
    <View style={styles.container} onTouchMove={handleMove}>
      {mappedChildren}
    </View>
  )
}
