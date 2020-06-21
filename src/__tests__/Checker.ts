import { NullCheck } from '../lib/Checker'

describe('Create object', () => {
  describe('with empty array', () => {
    const nullCheck = new NullCheck([])

    it('checks string', () => {
      const nullString = nullCheck.makeExist(null, 'string')
      const emptyString = nullCheck.makeExist('', 'string')
      const existingString = nullCheck.makeExist('abc', 'string')
      expect(nullString).toBe('')
      expect(emptyString).toBe('')
      expect(existingString).toBe('abc')
    })

    it('checks number', () => {
      const nullNumber = nullCheck.makeExist(null, 'number')
      const emptyNumber = nullCheck.makeExist(0, 'number')
      const existingNumber = nullCheck.makeExist(1, 'number')
      expect(nullNumber).toBe(0)
      expect(emptyNumber).toBe(0)
      expect(existingNumber).toBe(1)
    })

    it('checks object', () => {
      const nullObject = nullCheck.makeExist(null, 'object')
      const emptyObject = nullCheck.makeExist({}, 'object')
      const existingObject = nullCheck.makeExist({ x: 1 }, 'object')
      expect(nullObject).toStrictEqual({})
      expect(emptyObject).toStrictEqual({})
      expect(existingObject).toStrictEqual({ x: 1 })
    })

    it('checks boolean', () => {
      const nullBoolean = nullCheck.makeExist(null, 'boolean')
      const emptyBoolean = nullCheck.makeExist(false, 'boolean')
      const existingBoolean = nullCheck.makeExist(true, 'boolean')
      expect(nullBoolean).toBe(false)
      expect(emptyBoolean).toBe(false)
      expect(existingBoolean).toBe(true)
    })

    it('checks unknown', () => {
      const nullUnknown = nullCheck.makeExist(null, 'unknown')
      const emptyUnknown = nullCheck.makeExist([], 'unknown')
      const existingUnknown = nullCheck.makeExist([{ x: 1 }], 'unknown')
      expect(nullUnknown).toStrictEqual([])
      expect(emptyUnknown).toStrictEqual([])
      expect(existingUnknown).toStrictEqual([{ x: 1 }])
    })
  })
  
  describe('with empty hash', () => {
    const nullCheck = new NullCheck({})

    it('checks string', () => {
      const nullString = nullCheck.makeExist(null, 'string')
      const emptyString = nullCheck.makeExist('', 'string')
      const existingString = nullCheck.makeExist('abc', 'string')
      expect(nullString).toBe('')
      expect(emptyString).toBe('')
      expect(existingString).toBe('abc')
    })

    it('checks number', () => {
      const nullNumber = nullCheck.makeExist(null, 'number')
      const emptyNumber = nullCheck.makeExist(0, 'number')
      const existingNumber = nullCheck.makeExist(1, 'number')
      expect(nullNumber).toBe(0)
      expect(emptyNumber).toBe(0)
      expect(existingNumber).toBe(1)
    })

    it('checks object', () => {
      const nullObject = nullCheck.makeExist(null, 'object')
      const emptyObject = nullCheck.makeExist({}, 'object')
      const existingObject = nullCheck.makeExist({ x: 1 }, 'object')
      expect(nullObject).toStrictEqual({})
      expect(emptyObject).toStrictEqual({})
      expect(existingObject).toStrictEqual({ x: 1 })
    })

    it('checks boolean', () => {
      const nullBoolean = nullCheck.makeExist(null, 'boolean')
      const emptyBoolean = nullCheck.makeExist(false, 'boolean')
      const existingBoolean = nullCheck.makeExist(true, 'boolean')
      expect(nullBoolean).toBe(false)
      expect(emptyBoolean).toBe(false)
      expect(existingBoolean).toBe(true)
    })

    it('checks unknown', () => {
      const nullUnknown = nullCheck.makeExist(null, 'unknown')
      const emptyUnknown = nullCheck.makeExist({}, 'unknown')
      const existingUnknown = nullCheck.makeExist({ x: { y: 1 } }, 'unknown')
      expect(nullUnknown).toStrictEqual({})
      expect(emptyUnknown).toStrictEqual({})
      expect(existingUnknown).toStrictEqual({ x: { y: 1 } })
    })
  })
})


describe('Create object', () => {
  describe('with existing array', () => {
    const nullCheck = new NullCheck([{ x: 1 }])

    it('checks string', () => {
      const nullString = nullCheck.makeExist(null, 'string')
      const emptyString = nullCheck.makeExist('', 'string')
      const existingString = nullCheck.makeExist('abc', 'string')
      expect(nullString).toBe('')
      expect(emptyString).toBe('')
      expect(existingString).toBe('abc')
    })

    it('checks number', () => {
      const nullNumber = nullCheck.makeExist(null, 'number')
      const emptyNumber = nullCheck.makeExist(0, 'number')
      const existingNumber = nullCheck.makeExist(1, 'number')
      expect(nullNumber).toBe(0)
      expect(emptyNumber).toBe(0)
      expect(existingNumber).toBe(1)
    })

    it('checks object', () => {
      const nullObject = nullCheck.makeExist(null, 'object')
      const emptyObject = nullCheck.makeExist({}, 'object')
      const existingObject = nullCheck.makeExist({ x: 1 }, 'object')
      expect(nullObject).toStrictEqual({})
      expect(emptyObject).toStrictEqual({})
      expect(existingObject).toStrictEqual({ x: 1 })
    })

    it('checks boolean', () => {
      const nullBoolean = nullCheck.makeExist(null, 'boolean')
      const emptyBoolean = nullCheck.makeExist(false, 'boolean')
      const existingBoolean = nullCheck.makeExist(true, 'boolean')
      expect(nullBoolean).toBe(false)
      expect(emptyBoolean).toBe(false)
      expect(existingBoolean).toBe(true)
    })

    it('checks unknown', () => {
      const nullUnknown = nullCheck.makeExist(null, 'unknown')
      const emptyUnknown = nullCheck.makeExist([], 'unknown')
      const existingUnknown = nullCheck.makeExist([{ x: 2 }], 'unknown')
      expect(nullUnknown).toStrictEqual([{ x: 1 }])
      expect(emptyUnknown).toStrictEqual([])
      expect(existingUnknown).toStrictEqual([{ x: 2 }])
    })
  })

  describe('with existing hash', () => {
    const nullCheck = new NullCheck({ x: { y: 1 } })

    it('checks string', () => {
      const nullString = nullCheck.makeExist(null, 'string')
      const emptyString = nullCheck.makeExist('', 'string')
      const existingString = nullCheck.makeExist('abc', 'string')
      expect(nullString).toBe('')
      expect(emptyString).toBe('')
      expect(existingString).toBe('abc')
    })

    it('checks number', () => {
      const nullNumber = nullCheck.makeExist(null, 'number')
      const emptyNumber = nullCheck.makeExist(0, 'number')
      const existingNumber = nullCheck.makeExist(1, 'number')
      expect(nullNumber).toBe(0)
      expect(emptyNumber).toBe(0)
      expect(existingNumber).toBe(1)
    })

    it('checks object', () => {
      const nullObject = nullCheck.makeExist(null, 'object')
      const emptyObject = nullCheck.makeExist({}, 'object')
      const existingObject = nullCheck.makeExist({ x: 1 }, 'object')
      expect(nullObject).toStrictEqual({})
      expect(emptyObject).toStrictEqual({})
      expect(existingObject).toStrictEqual({ x: 1 })
    })

    it('checks boolean', () => {
      const nullBoolean = nullCheck.makeExist(null, 'boolean')
      const emptyBoolean = nullCheck.makeExist(false, 'boolean')
      const existingBoolean = nullCheck.makeExist(true, 'boolean')
      expect(nullBoolean).toBe(false)
      expect(emptyBoolean).toBe(false)
      expect(existingBoolean).toBe(true)
    })

    it('checks unknown', () => {
      const nullUnknown = nullCheck.makeExist(null, 'unknown')
      const emptyUnknown = nullCheck.makeExist({}, 'unknown')
      const existingUnknown = nullCheck.makeExist({ x: { y: 2 } }, 'unknown')
      expect(nullUnknown).toStrictEqual({ x: { y: 1 } })
      expect(emptyUnknown).toStrictEqual({})
      expect(existingUnknown).toStrictEqual({ x: { y: 2 } })
    })
  })
})
