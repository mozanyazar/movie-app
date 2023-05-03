import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserAuth } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'


const CreateAccount = () => {
  const { createUser } = UserAuth()
  const navigate = useNavigate()

  const handleFormSubmit = async (values, actions) => {
    try {
      await createUser(values.email, values.password, values.name)
    } catch (err) {
      console.log(err.message)
    }
    actions.resetForm()
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, 'Password must be min 6 character')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'password must match'),
  })
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleFormSubmit,
    validationSchema: validationSchema,
  })
  return (
    <div className="background-gradiant">
      <div className="bg-create-account"></div>
      <div className="max-w-[600px] p-10 pt-0 bg-[#ededed] rounded-2xl z-[99] shadow-xl max-[600px]:w-[96%] ">
        <h1 className=" pt-5 pb-4 text-center font-primaryFont font-semibold text-titleSize text-slate-800 tracking-wide max-[400px]:text-lg">
          Create Account & Talks About Movies
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 "
        >
          <div className="form-wrapper">
            <label
              className="form-label font-['Poppins', sans-serif]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              value={values.name}
              onChange={handleChange}
              className="form-input"
              type="text"
              name="name"
            />
          </div>
          <div className="form-wrapper">
            <label
              className="form-label"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              className="form-input"
              type="email"
              name="email"
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
              value={values.password}
              onChange={handleChange}
              type="password"
              className="form-input"
              name="password"
            />
          </div>
          <div className="form-wrapper">
            <label
              className="form-label"
              htmlFor="password"
            >
              Password Confirm
            </label>
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              className="form-input"
              type="password"
              name="confirmPassword"
            />
          </div>
          <button
            type="submit"
            className="p-1 py-2 mt-3 bg-slate-900 text-slate-100 rounded-md hover:opacity-[.9] hover:text-slate-300 transition-opacity duration-100 ease-in"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="p-1 py-2 mt-3  text-slate-900 w-1/2 self-center underline"
          >
            already have an account ?
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount
