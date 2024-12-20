import React, { useState } from 'react'

const Login = () => {

  const [currState, setCurrState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  } 

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currState === 'Login' ? '' :
        <input
          type="text"
          className='sign-up-input'
          placeholder='Name'
          required />}
      <input
        type="email"
        className='sign-up-input'
        placeholder='Email'
        required />
      <input
        type="password"
        className='sign-up-input'
        placeholder='Password'
        required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currState === 'Login'
          ? <p onClick={()=>setCurrState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={()=>setCurrState('Login')} className='cursor-pointer'>Login</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login