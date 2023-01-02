import * as module from '~/modules/grid/store/mutations/clearSelection'

export function mockClearSelection(implementation?: typeof module.clearSelection) {
  const mock = jest.fn(implementation ?? module.clearSelection)
  jest.spyOn(module,  'clearSelection').mockImplementation(mock)
  return mock
}
