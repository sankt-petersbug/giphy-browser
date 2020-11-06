import React from 'react'
import styles from './Loader.module.css'

interface ILoaderProps {
  [key: string]: any
}

function Loader(props: ILoaderProps) {
  return (
    <div className={styles.loader} {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Loader