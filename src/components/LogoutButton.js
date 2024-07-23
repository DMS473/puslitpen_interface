import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token atau data dari local storage
    localStorage.removeItem('token');

    // Redirect ke halaman utama
    navigate('/');
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;