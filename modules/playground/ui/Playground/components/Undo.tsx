/* eslint-disable react-native/no-raw-text,react/jsx-no-literals */
import React from 'react'
import { Text } from "react-native"
import { Button } from "~/components"
import { cyan } from "~/styles"

export function Undo() {
  return (
    <Button>
      <Text style={{ color: cyan }}>
        Undo
      </Text>
    </Button>
  )
}
