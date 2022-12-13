import { getTetra, TetraObject } from "~/modules/tetra"

export function getInitialTetras(): [TetraObject, TetraObject] {
  const firstTetra = getTetra()
  const secondTetra = getTetra([firstTetra.type])
  return [firstTetra, secondTetra]
}
