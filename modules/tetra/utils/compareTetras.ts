import { Position, positionToId } from "~/utils"
import { TetraObject } from "../types"
import { floorTetra } from './floorTetra'
import { convertTetraToPositions } from "~/modules/tetra/utils/getTetra"

export function doesInputMatchTetra(input: Position[], tetra: TetraObject): boolean {
  const flooredInput = floorTetra(input)
  const tetraPositions = convertTetraToPositions(tetra)

  const inputIds = flooredInput.map(positionToId).sort().join('_')
  const tetraIds = tetraPositions.map(positionToId).sort().join('_')

  return inputIds === tetraIds
}
