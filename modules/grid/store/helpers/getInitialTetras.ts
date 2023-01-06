import { getRandomTetra } from "~/modules/tetra"
import { GridTetras } from "~/modules/grid/store/types"

export function getInitialTetras(): GridTetras {
  const firstTetra = getRandomTetra()
  const secondTetra = getRandomTetra([firstTetra.type])
  const reserve = getRandomTetra([firstTetra.type, secondTetra.type])

  return {
    available: [firstTetra, secondTetra],
    reserve
  }
}
