import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        // const usersData = await fetchUsers(token);
        // console.log(token);
        const usersData = await getUsers(token);
        setUsers(usersData);
        // console.log("tes"+usersData);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      await deleteUser(token, userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {error && <p>{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.full_name}</td>
              <td>{user.phone_number}</td>
              <td>{user.role}</td>
              <button>edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
