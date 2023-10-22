type TimeToTravel = number

export interface BoardGraph {
  [point: string]: {
    [neighbor: string]: TimeToTravel
  }
}
