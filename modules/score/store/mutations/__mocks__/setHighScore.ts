import * as module from '~/modules/score/store/mutations/setHighScore'

export function mockSetHighScore(implementation?: typeof module.setHighScore) {
  const mock = jest.fn(implementation ?? module.setHighScore)
  jest.spyOn(module,  'setHighScore').mockImplementation(mock)
  return mock
}
