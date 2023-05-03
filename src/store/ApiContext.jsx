import { createContext, useContext, useState, useEffect } from 'react'
const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {
  const [movieSlider, setMovieSlider] = useState({})
  const [topRatedMovies, setTopRatedMovies] = useState({})
  const [sliderLoading, setSliderLoading] = useState(false)
  let apiKey = '43eab74a0e3371f45b9f10216d3d2a40'

  const fetchCards = async () => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
      )
      const data = await res.json()
      setTopRatedMovies(data.results)
    } catch (e) {
      throw new Error(e)
    }
  }

  const sliderMovieData = async () => {
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      const data = await res.json()
      setMovieSlider(data.results)
      setSliderLoading(true)
      fetchCards()
    } catch (error) {
      throw new Error(error)

    }
  }

  useEffect(() => {
    if (movieSlider.length > 0) return
    else {
      sliderMovieData()
    }
  }, [])
  const values = {
    movieSlider,
    sliderLoading,
    topRatedMovies,
    setTopRatedMovies,
    setSliderLoading,
  }

  return (
    <ApiContext.Provider value={{ ...values }}>{children}</ApiContext.Provider>
  )
}

export const ApiStore = () => {
  return useContext(ApiContext)
}
