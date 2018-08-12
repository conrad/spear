import IResult from "./IResult";

export default interface IResults {
  hasRun: boolean,
  items: IResult[],
  overlay: {
    show: boolean,
    search: string,
    phrase: string,
    body: string,
  },
  showWindow: boolean
}
