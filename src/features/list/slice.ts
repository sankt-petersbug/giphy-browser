import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient, IGif } from '../../api/client'
import { IRootState } from '../../app/store'

export interface IFetchPayload {
  q?: string
  offset: number
  limit: number
}

interface IListState {
  gifs: {
    byId: {
      [key: string]: IGif
    }
  }
  pagination: {
    totalCount: number
  }
  loading: 'idle' | 'pending'
}

const initialState: IListState = {
  gifs: {
    byId: {}
  },
  pagination: {
    totalCount: 0
  },
  loading: 'idle'
}

export const fetchGifById = createAsyncThunk(
  'gifs/fetchById',
  async (id: string) => {
    return await apiClient.fetchGifById(id)
  }
)

export const fetchGifs = createAsyncThunk(
  'gifs/fetchGifs',
  async (payload: IFetchPayload) => {
    const {q, offset, limit } = payload
    if (q) {
      return await apiClient.fetchGifs(q, offset, limit)
    }
    return await apiClient.fetchTrending(offset, limit)
  }
)

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    clearGifs(state: IListState) {
      state.gifs = {
        byId: {}
      }
      state.pagination = {
        totalCount: 0
      }
      state.loading = 'idle'
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchGifById.fulfilled, (state: IListState, action) => {
      const gif = action.payload
      state.gifs.byId[gif.id] = gif
    })
    builder.addCase(fetchGifs.pending, (state: IListState) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    })
    builder.addCase(fetchGifs.fulfilled, (state: IListState, action) => {
      if (state.loading === 'pending') {
        const { data, pagination: { total_count } } = action.payload

        data.forEach((gif) => {
          state.gifs.byId[gif.id] = gif
        })
        state.pagination.totalCount = total_count
        state.loading = 'idle'
      }
    })
  }
})

export const { clearGifs } = listSlice.actions

export const selectGifs = (state: IRootState) => Object.values(state.list.gifs.byId)
export const selectGifById = (state: IRootState, id: string) => state.list.gifs.byId[id]
export const selectTotalCount = (state: IRootState) => state.list.pagination.totalCount
export const selectLoading = (state: IRootState) => state.list.loading

export default listSlice.reducer
