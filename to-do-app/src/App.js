// App.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Signup from './components/Signup';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);  // Toggle between login and signup

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="App">
      {user ? (
        <TodoList />
      ) : (
        <>
          {isSignup ? <Signup /> : <Login />}
          <p>
            {isSignup ? (
              <span>
                Already have an account?{" "}
                <button onClick={() => setIsSignup(false)}>Log in here</button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <button onClick={() => setIsSignup(true)}>Sign up here</button>
              </span>
            )}
          </p>
        </>
      )}
    </div>
  );
}

export default App;
