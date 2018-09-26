import { ISearchesProfile } from "../local/import/searchLoader"
import { createPhrase } from "../utils/helpers";

export const initialSearchesJson: ISearchesProfile = {
  "searches": [
    {
      "index": 0,
      "isIncluded": false,
      "isEditing": false,
      "name": "Commerce Clause",
      "phrases": [
        createPhrase("hey ma"),
        createPhrase("what's up"),
        createPhrase("let's slide"),
        createPhrase("all right"),
      ]
    },
    {
      "index": 0,
      "isIncluded": false,
      "isEditing": false,
      "name": "Lease Term",
      "phrases": [
        createPhrase("the lease will expire"),
        createPhrase("for * years"),
        createPhrase("for a term of"),
      ]
    }
  ]
}
