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

export default RegisterForm;