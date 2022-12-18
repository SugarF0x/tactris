import { LayoutRectangle } from "react-native"
import { Position } from "../.."
import { isWithin } from '../collision'

describe('collision', () => {
  const testRectangle: LayoutRectangle = {
    x: 10,
    y: 15,
    width: 20,
    height: 25
  }

  describe('isWithin', () => {
    it.each<Position>([
      { x: 11, y: 16 },
      { x: 15, y: 20 },
      { x: 17, y: 30 },
      { x: 26, y: 35 },
      { x: 29, y: 39 }
    ])('should validate positions within rectangle borders %#', (input) => {
      expect(isWithin(input, testRectangle)).toBeTruthy()
    })

    it.each<Position>([
      { x: 10, y: 15 },
      { x: 30, y: 15 },
      { x: 10, y: 40 },
      { x: 30, y: 40 },
    ])('should validate positions on rectangle borders %#', (input) => {
      expect(isWithin(input, testRectangle)).toBeTruthy()
    })

    it.each<Position>([
      { x: 5, y: 20 },
      { x: 50, y: 20 },
      { x: 20, y: 5 },
      { x: 20, y: 50 }
    ])('should invalidate positions outside rectangle borders %#', (input) => {
      expect(isWithin(input, testRectangle)).not.toBeTruthy()
    })

    it.each<[Position, LayoutRectangle, boolean]>([
      [{ x: 126, y: 108 }, { x: 100, y: 100, height: 100, width: 100 }, true],
      [{ x: 126, y: 78 }, { x: 100, y: 100, height: 100, width: 100 }, false],
      [{ x: 78, y: 126 }, { x: 100, y: 100, height: 100, width: 100 }, false],
      [{ x: 78, y: 78 }, { x: 100, y: 100, height: 100, width: 100 }, false],
      [{ x: 56, y: 72 }, { x: 56, y: 64, height: 16, width: 6 }, true],
      [{ x: 60, y: 60 }, { x: 56, y: 60, height: 1, width: 6 }, true],
    ])('sprinkle in some more test rectangles %#', (pos, rect, result) => {
      expect(isWithin(pos, rect)).toEqual(result)
    })
  })
})
