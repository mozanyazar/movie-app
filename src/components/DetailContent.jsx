import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../store/AuthContext'
import { WatchListStore } from '../store/WatchListContext'

const DetailContent = ({ detailMovie }) => {
  const { WatchListHandler } = WatchListStore()
  const { user } = UserAuth()
  let navigate = useNavigate()

  return (
    <div>
      {detailMovie &&
        detailMovie.map((movie) => {
          return (
            <div key={movie.id}>
              <div className="bg-gradient-to-l from-[#000] to-[#93c7c7] shadow-2xl mt-10 mb-10 max-[1240px]:w-[95%] max-[1240px]:mx-auto ">
                <img
                  className="h-[500px] mx-auto object-cover  max-[1240px]:h-auto max-[1240px]:shadow-2xl"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={`${movie.title}`}
                />
              </div>
              <div className="flex flex-col g-5 font-secondaryFont  max-[1240px]:w-[95%] max-[1240px]:mx-auto">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl mb-3 font-semibold text-slate-700 uppercase max-[900px]:text-xl">
                    {movie.original_title ? movie.original_title : movie.name}
                  </h1>
                  {user ? (
                    <button
                      onClick={() => WatchListHandler(movie)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150 ease-out text-slate-100 font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105 max-[900px]:text-base max-[900px]:mb-5 "
                    >
                      Add Watch List
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/')}
                      className="bg-gradient-to-r from-[#ededed] to-blue-300 transition-all duration-150 ease-out text-slate-900 border-2 border-slate-300  font-semibold py-2 px-4 rounded-2xl shadow-lg hover:scale-105 max-[900px]:text-base max-[900px]:mb-5 "
                    >
                      Login
                    </button>
                  )}
                </div>
                <p className="text-lg text-slate-600 max-[900px]:text-base max-[900px]:mb-4 max-[900px]:text-justify">
                  {movie.overview} <br />
                  <span>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Incidunt perferendis eos quibusdam! Incidunt laudantium
                    asperiores omnis dolorum, recusandae eos repellat. <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore nostrum, voluptas odit dolorum placeat doloribus? Qui
                    asperiores fugiat quos aliquam laboriosam blanditiis. Illum,
                    ex soluta velit quisquam autem optio iste.
                  </span>
                </p>
                <span className="py-2 min-w-[230px] flex justify-center px-5 rounded-2xl bg-slate-300 mb-4 shadow-xl self-end w-max max-[576px]:self-start max-[576px]:w-full">
                  {' '}
                  Original Language: <b>{movie.original_language}</b>{' '}
                </span>
                <span className="py-2 min-w-[230px] flex justify-center px-5 rounded-2xl bg-slate-300 mb-4 shadow-xl self-end w-max max-[576px]:self-start max-[576px]:w-full">
                  Release date: <b>{movie.release_date}</b>
                </span>
                <span className="py-2 min-w-[230px] flex justify-center px-5 rounded-2xl bg-slate-300 mb-4 shadow-xl self-end w-max max-[576px]:self-start max-[576px]:w-full">
                  Vote Average: <b>{movie.vote_average}</b>
                </span>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default DetailContent
