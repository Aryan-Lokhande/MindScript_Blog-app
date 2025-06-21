import { useMatch } from "react-router-dom";
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'


export default function Navbar() {
  const {navigate, token} = useAppContext();
  const isBlogPage = useMatch("/blog/:id");
  const classname = isBlogPage
    ? "fixed top-0 left-0 w-full z-50 bg-background shadow-md flex justify-between items-center py-5 px-8 sm:px-20 xl:px-32"
    : "flex justify-between items-center py-5 px-8 sm:px-20 xl:px-32";

  return (
    <div className={classname}>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44  cursor-pointer' onClick={()=>navigate('/')}/>
        <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 bg-primary text-white px-10 py-2.5 rounded-full text-sm cursor-pointer'>
            { token  ? "Dashboard" : "Login" } 
            <img src={assets.arrow} alt="login" className='w-3 inline-block' />           
        </button>
      
    </div>
  )
}
