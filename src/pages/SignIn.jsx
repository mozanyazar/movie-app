import React, { useContext, useState, useEffect } from 'react'
import * as yup from 'yup'
import { UserAuth } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const { SignInWithEmail, user } = UserAuth()
  const navigate = useNavigate()
  const [Singinemail, setSigninEmail] = useState('')
  const [Signinpassword, setSigninPassword] = useState('')

  const SignInHandler = async (e) => {
    e.preventDefault()
    console.log(Singinemail)
    console.log(Signinpassword)

    try {
      console.log('islem devm ediyor')
      await SignInWithEmail(Singinemail, Signinpassword)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <>
      <div className="background-gradiant">
        <div className="bg-create-account"></div>
        <div className="max-w-[600px] p-10 pt-0 bg-[#ededed] rounded-2xl z-[99] shadow-xl max-[600px]:w-[96%] ">
          <h1 className=" pt-5 pb-4 text-center font-primaryFont font-semibold text-titleSize text-slate-800 tracking-wide max-[400px]:text-lg">
            Sign in & Talks About Movies
          </h1>
          <form
            onSubmit={SignInHandler}
            className="flex flex-col gap-2 "
          >
            <div className="form-wrapper">
              <label
                className="form-label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => setSigninEmail(e.target.value)}
                className="form-input"
                type="email"
                name="email"
                required
              />
            </div>
            <div className="form-wrapper">
              <label
                className="form-label"
                htmlFor="password"
              >
                Password
              </label>
              <input
                onChange={(e) => setSigninPassword(e.target.value)}
                required
                type="password"
                className="form-input"
                name="password"
                min={6}
              />
            </div>

            <button
              type="submit"
              className="p-1 py-2 mt-3 bg-slate-900 text-slate-100 rounded-md hover:opacity-[.9] hover:text-slate-300 transition-opacity duration-100 ease-in"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/createAccount')}
              className="p-1 py-2 mt-3  text-slate-900 w-1/2 self-center underline"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignIn
