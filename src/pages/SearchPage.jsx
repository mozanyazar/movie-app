import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingAnimation from '../components/LoadingAnimation'
import { WatchListStore } from '../store/WatchListContext'

export const SearchPage = () => {
  const { WatchListHandler } = WatchListStore()
  const { searchText } = useParams()
  const [searchMovie, setSearchMovie] = useState({})
  const [loading, setLoading] = useState(false)
  const [innerSearchText, setInnerSearchText] = useState('')
  let apiKey = '43eab74a0e3371f45b9f10216d3d2a40'
  const navigate = useNavigate()

  const findMovie = async (query) => {
    console.log('find movie func')
    try {
      let res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=1`
      )
      const data = await res.json()
      setSearchMovie(data.results)
      console.log(data.results)
      setLoading(true)
    } catch (error) {
      console.log('error')
    }
  }

  const searchMovieHandler = (e) => {
    e.preventDefault()
    if (innerSearchText.trim() != '') {
      navigate(`/searchmovies/${innerSearchText}`, {
        replace: true,
      })
      setInnerSearchText('')
    }
  }
  useEffect(() => {
    findMovie(searchText)
  }, [searchText])

  return (
    <div
      style={{ minHeight: 'calc(100vh - 78px)' }}
      className="max-w-[1240px] mx-auto  bg-slate-200 shadow-2xl"
    >
      <div className="pt-2 flex flex-col justify-center items-center gap-5">
        <p className="text-4xl mt-2 font-primaryFont text-slate-700">
          Find Movie
        </p>
        <form
          onSubmit={searchMovieHandler}
          className="flex items-center justify-center max-[650px]:flex-col max-[650px]:w-full"
        >
          <input
            value={innerSearchText}
            onChange={(e) => setInnerSearchText(e.target.value)}
            type="text"
            className="bg-gray-50 border w-[500px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-r-none max-[650px]:w-[90%] max-[650px]:rounded-sm"
            placeholder="Search Movie"
          ></input>
          <button
            type="submit"
            className=" font-secondaryFont bg-black text-white h-[42px] px-1.5 border border-white box-content border-l-0 rounded-lg rounded-l-none max-[650px]:w-[90%] max-[650px]:rounded-sm max-[650px]:px-0 max-[650px]:bg-slate-500"
          >
            Search
          </button>
        </form>
      </div>

      {!loading ? (
        <LoadingAnimation />
      ) : (
        searchMovie.map((el) => (
          <div key={el.id}>
            <div className="mt-10 flex gap-10 items-start py-3 border-b border-slate-700 max-[1240px]:px-4 max-[780px]:flex-col max-[780px]:items-center">
              {el.backdrop_path != null ? (
                <img
                  className="h-[200px] object-cover max-[780px]:w-[90%] max-[780px]:h-auto"
                  src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`}
                  alt={`${el.title}`}
                />
              ) : (
                <div className="h-[200px] min-w-[300px] flex justify-center items-center max-[780px]:w-[90%] max-[780px]:h-auto border border-slate-900">
                  Image not found
                </div>
              )}

              <div>
                <h2 className="text-2xl mb-3 font-semibold text-slate-700 uppercase max-[900px]:text-xl">
                  {' '}
                  {el.original_title}
                  {el.name}
                </h2>
                <p className="text-md text-slate-600  max-[900px]:mb-4 max-[900px]:text-justify max-[900px]:text-sm">
                  {' '}
                  {el.overview}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  porro tempore, voluptate debitis repudiandae officiis dolor
                  amet excepturi corporis soluta! <br />
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Saepe consectetur ducimus voluptatum ipsum nesciunt labore
                  nemo reprehenderit laborum, quo, dicta possimus porro
                  inventore. Laboriosam deleniti vel maxime impedit ea quasi.
                </p>
                <div className="flex items-center pt-3 justify-end pr-2 gap-6 max-[780px]:gap-2  max-[780px]:justify-start">
                  <button
                    onClick={() => WatchListHandler(el)}
                    className="bg-gradient-to-r from-slate-400 to-stone-800 transition-all duration-150 ease-out text-white border-2 border-slate-300  font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105  max-[900px]:text-sm max-[420px]:text-[12px]"
                  >
                    Add Watch List
                  </button>
                  <button
                    onClick={() => navigate(`/movies/${el.title}/${el.id}`)}
                    className="bg-gradient-to-r from-slate-400 to-stone-800 transition-all duration-150 ease-out text-white border-2 border-slate-300  font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105  max-[900px]:text-sm max-[420px]:text-[12px]"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
