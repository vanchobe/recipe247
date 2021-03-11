import { useState } from 'react'
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import { signIn } from './auth';


const Login = props => {
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
          await signIn(email, password);
        } catch (error) {
          setError(error.message);
        }
      } 
    return (
        <div>
                    <form
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>
            Login to
            <Link to="/">
              Recipes
            </Link>
          </h1>
          <p>
            Fill in the form below to login to your account.
          </p>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              onChange={handlePassword}
              value={password}
              type="password"
            />
          </div>
          <div>
            {error ? (
              <p>{error}</p>
            ) : null}
            <button type="submit">Login</button>
          </div>
          <hr />
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
        </div>
    )
}

Login.propTypes = {

}

export default Login
