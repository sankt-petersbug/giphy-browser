
interface IImageDetail {
  url: string
  width: string
  height: string
}

export interface IGif {
  id: string
  title: string
  trending_datetime: string
  images: {
    original: IImageDetail
    fixed_width: IImageDetail
  }
}

export interface IListResult {
  meta: {
      msg: string
      response_id: string
      status: number
  }
  pagination: {
      count: number
      total_count: number
      offset: number
  }
  data: IGif[]
}

interface IQueryParams {
  q?: string
  offset?: number
  limit?: number
  rating?: string
}

export default class APIClient {
  baseUrl: string
  apikey: string

  constructor(apikey: string) {
    this.baseUrl = 'https://api.giphy.com/v1/gifs'
    this.apikey = apikey
  }

  buildUrl(path: string, queryParams: IQueryParams = {}) {
    const url = new URL(`${this.baseUrl}/${path}`)
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value)
    }
    url.searchParams.append('api_key', this.apikey)

    return url.toString()
  }

  async fetchTrending(offset: number, limit: number): Promise<IListResult> {
    const url = this.buildUrl('trending', {
      offset,
      limit,
      rating: 'g'
    })
    const resp = await fetch(url)
    const data = await resp.json()

    return data
  }

  async fetchGifs(q: string, offset: number, limit: number): Promise<IListResult> {
    const url = this.buildUrl('search', {
      q,
      offset,
      limit,
      rating: 'g'
    })
    const resp = await fetch(url)
    const data = await resp.json()

    return data
  }

  async fetchGifById(id: string): Promise<IGif> {
    const url = this.buildUrl(id)
    const resp = await fetch(url)
    const data = await resp.json()

    return data.data
  }
}

export const apiClient = new APIClient('')
