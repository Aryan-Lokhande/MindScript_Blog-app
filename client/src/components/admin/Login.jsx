import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from 'react-hot-toast';

export default function Login() {
    const {axios, setToken} = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/admin/login', { email, password });

            if(data.success){
                setToken(data.token);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
                toast.success("Login successful");
            }
            else{
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <div className="bg-background border-l-4 border-yellow-500 p-4 rounded shadow-md text-sm my-4">
        <p className="font-semibold text-yellow-600">Demo Credentials:</p>
        <p className="pt-0.5"><span className="font-medium">Admin</span> → <code>admin@mindscript.com</code>, &nbsp;<span className="font-medium">Pass: </span> <code>mindscript forever</code></p>
        <p><span className="font-medium">DemoUser</ span> → <code>demo@mindscript.com</code>,&nbsp; <span className="font-medium">Pass: </span> <code>Demo@123</code></p>
      </div>
      
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
            <div className="w-full py-6 text-center">
                <h1 className="text-3xl font-bold"><span className="text-primary">Admin</span> Login</h1>
                <p className="font-light">Enter your credentials to access the admin panel</p>
            </div> 
            <form className="mt-6 w-full sm:max-w-md text-gray-600" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label >Email</label>
                    <input type="email" className="border-b-2 border-gray-300 p-2 outline-none mb-6" required placeholder="Enter your email ID" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="flex flex-col mb-4">
                    <label >Password</label>
                    <input type="password" className="border-b-2 border-gray-300 p-2 outline-none mb-6" required placeholder="Enter your Strong Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all">Login</button>
            </form>
        </div>
      </div>
    </div>
  );
}
