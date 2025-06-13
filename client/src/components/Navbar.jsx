import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


export default function Navbar() {
    const {navigate, token} = useAppContext();
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44  cursor-pointer' onClick={()=>navigate('/')}/>
        <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 bg-primary text-white px-10 py-2.5 rounded-full text-sm cursor-pointer'>
            { token  ? "Dashboard" : "Login" } 
            <img src={assets.arrow} alt="login" className='w-3 inline-block' />           
        </button>
      
    </div>
  )
}
