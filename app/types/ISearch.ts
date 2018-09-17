export default interface ISearch {
  index: number,
  name: string,
  description?: string,
  phrases: string[],
  isCaseSensitive?: boolean,
  isIncluded: boolean,
  isEditing: boolean,
}
