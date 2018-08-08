import { IResult } from "./IResult";

export interface IResults {
  hasRun: boolean,
  items: Array<IResult>,
  overlay: {
    show: boolean,
    search: string,
    phrase: string,
    body: string,
  },
  showWindow: boolean
}
