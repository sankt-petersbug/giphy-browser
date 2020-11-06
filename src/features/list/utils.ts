import { IFetchPayload } from './slice'

interface ICompared {
  trending_datetime: string
}

export const getQueryParam = (search: string, key: string) => {
  const queryParams = new URLSearchParams(search)
  return queryParams.get(key)
}

export const compareTrendingDatetime = (a: ICompared, b: ICompared) => {
  if (a.trending_datetime > b.trending_datetime) {
    return -1
  } else if (a.trending_datetime === b.trending_datetime) {
    return 0
  } else {
    return 1
  }
}

export const getGifHeight = (currentWidth: number, targetWidth: number, currentHeight: number) => {
  const ratio = targetWidth / currentWidth
  return Math.floor(currentHeight * ratio)
}

export const buildPayload = (q: string | null, limit: number, offset = 0) => {
  const payload: IFetchPayload = {
    offset, 
    limit
  }
  if (q) {
    payload.q = q
  }

  return payload
}

const utils = {
  getQueryParam,
  compareTrendingDatetime,
  getGifHeight,
  buildPayload
}

export default utils