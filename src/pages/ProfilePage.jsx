// pages/ProfilePage.jsx
import React , { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authSlice';
import { selectUser } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser); // Use correct selector
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch the list of users from your backend
    // Replace 'apiEndpoint' with your actual API endpoint to fetch users
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
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        <p className="text-xl">Welcome, {user.username}!</p>
        <p className="text-xl">Email: {user.email}</p>
      </div>
          {/* Other user information */}

          {isAdmin ? (
        <div className="mt-8  justify-center items-center bg-cover bg-center  h-screen ">
          <h3 className="text-3xl font-bold  ">Admin Panel - List of Users</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <ul className="list-disc pl-4 inline-block rounded-xl bg-slate-400  bg-clip-border text-gray-700 shadow-2xl ">
              {users.map(userData => (
                <li key={userData._id}>
                  <strong>Username:</strong> {userData.username}, <strong>Email:</strong>{' '}
                  {userData.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Hello, {user.username}!</p>
      )}
       

       <div className="absolute top-0 left-0 mt-4 ml-4">

      
      <button className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group " onClick={handleLogout}>
      <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
           Logout
       </button>
       </div>

    </div>
  );
};

export default ProfilePage;










// {isAdmin ? (
//     <div>
//       <h3>Admin Panel - List of Users</h3>
//       {loading ? (
//         <p>Loading users...</p>
//       ) : (
//         <ul>
//           {users.map(userData => (
//             <li key={userData._id}>
//               <strong>Username:</strong> {userData.username}, <strong>Email:</strong>{' '}
//               {userData.email}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )