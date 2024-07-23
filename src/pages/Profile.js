import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsers, getUser } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          return;
        }

        const response = await getUser(token);
        setUser(response);
        // console.log(response);
        // try {
        //   const response = await axios.get('/api/users', {
        //     headers: {
        //       Authorization: `Bearer ${token}`
        //     },
        //     // baseURL: 'http://localhost:3000'
        //   });
        //   if (response.data && typeof response.data === 'object') {
        //     // setUser(response.data);
        //   } else {
        //     setError('Invalid user data');
        //   }
        //   console.log(response.data);
        // } catch (err) {
        // //   setError(err);
        //     setError('Failed to fetch user profile');
        // }
    };    

    fetchUserProfile();
  }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

        {/* {user.length !== 0 ? (
            user.map((movie) => {
              return (
                <div className="col-4">
                  <h1>hallo</h1>
                </div>
              );
            })
          ) : (
            <h1>sabar bang</h1>
          )} */}


      {/* {user.image && <img src={user.image} alt="Profile" />} */}
    </div>
  );
};

export default Profile;
