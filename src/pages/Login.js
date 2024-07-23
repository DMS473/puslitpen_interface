import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      console.log(response.data);
      const token = response.data.token;

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      // const userRole = decodedToken.role;

      // console.log(decodedToken.role);

      localStorage.setItem('token', token);
      // localStorage.setItem('role', userRole);

      if(decodedToken.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      // Save the token or handle successful login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="username" name="username" value={credentials.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
