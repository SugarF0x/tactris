import * as module from '~/modules/score/store/helpers/completionsToScore'

export function mockCompletionsToScore(implementation?: typeof module.completionsToScore) {
  const mock = jest.fn(implementation ?? module.completionsToScore)
  jest.spyOn(module,  'completionsToScore').mockImplementation(mock)
  return mock
}
