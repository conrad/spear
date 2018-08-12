export default interface ISearch {
  index: number,
  name: string,
  description?: string,
  phrases: Array<string>,
  isIncluded: boolean,
  isEditing: boolean,
}
