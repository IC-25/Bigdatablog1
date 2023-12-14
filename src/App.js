// Import necessary modules
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SingleBlog from "./components/SingleBlog";
import Dashboard from "./pages/Dashboard";
import AddNew from "./components/Dashboard/AddNew";
import Chart from "./components/Dashboard/Chart";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure you have this component defined
import Analytics from "./components/Dashboard/Analytics";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const userRole = "user"; // Set the user's role (you can fetch this from the API response)

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/Blog/:_id" component={SingleBlog} />
          <Route path="/add new blog" component={AddNew} />
          <Route path="/Analytics" component={Analytics} />

          {/* Protected routes for admin */}
          <ProtectedRoute
            path="/chart"
            component={Chart}
            isAuthenticated={isAuthenticated()}
            userRole={userRole}
          />
          <ProtectedRoute
            path="/post"
            component={Dashboard}
            isAuthenticated={isAuthenticated()}
            userRole={userRole}
          />
          <ProtectedRoute
            path="/analytics"
            component={Analytics}
            isAuthenticated={isAuthenticated()}
            userRole={userRole}
          />

          {/* Redirect to login if no matching route */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
