import IResult from "./IResult";
import IPhrase from "./IPhrase";

export default interface IResults {
  hasRun: boolean,
  items: IResult[],
  overlay: {
    show: boolean,
    search: string,
    phrase: IPhrase,
    body: string,
  },
  showWindow: boolean
}
