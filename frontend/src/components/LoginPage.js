import React from 'react'; // Import React to create components
import { useHistory } from 'react-router-dom'; // Import useHistory to programmatically navigate

// Define the LoginPage component
const LoginPage = () => {
  const history = useHistory(); // Create a history object to navigate programmatically

  // Function to handle Google login button click
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Redirect to Google login endpoint on the server
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button> {/* Button to trigger Google login */}
    </div>
  );
};

export default LoginPage; // Export the LoginPage component as the default export
