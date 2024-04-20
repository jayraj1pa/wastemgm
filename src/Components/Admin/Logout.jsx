import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const history = useNavigate();

  const logout = async () => {
    const response = await fetch('/logout');

    if (response.ok) {
      // Clear local session storage
      sessionStorage.clear();
      // Redirect to login page
      history('/login');
    } else {
      console.error('Logout failed');
    }
  };

  // Call the logout function when the component is mounted
  React.useEffect(() => {
    logout();
  }, []);

  return (
    <div style={{
      backgroundImage:      "url('/images/home.png')",
      height: "100vh",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      {/* Logging out... */}
    </div>
  );
}

export default Logout;
