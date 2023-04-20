import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiStore } from '../store/ApiContext'
import { UserAuth } from '../store/AuthContext'
import { WatchListStore } from '../store/WatchListContext'

const MovieCard = ({ movie }) => {
  const { topRatedMovies, setTopRatedMovies } = ApiStore()
  const { WatchListHandler } = WatchListStore()
  const { watchList, user, watchedList } = UserAuth()
  const [isValid, setIsValid] = useState({
    inWatchList: false,
    inWatchedList: false,
  })
  let navigate = useNavigate()
  // || watchedList.length > 0
  useEffect(() => {
    if (user !== null) {
      if (watchList === null) return
      const findInWatchList = watchList.find((e) => e.id === movie.id)
      if (findInWatchList !== undefined) {
        return setIsValid({
          inWatchList: true,
          inWatchedList: false,
        })
      }
    }
    if (watchedList !== null) {
      const findInWatchedList = watchedList.find((e) => e.id === movie.id)
      if (findInWatchedList !== undefined) {
        return setIsValid({
          inWatchList: false,
          inWatchedList: true,
        })
      }
    }
  }, [watchList, watchedList])

  return (
    <div
      key={movie.id}
      className="px-2 py-1 bg-slate-400 flex flex-col items-center justify-between rounded-xl shadow-lg shadow-slate-500 h-[500px] w-[270px] max-[1240px]:w-[33%] max-[850px]:w-[49%] max-[600px]:w-full"
    >
      <div>
        <p className="text-center py-2 font-secondaryFont font-semibold text-xl text-slate-900">
          {' '}
          {movie.name}{' '}
        </p>
        <img
          className="h-auto w-[220px] rounded-xl text-center mx-auto "
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt={`${movie.name}`}
        />
      </div>
      <div className="flex items-center justify-center gap-3 pb-2">
        <button
          onClick={() => navigate(`/movies/${movie.name}/${movie.id}`)}
          className=" px-2 py-2 shadow-sm shadow-neutral-50 font-secondaryFont text-base text-slate-800  bg-neutral-100 rounded-xl hover:bg-slate-900 hover:text-slate-50 duration-300 transition-all ease-out"
        >
          Read More
        </button>
        <button
          disabled={isValid.inWatchList}
          onClick={() => WatchListHandler(movie, movie.id)}
          className=" px-2 py-2 shadow-sm shadow-neutral-50 font-secondaryFont text-base text-slate-800  bg-neutral-100 rounded-xl hover:bg-slate-900 hover:text-slate-50 duration-300 transition-all ease-out"
        >
          {isValid.inWatchList === true || isValid.inWatchedList === true
            ? 'already added'
            : 'Add watch list'}
        </button>
      </div>
    </div>
  )
}

export default MovieCard
