import axios from 'axios';
import { useState } from 'react';
import '../Styles/signup.css';

interface ValidationErrors {
  username?: string;
  password?: string;
  email?: string;
}

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const enterPasswordMessage:string = process.env.REACT_APP_ENTER_PASSWORD ?? 'Please enter a password';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ValidationErrors = {};

    if (!username) {
      newErrors.username = 'Please enter your name';
    }
    if (!email) {
      newErrors.email = 'Please enter your email';
    }
    if (!password) {
      newErrors.password = enterPasswordMessage;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/signup', { email, password, username });
      console.log(response);
      alert(`Sign up completed for ${username}`);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='main'>
      <div className="container">
        <div className="head">
          <h1>Create your account</h1>
          <p>It's quick and easy</p>
        </div>
        <hr />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Name:</label>
            <input
              className='label-login'
              id='username'
              type="text"
              placeholder='Enter your name'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: undefined }));
              }}
            /> <br />
            {errors.username && <span className='err-msg'>{errors.username}</span>}
            
            <label htmlFor="email">Email:</label>
            <input
              id='email'
              className='label-login'
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
            /> <br />
            {errors.email && <span className='err-msg'>{errors.email}</span>}
            
            <label htmlFor="password">Password:</label>
            <input
              id='password'
              className='label-login'
              type="password"
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: undefined }));
              }}
            /> <br />
            {errors.password && <span className='err-msg'>{errors.password}</span>}
            
            <div className='signin-link'>
              <p>Already have an account? <a href="/">Sign in</a></p>
            </div>
            
            <button type="submit" className='submit-btn'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
