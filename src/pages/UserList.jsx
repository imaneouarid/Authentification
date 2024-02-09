import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ userRoles }) => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/auth');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              Username: {user.username}, Email: {user.email}, Roles: {user.roles.join(', ')}
              {userRoles.includes('admin') && (
                <button disabled>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;