import IPhrase from './IPhrase'

export default interface ISearch {
  index: number,
  name: string,
  description?: string,
  phrases: IPhrase[],
  isIncluded: boolean,
  isEditing: boolean,
}
