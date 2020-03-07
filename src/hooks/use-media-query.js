import { useState, useEffect } from 'react'

function useMediaQuery(query) {
  const [match, setMatch] = useState(false)

  useEffect(() => {
    const updateMatch = () => setMatch(window.matchMedia(query).matches)

    updateMatch()
    window.matchMedia(query).addEventListener('change', updateMatch)
    return () =>
      window.matchMedia(query).removeEventListener('change', updateMatch)
  }, [setMatch]) // eslint-disable-line react-hooks/exhaustive-deps

  return match
}

export default useMediaQuery