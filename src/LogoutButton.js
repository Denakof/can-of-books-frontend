import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
      <>
     <Link to="/profile">Profile</Link>
    <button onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>
        
        Log out</button>
        </>
  );
}

export default LogoutButton;