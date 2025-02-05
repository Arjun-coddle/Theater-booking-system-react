import { default as axios } from 'axios';
import { useState } from 'react'
import logo from '../Images/logo2.png'
import '../Styles/signup.css'

interface validation {
  username: string;
  password: string;
  email: string
}

function SignUp() {

  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [err, setErr] = useState<validation>(() => ({} as validation));
  const obj = {} as validation;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!username || !email || !password) {
      if (!username) {
        obj.username = 'Please enter name';
      }
      if (!email) {
        obj.email = 'Please enter name'
      }
      if (!password) {
        obj.password = 'Please enter name'
      }
      setErr(obj);
    }
    else {
      axios.post('http://localhost:3003/signup', { email, password, username })
        .then(result => {
          console.log(result);
          alert(`Sign up completed ${username}`);
          setUsername('');
          setPassword('');
          setEmail('');
        })
        .catch(err => {
          console.log(err)
          alert("Something went wrong. Please try again.");
        })
    }

  }

  return (
    <>
      <div className='main'>
        <div className="container">
          <div className="head">
            
            <h1>Create your account</h1>
            <p>It's quick and easy</p>
            {/* <img className='close-btn' src="https://cdn2.iconfinder.com/data/icons/media-controls-5/100/close-1024.png" alt="close button" /> */}
          </div>
          <hr />
          <div className="form-container">
            <form>
              <label htmlFor='username'>Name :</label>
              <input
                className='label-login'
                id='username'
                type="text" placeholder='Enter your name'
                onChange={(e) => {
                  setUsername(e.target.value)
                  setErr({ ...err, username: '' })
                }}
              /><br />
              {err?.username && <span className='err-msg'>Please enter name</span>}
              <label htmlFor="email">Email :</label>
              <input
                id='email'
                className='label-login'
                type="text"
                placeholder='Enter your email'
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErr({ ...err, email: '' })
                }}
              /><br />
              {err?.email && <span className='err-msg'>Please enter email</span>}
              <label htmlFor="password">Password :</label>
              <input
                id='password'
                className='label-login'
                type="password"
                placeholder='Enter password'
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErr({ ...err, password: '' })
                }}
              /><br />
              {err?.password && <span className='err-msg'>Please enter password</span>}
              <div className='signin-link'>
                <p>Already an account? <a href="/">Sign in</a></p>
              </div>
              <button onClick={handleSubmit} className='submit-btn'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp