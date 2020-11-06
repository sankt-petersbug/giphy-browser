import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../../components/loader/Loader'
import { selectGifById, fetchGifById } from '../list/slice'
import { IRootState } from '../../app/store'
import styles from './Details.module.css'

interface IDetailsProps {
  id: string
}

function Details(props: IDetailsProps) {
  const { id } = props
  const dispatch = useDispatch()
  const gif = useSelector((state: IRootState) => selectGifById(state, id))

  useEffect(() => {
    if (!gif) {
      dispatch(fetchGifById(id))
    }
  }, [dispatch, gif, id])

  if (!gif) {
    return (
      <div className={styles.container}>
        <Loader style={{marginTop: 100}}/>
      </div>
    )
  }

  const { title, images: { original: { url, width, height } }} = gif
  const containerStyle = {
    width,
    height
  }

  return (
    <div>
      <div className={styles.container} style={containerStyle}>
        <picture>
          <img
            src={url}
            width={width}
            height={height}
            alt={title}
          />
        </picture>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Details
