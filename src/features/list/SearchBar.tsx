import React, { useEffect, useState, useRef, SyntheticEvent } from 'react'

import styles from './SearchBar.module.css'

interface ISearchBarProps {
  width: number
  defaultValue: string | null
  onSubmit: (queryText: string) => void
}

function SearchBar(props: ISearchBarProps) {
  const { width, defaultValue, onSubmit } = props
  const element = useRef<HTMLDivElement>(null)
  const [isSticky, setSticky] = useState(false)
  const [queryText, setQueryText] = useState(defaultValue || '')
  const stickyClass = isSticky ? styles.sticky : ''
  const className = `${styles.container} ${stickyClass}`
  const containerStyle = { width }
  const paddingRight = 10
  const paddingLeft = 38
  const inputStyle = {
    paddingRight,
    paddingLeft,
    width: width - paddingLeft - paddingRight
  }

  const handleChange = (e: SyntheticEvent) => {
    const newQueryText = (e.target as HTMLInputElement).value
    setQueryText(newQueryText)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    onSubmit(queryText)
  }

  const handleScroll = () => {
    if (element.current) {
      const shouldSticky = window.scrollY > element.current.getBoundingClientRect().bottom
      shouldSticky ? setSticky(true) : setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setQueryText(defaultValue || '')
  }, [defaultValue])

  return (
    <div ref={element} className={className} style={containerStyle}>
      <form onSubmit={handleSubmit}>
        <label>
          <i className="material-icons">search</i>
        </label>
        <input
          type="text"
          placeholder="Search GIFs..."
          value={queryText}
          onChange={handleChange}
          style={inputStyle}
        />
      </form>
    </div>
  )
}

export default SearchBar
