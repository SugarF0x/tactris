import { idToPosition, positionToId, PositionId, Position } from '../..'

describe('convert', () => {
  describe('idToPosition', () => {
    it.each<[Position, PositionId]>([
      [{ x: 10, y: 10 }, '10-10'],
      [{ x: 12, y: 8 }, '12-8'],
      [{ x: 100, y: 0 }, '100-0'],
      [{ x: 15, y: 150 }, '15-150']
    ])('should convert %p to %s', (input, output) => {
      expect(positionToId(input)).toEqual(output)
    })
  })

  describe('positionToId', () => {
    it.each<[PositionId, Position]>([
      ['10-10', { x: 10, y: 10 }],
      ['12-8', { x: 12, y: 8 }],
      ['100-0', { x: 100, y: 0 }],
      ['15-150', { x: 15, y: 150 }],
    ])('should convert %s to %p', (input, output) => {
      expect(idToPosition(input)).toEqual(output)
    })
  })
})
