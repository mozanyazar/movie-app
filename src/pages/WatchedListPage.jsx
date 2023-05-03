import React from 'react'
import WatchedListUserExist from '../components/WatchedListUserExist'
import { UserAuth } from '../store/AuthContext'
import { Navigate } from 'react-router-dom'

const WatchedListPage = () => {
  const { user } = UserAuth()

  return (
    <div
      style={{ height: 'calc(100vh - 78px)' }}
      className=" max-w-[1240px] mx-auto"
    >
      {user ? <WatchedListUserExist /> : <Navigate to="/" />}
    </div>
  )
}

export default WatchedListPage
