import { useState } from 'react'
import { Link } from 'react-router-dom';
import { signUp } from './auth';

const Register = props => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value) 
      }
      const handlePassword = (event) => {
        setPassword(event.target.value) 
      }
     const handleSubmit = async (event) => {
        event.preventDefault();  
        setError('')
        try {
          await signUp(email, password);
        } catch (error) {
          setError(error.message);
        }
      } 
    return (
        
        <div>
             <form onSubmit={handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/">Recipes 247</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={handleEmail} value={email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" type="password" onChange={handlePassword} value={password} ></input>
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <button type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        </div>
    )
}

export default Register