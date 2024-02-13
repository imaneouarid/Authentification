// pages/ProfilePage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authSlice';
import { selectUser } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Use correct selector
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          {/* Other user information */}
        </>
      )}
      <button className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group " onClick={handleLogout}>
      <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
  Logout</button>
    </div>
  );
};

export default ProfilePage;
