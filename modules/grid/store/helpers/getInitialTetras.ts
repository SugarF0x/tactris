import { getRandomTetra, TetraObject } from "~/modules/tetra"

export function getInitialTetras(): [TetraObject, TetraObject, TetraObject] {
  const firstTetra = getRandomTetra()
  const secondTetra = getRandomTetra([firstTetra.type])
  const thirdTetra = getRandomTetra([firstTetra.type, secondTetra.type])
  return [firstTetra, secondTetra, thirdTetra]
}
