import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const PasswordInput = ({value, onChange, placeholder}) => {

    const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <div className='relative mb-5'>
        <input type={isShowPassword ? 'text' : 'password'} placeholder={placeholder || "Password..."}
        value={value} 
        onChange={onChange}
        className='input-box pr-12'/>



        <span
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        {isShowPassword ? <FaRegEye size={20} className='text-(--text-primary)'/> : <FaRegEyeSlash size={20} className='text-(--text-secondary)'/>}
      </span>
    </div>
  )
}

export default PasswordInput