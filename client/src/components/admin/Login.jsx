import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login form submitted");
    };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold"><span className="text-primary">User</span> Login</h1>
                <p class="font-light">Enter your credentials to access the admin panel</p>
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
    </div>
  );
}
