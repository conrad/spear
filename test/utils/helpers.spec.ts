import * as helpers from '../../app/utils/helpers'

describe('utility helpers', () =>  {
  describe('removeExcessSpaces', () => {
    it('returns the same string when given one without spaces', () => {
      const input: string = 'hotdog'
      expect(helpers.removeExcessSpaces(input)).toEqual(input)
    })

    it('returns the same string when the input has only one space at a time', () => {
      const input: string = 'hot dog hot dog'
      expect(helpers.removeExcessSpaces(input)).toEqual(input)
    })
  })
})
