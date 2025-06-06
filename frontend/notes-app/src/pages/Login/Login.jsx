import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Navigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

export default function Login() {

   const [email, setEmail]=useState("");
   const [password, setpassword]=useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError]=useState(null);

   const navigate = useNavigate();

     const handleLogin = async(e)=>{
      e.preventDefault();

      if(!validateEmail(email)){
        setError("Please enter a valid email address.");
        return;
      }

     if(!password){
      setError("Please enter the password");
     }

       setError("");

     //Login API Call

     try{
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
        
     //Handle successful login response
      if(response.data && response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
            alert("you have Successfully Login to your Account");
           navigate("/dashboard");    
      }
     }catch(error){
       // console.log(error);
      if(error.response && error.response.data && error.response.data.message) {
         setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. Please try again");
      }
     }
           
     };


  return (
    <>

      <Navbar/>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account</h2>
        <form className="space-y-4"  onSubmit={handleLogin}>

          <div>
            <label 
            htmlFor="email" 
            className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
        Password
      </label>

      <input
        type={showPassword ? "text" : "password"}
        id="password"
        className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        required
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-9 text-sm text-blue-600 focus:outline-none"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
      
          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
   
    </>
  )
}
