import { Position, positionToId } from "~/modules/position"
import { TetraObject } from "../types"
import { floorTetra } from './floorTetra'

export function doesInputMatchTetra<T extends Position[]>(input: T, tetra: TetraObject): boolean {
  const flooredInput = floorTetra(input)

  const inputIds = flooredInput.map(positionToId).sort().join('/')
  const tetraIds = tetra.map(positionToId).sort().join('/')

  return inputIds === tetraIds
}
