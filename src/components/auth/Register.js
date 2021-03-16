import { useState } from 'react'
import { Link } from 'react-router-dom';
import { signUp } from './auth';

import styles from './Register.module.css';

import { Form, Container, Button } from 'react-bootstrap';

const Register = props => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const handleEmail = (event) => {
        setEmail(event.target.value) 
      }
      const handlePassword = (event) => {
        setPassword(event.target.value) 
      }
      const handleRePassword = (event) => {
        setRePassword(event.target.value) 
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
        
      <Container className='col-md-6 mt-3'>
             <Form onSubmit={handleSubmit}  className={styles.bdForm}>
             <h2>
            Регистрация в <Link to="/">
              Recipes 247
            </Link>
          </h2>
          <Form.Group controlId="email">
    <Form.Label>Имейл</Form.Label>
      <Form.Control placeholder="Имейл..." name="email" type="email" onChange={handleEmail} value={email} />
    </Form.Group>

    <Form.Group controlId="password">
    <Form.Label>Парола</Form.Label>
      <Form.Control placeholder="Парола..." name="password" type="password" onChange={handlePassword} value={password} />
    </Form.Group>
           
    <Form.Group controlId="rePassword">
    <Form.Label>Потвърди парола</Form.Label>
      <Form.Control placeholder="Потвърди парола..." name="rePassword" type="password" onChange={handleRePassword} value={rePassword} />
    </Form.Group>
          <div>
            {error ? <p>{error}</p> : null}
            <Button type="submit">Регистрация</Button>
          </div>
          <hr></hr>
          <Form.Text className="font-weight-bold">
          Имате създаден акаунт? <Link to="/login">Вход</Link>
          </Form.Text>
        </Form>
        </Container>
    )
}

export default Register