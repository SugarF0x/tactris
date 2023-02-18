import { initialRootState } from '../index'

describe('rootStore', () => {
  it('should not throw', () => {
    expect(initialRootState).toBe(initialRootState)
  })
})
