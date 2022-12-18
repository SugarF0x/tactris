import { isPositionId } from '../guards'

describe('guards', () => {
  describe('isPositionId', () => {
    it.each<string>([
      '10/10',
      '100/0',
      '-10/10',
      '10/-10',
      '-10/-10',
    ])('should validate %s', (input) => {
      expect(isPositionId(input)).toBeTruthy()
    })

    it.each<string>([
      '10/A',
      'asd/29',
      'asd/ad',
      'asdgsfd',
    ])('should invalidate %s', (input) => {
      expect(isPositionId(input)).not.toBeTruthy()
    })
  })
})
