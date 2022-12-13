import { getRandomTetra, TetraObject } from "~/modules/tetra"

export function getInitialTetras(): [TetraObject, TetraObject] {
  const firstTetra = getRandomTetra()
  const secondTetra = getRandomTetra([firstTetra.type])
  return [firstTetra, secondTetra]
}
