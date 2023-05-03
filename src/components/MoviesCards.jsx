import React from 'react'
import { ApiStore } from '../store/ApiContext'
import MovieCard from './MovieCard'

const MoviesCards = () => {
  const { topRatedMovies } = ApiStore()

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
