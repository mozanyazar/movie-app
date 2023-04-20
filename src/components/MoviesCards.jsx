import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiStore } from '../store/ApiContext'
import { UserAuth } from '../store/AuthContext'
import { WatchListStore } from '../store/WatchListContext'
import MovieCard from './MovieCard'

const MoviesCards = () => {
  const { topRatedMovies, setTopRatedMovies } = ApiStore()
  const { WatchListHandler } = WatchListStore()

  return (
    <div>
      {topRatedMovies.length > 0 ? (
        <div className="flex flex-wrap justify-between gap-y-6 max-[1240px]:justify-center max-[1240px]:gap-x-1 max-[850px]:justify-between max-[850px]:gap-x-0">
          {topRatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <p>yok</p>
      )}
    </div>
  )
}

export default MoviesCards
