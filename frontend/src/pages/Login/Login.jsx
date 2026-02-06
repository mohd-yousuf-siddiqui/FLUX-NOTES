import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { data, Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import { useDispatch } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice'
import axios from "axios"
import { toast } from 'react-toastify'


const Login = () => {


  const apiURL = import.meta.env.VITE_BACKEND_URL

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async(e) => {
    e.preventDefault()

    if(!validateEmail(email)){
      setError("Please enter a valid email address.")
      return
    }

    if(!password){
      setError("Password cannot be empty.")
      return
    }

    setError("")


    //Login Api
      try {
        dispatch(signInStart)
        const res = await axios.post(`${apiURL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      )

      if(res.data.success === false){
        dispatch(signInFailure(data.message))
        toast.error(res.data.message)
      }

      dispatch(signInSuccess(res.data))
      toast.success(res.data.message)
      navigate("/")

      } catch (error) {
        toast.error(error.message)
        dispatch(signInFailure(error.message))
      }

  }

  return (
    <div className='flex items-center -translate-y-[-65%] justify-center'>
      <div className='w-72 sm:w-96  border border-white/20 rounded bg-(--bg-main) px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7 text-center'>LOGIN</h4>

          <input type="text" placeholder='Email...' className='input-box mb-3' value={email} onChange={(e) => setEmail(e.target.value)}/>

          <PasswordInput value={password} onChange={e=>setPassword(e.target.value)}/>

            {error && <p className='text-red-400 text-sm pb-1'>{error}</p>}

            <button className='btn-primary'>Login</button>

            <p className='text-sm text-center mt-4'>Not registered yet?{" "}
              <Link to={'/signup'} className='font-medium text-(--text-secondary) underline hover:text-(--text-primary)'>
              Create an account</Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Login