import React, { useState } from 'react'
import PasswordInput from '../../components/Input/PasswordInput'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if(!name) {
      setError("Name cannot be empty.")
      return
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if(!password) {
      setError("Password cannot be empty.")
      return
    }

    setError("")


    // Sign Up Api
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup",{
        username: name,
        email,
        password
      },
      {withCredentials: true}
    )

    if(res.data.success === false){
      setError(res.data.message)
      toast.error(res.data.message)
      return
    }

    toast.success(res.data.message)

    setError("")
    navigate("/login")

    } catch (error) {
      toast.error(error.message)
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center -translate-y-[-50%] justify-center'>
      <div className='w-72 sm:w-96 border border-white/20 rounded bg-(--bg-main) px-7 py-10'>
        <form onSubmit={handleSignUp}>
          <h4 className='text-2xl mb-7 text-center'>SIGN UP</h4>

          <input type="text" placeholder='Name...' className='input-box mb-3' value={name} onChange={(e) => setName(e.target.value)}/>
          
          <input type="text" placeholder='Email...' className='input-box mb-3' value={email} onChange={(e) => setEmail(e.target.value)}/>

          <PasswordInput value={password} onChange={e=>setPassword(e.target.value)}/>

            {error && <p className='text-red-400 text-sm pb-1'>{error}</p>}

            <button className='btn-primary'>SIGN UP</button>

            <p className='text-sm text-center mt-4'>Already have an account?{" "}
              <Link to={'/login'} className='font-medium text-(--text-secondary) underline hover:text-(--text-primary)'>
              Login</Link>
            </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp