export default interface ISearch {
  index: number,
  name: string,
  description?: string,
  phrases: Array<string>,
  isCaseSensitive?: boolean,
  isIncluded: boolean,
  isEditing: boolean,
}
