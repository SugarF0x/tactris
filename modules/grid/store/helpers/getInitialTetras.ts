import { getRandomTetra } from "~/modules/tetra"
import { GridTetras } from "~/modules/grid/store/types"

export function getInitialTetras(): GridTetras {
  const firstTetra = getRandomTetra()
  const secondTetra = getRandomTetra([firstTetra])
  const reserve = getRandomTetra([firstTetra, secondTetra])

  return {
    available: [firstTetra, secondTetra],
    reserve
  }
}
