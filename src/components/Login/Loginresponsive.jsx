import React from 'react'
import { Link } from 'react-router-dom'
function Loginresponsive() {
  return (
    <div className=''>
    <div className=' px-6 h-[100vh] flex flex-row justify-center w-full' style={{ fontFamily: 'Work Sans, sans-serif' }}>
      <div className=' text-white bg-[#ffffff] gap-8 h-[80vh] mt-20 flex flex-col justify-center  w-[100%]  rounded-3xl rounded-br-3xl  border-black border-[1.5px] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]' >
        <div className=' flex flex-col px-[10%]  gap-6'>
        <h1 className=' text-black text-5xl font-medium text-center'>Welcome Back </h1>
        <p className='text-center text-black'>Simplify your workflow and boost your productivity with Tuga's App. Get started for free.</p>
           <input placeholder='Email Address' className=' bg-transparent border border-slate-400 rounded-[5px] px-4  py-[9px]'/>
        </div>
        <div className='flex flex-col px-[10%]  gap-6 justify-center align-middle  w-full'>
           <input placeholder='Password' className=' bg-transparent border border-slate-400 rounded-[5px] px-4 py-[9px]'/>
        </div>
        {/* <div className='flex flex-row justify-center gap-3 mt-[-2%]'>
            <input type='checkbox' className='bg-transparent '/>
            <lable className='text-gray-300 font-normal'>Remember me</lable>
        </div> */}
        <div className='flex justify-center'>
           <button className='bg-[#FC661A] rounded-[5px] py-[10px] w-[80%] active:bg-[#D94F12] transition duration-150 ease-in-out text-[18px]'>Login</button>
        </div>
        <Link className='text-[#FC661A] underline text-center' >Forgot Password?</Link>
      </div>
    </div>
    </div>
  )
}

export default Loginresponsive
