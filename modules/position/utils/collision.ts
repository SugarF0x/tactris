import { Position } from "../types"
import { LayoutRectangle } from "react-native"

export function isWithin(pos: Position, target: LayoutRectangle): boolean {
  if (!(target.x < pos.x && target.x + target.width > pos.x)) return false
  return target.y < pos.y && target.y + target.height > pos.y
}
