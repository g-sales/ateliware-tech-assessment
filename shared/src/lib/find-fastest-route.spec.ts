import { BoardGraph } from './board-graph'
import { findFastestRoute } from './find-fastest-route'

describe('findFastestRoute', () => {
  /**
   * For theses tests, will be using a simplified 3x3 board:
   *    _ _ _
   * 3 |_|_|_|
   * 2 |_|_|_|
   * 1 |_|_|_|
   *    A B C
   *
   */

  const graph: BoardGraph = {
    A1: { A2: 1, B1: 2.5 },
    A2: { A1: 2, A3: 6, B2: 4 },
    A3: { A2: 2, B3: 4.7 },
    B1: { A1: 3, B2: 9, C1: 4 },
    B2: { B1: 2, B3: 3.2, A2: 3, C2: 4 },
    B3: { B2: 2, A3: 3, C3: 4 },
    C1: { B1: 3, C2: 1.9 },
    C2: { C1: 2.2, C3: 1, B2: 3 },
    C3: { C2: 5, B3: 4.1 },
  }

  it('should find the fastest route between A1 and A3', () => {
    const result = findFastestRoute('A1', 'A3', graph)

    expect(result.coords).toEqual(['A1', 'A2', 'A3'])
    expect(result.totalTime).toBe(7)
  })

  it('should find the fastest route between A1 and C3', () => {
    const result = findFastestRoute('A1', 'C3', graph)

    expect(result.coords).toEqual(['A1', 'B1', 'C1', 'C2', 'C3'])
    expect(result.totalTime).toBe(9.4)
  })

  it('should find the fastest route between C1 and B2', () => {
    const result = findFastestRoute('C1', 'B2', graph)

    expect(result.coords).toEqual(['C1', 'B1', 'A1', 'A2', 'B2'])
    expect(result.totalTime).toBe(11)
  })

  it('should throw an error if an invalid start point is provided', () => {
    expect(() => findFastestRoute('A5', 'A1', graph)).toThrow()
  })

  it('should throw an error if an invalid end point is provided', () => {
    expect(() => findFastestRoute('A1', 'C7', graph)).toThrow()
  })
})
