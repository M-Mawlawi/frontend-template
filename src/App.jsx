import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import Home from './pages/main/';

import { useLocalStorage } from "usehooks-ts";

function App() {
  const [isAuthenticated, saveisAuthenticated] = useLocalStorage("token", null);
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to={'/'} /> // Redirect to intendedPath or home
              ) : (
                <SignIn/>
              )
            }
          />
        </Routes>
      </Fragment>
    </Router>

  )
}

export default App
