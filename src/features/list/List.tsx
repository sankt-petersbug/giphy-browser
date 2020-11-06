import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import Loader from '../../components/loader/Loader'
import SearchBar from './SearchBar'
import Gif from './Gif'
import NoResult from './NoResult'
import { IGif } from '../../api/client'
import {
  getQueryParam,
  compareTrendingDatetime,
  getGifHeight,
  buildPayload
} from './utils'
import {
  selectTotalCount,
  selectGifs,
  selectLoading,
  clearGifs,
  fetchGifs
} from './slice'
import styles from './List.module.css'

interface IListProps {
  numCols: number
  gutter: number
  width: number
  pageSize: number
}

export const createChildren = (gifs: IGif[], numCols: number, gutter: number, totalWidth: number) => {
  const gifWidth = Math.floor((totalWidth - gutter * (numCols - 1)) / numCols)
  const cols = Array(numCols).fill(0)
  const children = gifs.map(gif => {
    const { id, title, images: { fixed_width: { width, height, url } } } = gif
    const gifHeight = getGifHeight(parseInt(width), gifWidth, parseInt(height))
    const colIdx = cols.indexOf(Math.min(...cols))
    const x = colIdx * (gifWidth + gutter)
    const y = cols[colIdx]
    const childProps = {
      id,
      url,
      title,
      x,
      y,
      width: gifWidth,
      height: gifHeight,
    }

    cols[colIdx] += (gifHeight + gutter)

    return <Gif key={id} {...childProps} />
  })
  const maxHeight = Math.max(...cols)

  return {
    maxHeight,
    children
  }
}

function List(props: IListProps) {
  const { numCols, gutter, width, pageSize } = props
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const element = useRef(null)
  const queryFromUrl = getQueryParam(location.search, 'q')
  const loading = useSelector(selectLoading)
  const totalCount = useSelector(selectTotalCount)
  const gifs = useSelector(selectGifs).sort(compareTrendingDatetime)
  const { maxHeight, children } = useMemo(
    () => createChildren(gifs, numCols, gutter, width),
    [gifs, numCols, gutter, width]
  )
  const shouldShowChildren = children.length >= pageSize
  const gridStyle = {
    width: width,
    height: maxHeight
  }
  const handleScroll = () => {
    const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
    if (atBottom && gifs.length < totalCount && loading === 'idle') {
      const payload = buildPayload(queryFromUrl, pageSize, gifs.length)
      dispatch(fetchGifs(payload))
    }
  }
  const handleScrollCb = useCallback(handleScroll, [dispatch, pageSize, queryFromUrl, loading, totalCount, gifs.length])
  const handleSearchSubmit = (query: string | null) => {
    if (!query) {
      history.push({
        pathname: '/'
      })
      return
    }

    history.push({
      pathname: '/search',
      search: `?q=${query}`
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollCb, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScrollCb);
    }
  }, [handleScrollCb])

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(clearGifs())
      const payload = buildPayload(queryFromUrl, pageSize)
      dispatch(fetchGifs(payload))
    }
  }, [dispatch, pageSize, queryFromUrl])

  return (
    <div>
      <SearchBar width={width} defaultValue={queryFromUrl} onSubmit={handleSearchSubmit} />
      <div ref={element} className={styles.grid} style={gridStyle}>
        { shouldShowChildren && children}
        { (!shouldShowChildren && loading !== 'pending') && <NoResult />}
      </div>
      { loading === 'pending' && <Loader />}
    </div>
  )
}

export default List
