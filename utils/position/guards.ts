import { PositionId } from "./types"

export function isPositionId(val: string): val is PositionId {
  const [x, y] = val.split('/')
  return !(isNaN(Number(x)) || isNaN((Number(y))))
}
