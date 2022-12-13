import { idToPosition, Position, PositionId, positionToId } from "~/modules/position"
import { GRID_HEIGHT, GRID_WIDTH } from "~/modules/grid/config"

export function getCompletionSpecs(positionIds: PositionId[]) {
  const positions: Position[] = positionIds.map(idToPosition)

  const [rowIds, columnIds] = positions.reduce((acc, val) => {
    const [rowIdSet, columnIdSet] = acc
    const { x, y } = val

    columnIdSet.add(x)
    rowIdSet.add(y)

    return acc
  }, [new Set<number>(), new Set<number>()])

  const horizontal: Array<PositionId[]> = Array.from(rowIds).map<PositionId[]>(rowId => {
    const colIds = Object.keys(Array(GRID_WIDTH).fill(null)).map(Number)
    return colIds.map(colId => positionToId({ x: colId, y: rowId }))
  })

  const vertical: Array<PositionId[]> = Array.from(columnIds).map<PositionId[]>(colId => {
    const rowIds = Object.keys(Array(GRID_HEIGHT).fill(null)).map(Number)
    return rowIds.map(rowId => positionToId({ x: colId, y: rowId }))
  })

  return {
    horizontal,
    vertical
  }
}
