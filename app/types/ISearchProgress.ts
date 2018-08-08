export interface ISearchProgress {
  phrase: string
  indices: number[]   // need multiple because could have multiple matches possibly happening at once
}
