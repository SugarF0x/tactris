import * as module from '~/modules/grid/store/mutations/clearFilledLines'

export function mockClearFilledLines(implementation?: typeof module.clearFilledLines) {
  const mock = jest.fn(implementation ?? module.clearFilledLines)
  jest.spyOn(module,  'clearFilledLines').mockImplementation(mock)
  return mock
}
