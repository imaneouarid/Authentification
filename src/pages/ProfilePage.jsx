import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authSlice';
import { selectUser } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAdmin = user.roles && user.roles.some(role => role._id === '65c7fa96549dc59ed38c5281');

  return (
    <div className="container mx-auto mt-8">
      <div className="text-center">
  <h2 className="text-4xl font-bold mb-6 text-[#e84949]">My Profile</h2>
  <div className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto">
    <div className="mb-6">
      <p className="text-5xl font-bold text-[#58b0e0] mb-2">Welcome, {user.username}!</p>
      <p className="text-xl text-gray-700">Email: {user.email}</p>
    </div>
    <div className="flex justify-center items-center">
      <img
        src="src/assets/cuser.jpg"  
        alt="Profile Image"
        className="w-16 h-16 rounded-full object-cover"
      />
    </div>
    <p className="text-gray-600 mt-4">We're glad to have you as a valued member!</p>
    <div className="mt-6">
      <button className="px-6 py-3 bg-[#58b0e0] text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">
        Edit Profile
      </button>
    </div>
  </div>
</div>

      {isAdmin ? (
        <div className="admin-panel mt-8 justify-center items-center bg-cover bg-center h-screen">
          <h3 className="text-3xl font-bold">Admin Panel - List of Users</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
      {users.map(userData => (
        <div key={userData._id} class="user-card p-4 bg-slate-400 rounded-md shadow-md">
          <strong class="block text-lg font-semibold text-gray-800">{userData.username}</strong>
          <p class="text-sm text-gray-600">{userData.email}</p>
        </div>
      ))}
    </div>
          )}
        </div>
      ) : (
        <p className="mt-8">Hello, {user.username}!</p>
      )}

      <div className="absolute top-0 left-0 mt-4 ml-4">
        <button
          className="logout-button bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          onClick={handleLogout}
        >
          <span className="logout-indicator bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
