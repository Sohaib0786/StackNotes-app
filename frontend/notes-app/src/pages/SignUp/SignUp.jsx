import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { validateEmail } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const SignUp=()=> {
   const [name, setName]=useState("");
   const [email, setEmail]=useState("");
   const [password, setPassword]=useState("");
   const [showPassword, setShowPassword] = useState(false);
  const [error,setError]=useState(null);

    const navigate = useNavigate()

  const handleSignUp = async(e)=>{
    e.preventDefault();

     if(!name) {
      setError("Please enter your name");
      return;
     }
     if(!validateEmail(email)){
      setError("Please enter a email address");
      return;
     }

     if(!password){
      setError("please enter the password");     
       return;
     }

     setError("");

    //SignUp API Call

    try{
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

     //Handle successful registration process 
       if(response.data && response.data.error) {
          setError(response.data.message)
          return
       }
        
         if(response.data && response.data.accessToken){
           localStorage.setItem("token", response.data.accessToken)
           alert("You have successfully created your Account");
           navigate("/dashboard")
         }


    }catch(error){
      //Handle login error
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. please try again");
      }

    }
  };

  
  
  return (
    <>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder='Name'
              value={name}
          
              onChange={(e)=>setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        onChange={(e) => setPassword(e.target.value)}
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

            

              {error && <p className='text-red-500 trxt-xs pb-1'>{error}</p>}          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>

    </>
  )
}
export default SignUp;