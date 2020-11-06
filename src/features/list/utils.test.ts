import utils from './utils'

describe('getQueryParam', () => {
  test('returns query param', () => {
    const result = utils.getQueryParam('?q=text&another=param', 'q')
    expect(result).toBe('text')
  })

  test('returns null if key not found', () => {
    const result = utils.getQueryParam('?another=param', 'q')
    expect(result).toBe(null)
  })
})

describe('compareTrendingDatetime', () => {
  test('returns positive number if a < b', () => {
    const a = {trending_datetime: '2021-01-01 00:00:00'}
    const b = {trending_datetime: '2021-01-10 00:00:00'}
    const result = utils.compareTrendingDatetime(a, b)
    expect(result).toBeGreaterThan(0)
  })

  test('returns negative number if a > b', () => {
    const a = {trending_datetime: '2021-01-10 00:00:00'}
    const b = {trending_datetime: '2021-01-01 00:00:00'}
    const result = utils.compareTrendingDatetime(a, b)
    expect(result).toBeLessThan(0)
  })

  test('returns zero if a = b', () => {
    const a = {trending_datetime: '2021-01-10 00:00:00'}
    const b = a
    const result = utils.compareTrendingDatetime(a, b)
    expect(result).toBe(0)
  })
})

describe('getGifHeight', () => {
  test('returns same value if ratio = 1', () => {
    const result = utils.getGifHeight(1, 1, 1)
    expect(result).toBe(1)
  })

  test('returns adjusted height if ratio > 1', () => {
    const result = utils.getGifHeight(1, 2, 1)
    expect(result).toBe(2)
  })

  test('returns adjusted height if ratio < 1', () => {
    const result = utils.getGifHeight(2, 1, 2)
    expect(result).toBe(1)
  })

  test('returns rounded value', () => {
    const result = utils.getGifHeight(3, 4, 1)
    expect(result).toBe(1)
  })
})

describe('buildPayload', () => {
  test('returns payload with q', () => {
    const result = utils.buildPayload('text', 10, 5)
    expect(result).toEqual({q: 'text', limit: 10, offset: 5})
  })

  test('returns payload without q', () => {
    const result = utils.buildPayload(null, 10, 5)
    expect(result).toEqual({limit: 10, offset: 5})
  })

  test('returns payload default offset = 0', () => {
    const result = utils.buildPayload('text', 10)
    expect(result).toEqual({q: 'text', limit: 10, offset: 0})
  })
})