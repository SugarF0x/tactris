import * as gridConfig from '../config'
import { Axis } from "~/modules/position"

type Config = typeof gridConfig

const defaultSize = 10

const defaultTestingConfig: Config = {
  GRID_WIDTH: defaultSize,
  GRID_HEIGHT: defaultSize,
  axisToGridSizeMap: {
    [Axis.Y]: defaultSize,
    [Axis.X]: defaultSize
  }
}

export function mockGridConfig(override: Partial<Config>) {
  const initialGridConfig = { ...gridConfig }

  beforeEach(() => {
    Object.assign(gridConfig, { ...defaultTestingConfig, ...override })
  })

  afterEach(() => {
    Object.assign(gridConfig, initialGridConfig)
  })
}
