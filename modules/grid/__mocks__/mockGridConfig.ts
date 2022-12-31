import * as gridConfig from '../config'
import type { Config } from '../config'
import { Axis } from "~/utils"
import { cloneDeep } from "lodash"

const defaultSize = 10

const defaultTestingConfig: Config = {
  GRID_WIDTH: defaultSize,
  GRID_HEIGHT: defaultSize,
  axisToGridSizeMap: {
    [Axis.Y]: defaultSize,
    [Axis.X]: defaultSize
  }
}

export const initialGridConfig = cloneDeep(gridConfig)

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

export function scopedGridConfigMock(override: Partial<Config> = {}, callback: () => void) {
  overrideGridConfig(override)
  callback()
  resetGridConfig()
}
