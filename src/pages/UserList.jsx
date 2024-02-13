import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector   } from 'react-redux';
import { selectToken } from '../reducers/authSlice';
import store from '../store';



const UserList = ({ userRoles }) => {

    const token = useSelector(selectToken);
    console.log('Token:', token); // Check this line
    
    // If using an async action, await its completion
    
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/auth');
          console.log('API Response:', response.data);

          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
    console.log('Token:', token);


    const handleDeleteUser = async (userId) => {
        try {
          // Perform the deletion logic using the user ID (userId)
          // You can make an API call to your server to delete the user
          await axios.delete(`http://localhost:3000/auth/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // After successful deletion, update the users state
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user. Please try again.');        }
      };
      
console.log(users);
      return (
        <div>
          <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <h2>User List</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id} className="flex items-center">
                  Username : {user.username} , Email : {user.email} , Roles : { user.roles && Array.isArray(user.roles) && user.roles.length > 0
  ? user.roles.map(role => role.name).join(', ')
  :  ' No roles ' }


                  { user.role=="Admin" && 

                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
      
  };
  
  export default UserList;