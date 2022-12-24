// courtesy of https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript

export function rotateMatrix(matrix: Array<unknown[]>): Array<unknown[]> {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}
