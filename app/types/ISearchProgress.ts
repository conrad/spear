export default interface ISearchProgress {
  searchName: string
  phrase: string
  indices: number[]   // need multiple because could have multiple matches possibly happening at once
  isCaseSensitive?: boolean
}
