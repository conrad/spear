import IExcerpt from "./IExcerpt";
import IPhrase from "./IPhrase";

export default interface IResult {
  search: string,
  phrase: IPhrase,
  excerpts: IExcerpt[],
  show: boolean
}
