import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { getRooms } from '../services/api';
import { useNavigate, Outlet } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        navigate('/login');
        alert('Token not found, Heading to login page.');
        return;
      }

      try {
        const response = await getRooms();
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        {data ? (
        <div>
          <HeaderUser />
          {/* <h1>Welcome to Room Reservation System</h1> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
        <Outlet />
    </div>
  );
};

export default Dashboard;
