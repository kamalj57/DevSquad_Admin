import React from 'react'
import { Link } from 'react-router-dom'
import Loginanimation from '../../assets/Animation/Animation'; 

function Login() {
  return (
    <div className='bg-[#F5F3ED] px-16 h-[100vh] flex flex-row-reverse justify-center w-full' style={{ fontFamily: 'Work Sans, sans-serif' }}>
      <div className='w-[50%] h-[90vh] mt-10 bg-[#9cc6fd] rounded-3xl'>
        <Loginanimation/>
      </div>
      <div className=' text-black gap-8 flex flex-col justify-center w-[43%]'>
        <div className=' flex flex-col px-[20%]  gap-6'>
           <h1 className='text-5xl font-medium text-center'>Welcome Back </h1>
           <p className='text-center'>Simplify your workflow and boost your productivity with Tuga's App. Get started for free.</p>
           <input placeholder='Email Address' type='email' className=' bg-transparent border border-slate-400 rounded-[5px] px-4  py-[9px]'/>
        </div>
        <div className='flex flex-col px-[20%]  gap-6 justify-center align-middle  w-full'>
           <input type='password' placeholder='Password' className=' bg-transparent border border-slate-400 rounded-[5px] px-4 py-[9px]'/>
        </div>
        <div className='flex justify-center'>
           <button className='text-white bg-[#FC661A] rounded-[5px] py-[10px] w-[60%] active:bg-[#D94F12] transition duration-150 ease-in-out text-[18px]'>Login</button>
        </div>
        <Link className='text-[#FC661A] underline text-center' >Forgot Password?</Link>
      </div>
    </div>
  )
}

export default Login
