import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

export function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : null,
  )

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth)
    }, 300)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}

export function useMediaQuery(media) {
  const [match, setMatch] = useState(window.matchMedia(media).matches)

  useEffect(() => {
    function handler(e) {
      setMatch(e.matches)
    }

    window.matchMedia(media).addListener(handler)

    return () => {
      window.matchMedia(media).removeListener(handler)
    }
  }, [media])

  return match
}
