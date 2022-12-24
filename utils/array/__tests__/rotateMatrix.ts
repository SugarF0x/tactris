import { rotateMatrix } from "~/utils"

describe('rotateMatrix', () => {
  it.each<[Array<unknown[]>, Array<unknown[]>]>([
    [
      [
        [1,2,3],
        [4,5,6],
        [7,8,9]
      ],
      [
        [7,4,1],
        [8,5,2],
        [9,6,3]
      ]
    ],
    [
      [
        [true, false],
        ['foo', 'bar']
      ],
      [
        ['foo', true],
        ['bar', false]
      ]
    ],
    [
      [
        ['1/1', '1/2'],
        ['3/4', '4/4']
      ],
      [
        ['3/4', '1/1'],
        ['4/4', '1/2']
      ]
    ],
    [
      [
        [{ x: 1, y: 2 }, { x: 2, y: 1 }],
        [{ x: 1, y: 1 }, { x: 2, y: 2 }]
      ],
      [
        [{ x: 1, y: 1 }, { x: 1, y: 2 }],
        [{ x: 2, y: 2 }, { x: 2, y: 1 }]
      ]
    ]
  ])('should rotate given matrix %#', (input, output) => {
    expect(rotateMatrix(input)).toMatchObject(output)
  })

  it.each<[Array<unknown[]>, Array<unknown[]>]>([
    [
      [
        [1, 2, 3],
        [4, 5, 6]
      ],
      [
        [4, 1],
        [5, 2],
        [6, 3]
      ]
    ],
    [
      [
        [1, 2, 3, 4]
      ],
      [
        [1],
        [2],
        [3],
        [4]
      ]
    ],
    [
      [
        [1],
        [2],
        [3],
        [4]
      ],
      [
        [4, 3, 2, 1]
      ]
    ]
  ])('should rotate uneven matrices %#', (input, output) => {
    expect(rotateMatrix(input)).toMatchObject(output)
  })
})
