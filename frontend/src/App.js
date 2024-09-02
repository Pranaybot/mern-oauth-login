import React from 'react'; // Import React to create components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import React Router for routing
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import Dashboard from './components/Dashboard'; // Import the Dashboard component

// Define the App component which sets up the routes for the application
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} /> {/* Route for the login page */}
        <Route exact path="/dashboard" component={Dashboard} /> {/* Route for the dashboard */}
      </Switch>
    </Router>
  );
}

export default App; // Export the App component as the default export
