import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }, [pathname])

  return null
}
