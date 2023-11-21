import React, { useEffect, useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import LoggedInPage from './components/LoggedInPage';

function App() {

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    name: '',
    password: ''
  });

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('token');

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  return (
    <div>
      <h1>Notes Application</h1>

      {
        user ? (
          <LoggedInPage
            user={user}
            setUser={setUser}
            token={token} 
            setToken={setToken}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        ) : (
            isRegistered ? (
              <LoginForm
                loginFormData={loginFormData} 
                setLoginFormData={setLoginFormData}
                isRegistered={isRegistered}
                setIsRegistered={setIsRegistered}
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              />
            ) : (
                <RegisterForm
                  registerFormData={registerFormData} 
                  setRegisterFormData={setRegisterFormData}
                  isRegistered={isRegistered}
                  setIsRegistered={setIsRegistered}
                />
            )
        )
      }
    </div>
  )
}

export default App;