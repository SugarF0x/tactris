import * as gridConfig from '../config'
import { Axis } from "~/modules/position"
import { cloneDeep } from "lodash"

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

const initialGridConfig = cloneDeep(gridConfig)

export function overrideGridConfig(override: Partial<Config> = {}) {
  Object.assign(gridConfig, { ...defaultTestingConfig, ...override })
}

export function resetGridConfig() {
  Object.assign(gridConfig, initialGridConfig)
}

export function mockGridConfig(override: Partial<Config> = {}) {
  beforeEach(() => { overrideGridConfig(override) })
  afterEach(resetGridConfig)
}

export function scopedGridConfigMock(callback: () => void, override: Partial<Config> = {}) {
  overrideGridConfig(override)
  callback()
  resetGridConfig()
}
