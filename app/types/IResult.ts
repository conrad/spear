import { IExcerpt } from "./IExcerpt";

export interface IResult {
  search: string,
  phrase: string,
  excerpts: IExcerpt[],
  show: boolean
}
