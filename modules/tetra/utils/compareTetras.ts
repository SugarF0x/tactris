import { Position, positionToId } from "~/utils"
import { TetraObject } from "../types"
import { floorTetra } from './floorTetra'

export function doesInputMatchTetra(input: Position[], tetra: TetraObject): boolean {
  const flooredInput = floorTetra(input)

  const inputIds = flooredInput.map(positionToId).sort().join('/')
  const tetraIds = tetra.positions.map(positionToId).sort().join('/')

  return inputIds === tetraIds
}
