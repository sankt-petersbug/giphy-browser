import React from 'react'
import { Link } from 'react-router-dom'

interface IGifProps {
  id: string
  url: string
  title: string
  width: number
  height: number
  x: number
  y: number
}

export default function Gif(props: IGifProps) {
  const { id, url, title, width, height, x, y } = props
  const style = {
    position: 'absolute' as 'absolute',
    transform: `translate3d(${x}px, ${y}px, 0px)`,
    background: 'rgb(0, 255, 153)',
    width,
    height
  }

  return (
    <Link to={`/${id}`} style={style}>
        <div style={{width, height}}>
          <picture>
            <img
              src={url}
              width={width}
              height={height}
              alt={title}
            />
          </picture>
        </div>
    </Link>
  )
}
