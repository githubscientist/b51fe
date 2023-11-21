const LoginForm = ({ loginFormData, setLoginFormData, isRegistered, setIsRegistered, token, setToken, user, setUser }) => {

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

        setToken(data.token);
        setUser(data);

        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data));

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

export default LoginForm;