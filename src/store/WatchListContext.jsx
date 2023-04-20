import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { UserAuth } from './AuthContext'
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteField,
  arrayRemove,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

const WatchListContext = createContext()

export const WatchListContextProvider = ({ children }) => {
  const {
    user,
    setMessage,
    setWatchList,
    watchList,
    watchedList,
    setWatchedList,
  } = UserAuth()

  //remove watched list //

  const removeTheWatchedList = async (movie) => {
    const filterWatchedList = watchedList.filter((e) => e.id != movie.id)
    const userWatchedList = doc(db, 'watchedList', user.uid)
    setWatchedList(filterWatchedList)
    await updateDoc(userWatchedList, {
      watchedList: filterWatchedList,
    })
      .then(() => {
        setMessage({
          message: `${
            movie.original_title ? movie.original_title : movie.name
          } has been removed to watched list`,
          isSucces: true,
        })
      })
      .catch((e) => {
        setMessage({
          message: `${error.message}`,
          isSucces: false,
        })
      })
  }

  //remove watch list //

  const removeTheWatchList = async (movie) => {
    const filterWatchList = watchList.filter((e) => e.id != movie.id)
    const userWatchList = doc(db, 'watchList', user.uid)
    setWatchList(filterWatchList)
    await updateDoc(userWatchList, {
      watchList: filterWatchList,
    })
      .then(() => {
        setMessage({
          message: `${
            movie.original_title ? movie.original_title : movie.name
          } has been removed to watch list`,
          isSucces: true,
        })
      })
      .catch((e) => {
        setMessage({
          message: `${error.message}`,
          isSucces: false,
        })
      })
  }

  // add to watched list
  const addToWatchedList = async (movie) => {
    try {
      const compareWithWatchedList = watchedList.find((e) => e.id == movie.id)
      console.log(compareWithWatchedList)
      if (compareWithWatchedList) {
        return setMessage({ isSucces: false, message: 'already exist...' })
      }

      const userWatchedList = doc(db, 'watchedList', user.uid)
      await updateDoc(userWatchedList, {
        watchedList: arrayUnion({
          ...movie,
        }),
      })
      setWatchedList((prev) => [...prev, movie])
      removeTheWatchList(movie)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addWatchList = async (movie, movieId) => {
    try {
      const userWatchList = doc(db, 'watchList', user.uid)

      await updateDoc(userWatchList, {
        watchList: arrayUnion({
          ...movie,
        }),
      }).then(() => {
        setWatchList((prev) => [...prev, movie])
        setMessage({
          message: 'succesfull!',
          isSucces: true,
        })
      })
    } catch (e) {
      setMessage({
        message: 'Error, try again!',
        isSucces: false,
      })
    }
  }

  const addWatchListController = async (movie) => {
    const allReadyExistWatchList = watchList.find((e) => e.id === movie.id)
    const allReadyExistWatchedList = watchedList.find((e) => e.id === movie.id)
    console.log(allReadyExistWatchList)
    console.log(allReadyExistWatchedList)
    if (
      allReadyExistWatchList == undefined &&
      allReadyExistWatchedList == undefined
    ) {
      addWatchList(movie)
    } else if (
      allReadyExistWatchList != undefined &&
      allReadyExistWatchedList == undefined
    ) {
      setMessage({
        isSucces: false,
        message: 'Already exist your watch list !',
      })
    } else if (
      allReadyExistWatchList == undefined &&
      allReadyExistWatchedList != undefined
    ) {
      setMessage({
        isSucces: false,
        message: 'You already watched this movie! ',
      })
    }
  }

  const WatchListHandler = (movie) => {
    if (!user) {
      setMessage({
        message: 'please login!',
        isSucces: false,
      })
    } else if (user) {
      addWatchListController(movie)
    }
  }

  const values = {
    WatchListHandler,
    watchList,
    addToWatchedList,
    removeTheWatchList,
    removeTheWatchedList,
  }

  return (
    <WatchListContext.Provider value={{ ...values }}>
      {children}
    </WatchListContext.Provider>
  )
}

export const WatchListStore = () => {
  return useContext(WatchListContext)
}
