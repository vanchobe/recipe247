import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faHome, faBreadSlice, faUserPlus, faUserTie, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css';
import { auth } from '../../services/firebase';
import {UserContext} from '../../helpers/UserContext';

const utensils = <FontAwesomeIcon  className={styles.faUtensils}  icon={faUtensils} />
const homeIcon = <FontAwesomeIcon  icon={faHome} />
const breadIcon = <FontAwesomeIcon className={styles.faUtensils} icon={faBreadSlice} />
const userPlusIcon = <FontAwesomeIcon icon={faUserPlus} />
const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />
const userTie = <FontAwesomeIcon icon={faUserTie} />






const Header = props =>    {
   

   
  const user = useContext(UserContext);
 
   
    
      const isAuth = user ? <NavDropdown title="Профил" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to={`/profile/${props.user ? props.user.uid : ''}`}>Мойте рецепти</NavDropdown.Item>
      <NavDropdown.Item as={Link} to='/add-recipe'>Добави Рецепта</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={props.logout}>Изход</NavDropdown.Item>
    </NavDropdown>  :   
     <Nav className="mr-auto">
      <Nav.Link as={Link} to="/login">{loginIcon} Вход</Nav.Link>
      <Nav.Link as={Link} to="/register">{userPlusIcon} Регистрация</Nav.Link>
      </Nav>;
    const helloMessage = user ? <Nav.Link as={Link} to={`/profile/${user.uid}`}>{userTie} {user ? user.email : ''}</Nav.Link> : '';
      return  (
        <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand as={Link}  to="/">{utensils} <span className={styles.recipesLogo}>Recipes</span> <span className={styles.recipes247}>247</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">{homeIcon} Начало</Nav.Link>
            <Nav.Link as={Link} to="/recipes">{breadIcon} Рецепти</Nav.Link>
            
              {isAuth}
           
            {helloMessage}
          </Nav>
           
          <Form inline>
            <FormControl type="text" placeholder="Търси рецепта..." className="mr-sm-2" />
            <Button variant="primary">Търси</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      )
    
  }

export default Header;