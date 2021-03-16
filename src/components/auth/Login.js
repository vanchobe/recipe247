import { useState } from 'react'
import React from 'react';

import { Link } from "react-router-dom";

import { signIn } from './auth';

import { Form, Button, Container } from 'react-bootstrap';

import styles from './Login.module.css';

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
      <Container className='col-md-6 mt-3'>
                    <Form
          autoComplete="off"
          onSubmit={handleSubmit}
          className={styles.bdForm}
        >
          <h1>
            Вход в <Link to="/">
              Recipes 247
            </Link>
          </h1>
          <Form.Group controlId="email">
    <Form.Label>Имейл Адрес</Form.Label>
    <Form.Control 
              placeholder="Имейл..."
              name="email"
              type="email"
              onChange={handleEmail}
              value={email} />
  </Form.Group>

  <Form.Group controlId="password">
    <Form.Label>Парола</Form.Label>
    <Form.Control  
              placeholder="Парола..."
              name="password"
              onChange={handlePassword}
              value={password}
              type="password" />
  </Form.Group>
          
          
          <div>
            {error ? (
              <p>{error}</p>
            ) : null}
            <Button variant="primary" type="submit">
            Вход
           </Button>
          </div>
          <hr />
         
          <Form.Text className="font-weight-bold">
          Нямате акаунт? <Link to="/register">Регистрация</Link>
          </Form.Text>
        </Form>
        </Container>
    )
}

export default Login  