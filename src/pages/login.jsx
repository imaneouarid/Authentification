//pages/login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate


const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook


  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:3000/auth/login", { username, password });
        dispatch(login(response.data));
        navigate('/UserList');
      } catch (error) {
        console.error("Error during login:", error);
    
        if (error.response && error.response.status) {
          if (error.response.status === 404) {
            window.alert("User not found");
          } else if (error.response.status === 400) {
            window.alert("Username or password is incorrect");
          } else {
            window.alert("An error occurred during login");
          }
        } else {
          window.alert("An unexpected error occurred during login");
        }
      }
  };
  
  return (
    <>
<div className='flex justify-center items-center bg-cover bg-center bg-no-repeat bg-gradient-to-tr h-screen' style={{ backgroundImage: "url('/src/assets/task.jpg')" }}>

      {/* <div className='  flex justify-center items-center bg-[url('./assets/')] bg-gradient-to-tr from-cyan-600 to-cyan-400  h-screen'> */}
        <div className="relative flex w-1/3 h-4/3 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40" >
            <h3
              className="block font-sans text-3xl font-bold	leading-snug  text-white antialiased "
            >
              Sign In
            </h3>
          </div>
          <div className="flex flex-col gap-4 p-6 ">
            <div className="relative h-14 w-full min-w-[200px] mb-12">
              <input
                placeholder=""
                value={username}
              onChange={(e) => setUsername(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-l font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[18px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 text-cyan-500 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Username
              </label>
            </div>
            <div className="relative h-14 w-full min-w-[200px] ">
              <input
              type='password'
                placeholder=""
                value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <label
                className="before:content[' '] after:content[' '] pointer-events-none absolute text-cyan-500 left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
              >
                Password
              </label>
            </div>
            <div className="-ml-2.5">
              <div className="inline-flex items-center">
                <label
                  data-ripple-dark="true"
                  htmlFor="checkbox"
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                >
                  <input
                    id="checkbox"
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-cyan-500 checked:bg-cyan-500 checked:before:bg-cyan-500 hover:before:opacity-10"
                    type="checkbox"
                  />
                  <span
                    className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  >
                    <svg
                      strokeWidth="1"
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
                <label
                  htmlFor="checkbox"
                  className="mt-px cursor-pointer select-none font-light text-gray-700"
                >
                  Remember Me
                </label>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button
            onClick={handleSignIn}
              data-ripple-light="true"
              type="button"
              className="block w-full  h-14 select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xl font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Sign In
            </button>
            <p
              className="mt-6 flex justify-center font-sans text-xl font-light leading-normal text-inherit antialiased"
            >
              Don't have an account?
              <a
                className="ml-1 block font-sans text-xl font-bold leading-normal text-cyan-500 antialiased"
                href="register"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      
    </>
  )
}


export default LoginPage