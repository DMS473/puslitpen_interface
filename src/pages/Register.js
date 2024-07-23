import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [data, setData] = useState({ username: '', email: '', password: '', full_name: '', phone_number: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(data);
      console.log(response.data);
      navigate('/login');

      // Handle successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={data.username} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={data.password} onChange={handleChange} />
        </div>
        <div>
          <label>Full Name</label>
          <input type="text" name="full_name" value={data.full_name} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phone_number" value={data.phone_number} onChange={handleChange} />
        </div>
        {/* <div>
          <label>Role</label>
          <input type="text" name="role" value={data.role} onChange={handleChange} />
        </div> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
