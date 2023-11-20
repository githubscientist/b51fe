import React, { useState } from 'react';

const RegisterForm = ({ registerFormData, setRegisterFormData, isRegistered, setIsRegistered }) => {

    const handleRegister = async (e) => {
    e.preventDefault();

    const registerBody = {
      username: registerFormData.username,
      name: registerFormData.name,
      password: registerFormData.password
    };


    console.log('Registering user...');
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerBody)
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('User created successfully');
      console.log(data);
      setRegisterFormData({
        username: '',
        name: '',
        password: ''
      });
      setIsRegistered(true);
    } else {
      console.log('Error creating user');
      console.log(data);
    }
  }

    return (
      <div>
        <form onSubmit={handleRegister}>
          <div>
            <input 
              type='email'
              placeholder='Email...'
              value={registerFormData.username}
              onChange={(e) => setRegisterFormData({...registerFormData, username: e.target.value})}
              required
            />
          </div>

          <div>
            <input 
              type='text'
              placeholder='Full Name...'
              value={registerFormData.name}
              onChange={(e) => setRegisterFormData({...registerFormData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <input 
              type='password'
              placeholder='Password...'
              value={registerFormData.password}
              onChange={(e) => setRegisterFormData({...registerFormData, password: e.target.value})}
              required
            />
          </div>

          <button type='submit'>Register</button>
        </form>

        <p>Already Registered? <button onClick={() => setIsRegistered(true)}>Login</button></p>
      </div>
    )
}
  
const LoginForm = ({ loginFormData, setLoginFormData, isRegistered, setIsRegistered }) => {

    const handleLogin = async (e) => {
      e.preventDefault();

      console.log('Logging in user...');
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginFormData)
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('User logged in successfully');
        console.log(data);
        setLoginFormData({
          username: '',
          password: ''
        });
      } else {
        console.log('Error logging in user');
        console.log(data);
      }
    }

    return (
      <div>
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type='email'
              placeholder='Email...'
              value={loginFormData.username}
              onChange={(e) => setLoginFormData({...loginFormData, username: e.target.value})}
              required
            />
          </div>

          <div>
            <input 
              type='password'
              placeholder='Password...'
              value={loginFormData.password}
              onChange={(e) => setLoginFormData({...loginFormData, password: e.target.value})}
              required
            />
          </div>

          <button type='submit'>Login</button>
        </form>

        <p>Not Registered? <button onClick={() => setIsRegistered(false)}>Register</button></p>
      </div>
    )
}

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

  return (
    <div>
      <h1>Notes Application</h1>

      {
        isRegistered ? (
          <LoginForm
            loginFormData={loginFormData} 
            setLoginFormData={setLoginFormData}
            isRegistered={isRegistered}
            setIsRegistered={setIsRegistered}
          />
        ) : (
            <RegisterForm
              registerFormData={registerFormData} 
              setRegisterFormData={setRegisterFormData}
              isRegistered={isRegistered}
              setIsRegistered={setIsRegistered}
            />
        )
      }
    </div>
  )
}

export default App;