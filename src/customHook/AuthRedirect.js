
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token === 'admin-token') {
      navigate('/admin-calendar'); // Redirect to admin page
    } else if (token === 'user-token') {
      navigate('/user'); // Redirect to user page
    } else {
      navigate('/login'); // Redirect to login page
    }
  }, [navigate]);

  return null; // Render nothing during redirection
};

export default AuthRedirect;
