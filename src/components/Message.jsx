import React, { useEffect } from 'react'
import { UserAuth } from '../store/AuthContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Message = () => {
  const { message, setMessage } = UserAuth()
  useEffect(() => {
    if (message.message != undefined) {
      if (!message.isSucces) {
        toast.error(message.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          icon: true,
        })
      } else if (message.isSucces) {
        toast.success(message.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          icon: true,
        })
      }
    } else return
  }, [message])
  return (
    <>
      <ToastContainer icon={false} />
    </>
  )
}

export default Message
