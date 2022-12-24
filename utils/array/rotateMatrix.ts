// courtesy of https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript

export function rotateMatrix<T>(matrix: Array<T[]>): Array<T[]> {
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
}
