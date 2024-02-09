import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../actions/authActions';
import { Link } from 'react-router-dom';


const Register = ({ dispatch }) => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      // Your API call to register a new user
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        email,
        password,
        roles: ['user'], // Include the desired default role or roles here

      });

      // Assuming your backend returns user details upon successful registration
      const newUser = response.data;

      // Dispatch action to update user in Redux store
      dispatch(setUser(newUser));

      alert('User created');
    } catch (error) {
        if (error.response && error.response.status === 409) {
          alert("User with this email already exists");
        } else {
          console.error("Error registering user:", error);
        }
      }
  }
  
  
    
  
    
    
  
  
    
    return (
      <>
    <div className='flex justify-center items-center bg-gradient-to-tr from-white to-blue-400 h-screen'>
      <div className="form w-1/3  h-2/3 rounded-xl shadow-xl overflow-hidden z-[300] relative cursor-pointer snap-start shrink-0 py-5 px-10 bg-[#bfdfec] r flex flex-col items-center justify-center gap-11 transition-all duration-300">
        <p className="text-[#181616] font-bold translate-x-[46%] -rotate-90 tracking-[20px] transition-all hover:translate-x-[50%] -translate-y-1/2 text-3xl absolute right-0">
          Welcome
        </p>
  
        <div className="capitalize w-[500px] h-1/3 mb-36 ">
          <p className="text-4xl justify-center   mx-20 gap-5 font-semibold text-[#1c1a19] pb-5">Create Your Account</p>
          <form action="" className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="username" className="text-xl text-[#0b0a0a] font-semibold">Name </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#0c0b0a] focus:outline-none text-[#7F3D27] placeholder:text-xl"
              />
            </div>
  
            <div className="flex flex-col items-start w-full">
              <label htmlFor="email" className="text-xl text-[#0f0e0d] font-semibold">Email </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#090707] focus:outline-none text-[#7F3D27] placeholder:text-xl"
              />
            </div>
  
            <div className="flex flex-col items-start w-full">
              <label htmlFor="password" className="text-xl text-[#0f0d0d] font-semibold">Password </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#0e0c0c] focus:outline-none text-[#7F3D27] placeholder:text-xl"
              />
            </div>
  
            <div className="inline-flex gap-2 items-center text-[#A15A3E]">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-3 h-3 focus:border-0 focus:outline-none focus:accent-[#7F3D27] checked:accent-[#A15A3E] checked:text-[#A15A3E] px-1 py-1"
                defaultChecked={false}            />
              <p className="text-xs">
                By Signing Agree with
                <span className="font-semibold">Term &amp; Policy</span>
              </p>
            </div>
  
            <div className="inline-flex gap-5">
  
              <button
                className="px-8 focus:outline-none focus:scale-110 font-semibold text-sm py-3 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg"
                onClick={handleSignUp}
  
              >
                Sign Up
  
              </button>
  
  
              <Link to="/login" className="text-[#D9D9D9]">
  
              <button   
  
                className="px-8 focus:outline-none focus:scale-110 font-semibold text-sm py-3 rounded-[5px] hover:scale-110 transition-all hover:transiton text-[#7F3D27] bg-[#D9D9D9] shadow-[#7F3D27] shadow-lg"
              >
                Sign In
              </button>
              </Link>
              {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
  
  
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  
  
    
  
    )
  }
  
  export default connect()(Register);
