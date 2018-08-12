import IExcerpt from "./IExcerpt";

export default interface IResult {
  search: string,
  phrase: string,
  excerpts: IExcerpt[],
  show: boolean
}
