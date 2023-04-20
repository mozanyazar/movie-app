import React, { useEffect } from 'react'
import { UserAuth } from '../store/AuthContext'
import '../css/Header.css'
import { TfiMenu, TfiClose } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import headerLogo from '../animations/headerLogo.json'
import Lottie from 'lottie-react'
const Header = () => {
  const [toggle, setToggle] = useState(false)
  const { logout, user } = UserAuth()
  const toggleChangeHandler = () => {
    setToggle(!toggle)
  }

  return (
    <header className="header max-w-[1240px] mx-auto w-full flex items-center justify-between px-4  box-border py-2 shadow-md bg-slate-100">
      <Link
        to="/"
        className="flex items-center"
      >
        <Lottie
          className="w-[62px] h-auto"
          animationData={headerLogo}
          loop={true}
        />
        <h1 className="logo bg-gradient-to-r from-cyan-500 to-blue-500 font-primaryFont text-[34px] font-semibold ">
          <span className="">Find</span> Movie
        </h1>
      </Link>

      {user ? (
        <nav className={`${toggle == true ? 'opened' : 'closed'} navbar`}>
          <ul className="flex gap-6 items-center">
            <li>
              <Link
                to="/watchlist"
                className="header-link font-primaryFont text-[18px] text-slate-800 tracking-wide	 font-bold "
              >
                {' '}
                Watch List{' '}
              </Link>
            </li>
            <li>
              <Link
                to="/watchedlist"
                className="header-link font-primaryFont tracking-wide	 text-[18px] text-slate-800 font-bold "
              >
                {' '}
                Watched List{' '}
              </Link>
            </li>

            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-xl text-slate-200 font-primaryFont min-w-[120px] hover:bg-cyan-600 hover:text-slate-300 transition-all duration-300 ease-out tracking-wide	"
              onClick={logout}
            >
              Logout
            </button>
          </ul>
        </nav>
      ) : (
        <div
          className={`button-group flex gap-2 ${
            toggle == true ? 'opened' : ''
          }`}
        >
          <Link
            to="/createAccount"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-xl text-slate-200 font-primaryFont min-w-[120px] hover:bg-cyan-600 hover:text-slate-300 transition-all duration-300 ease-out tracking-wide	"
          >
            Create Account
          </Link>
          <Link
            to="/signIn"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 rounded-xl text-slate-200 font-primaryFont min-w-[120px] hover:bg-cyan-600 hover:text-slate-300 transition-all duration-300 ease-out tracking-wide	text-center"
          >
            Sign In
          </Link>
        </div>
      )}

      <div className="hamburger  cursor-pointer">
        {toggle === false ? (
          <button
            onClick={toggleChangeHandler}
            className="p-2 bg-cyan-500 rounded-full"
          >
            <TfiMenu
              color="#ededed"
              className="nav-open text-[18px] cursor-pointer"
            />
          </button>
        ) : (
          <button
            onClick={toggleChangeHandler}
            className="p-2 bg-cyan-500 rounded-full"
          >
            <TfiClose
              color="#ededed"
              className="nav-close text-[18px] cursor-pointer"
            />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
