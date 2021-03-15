import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faHome, faBreadSlice, faUser, faUserPlus  } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css';
import { auth } from '../../services/firebase';

const utensils = <FontAwesomeIcon  className={styles.faUtensils}  icon={faUtensils} />
const homeIcon = <FontAwesomeIcon icon={faHome} />
const breadIcon = <FontAwesomeIcon icon={faBreadSlice} />
const userIcon = <FontAwesomeIcon icon={faUser} />
const userPlusIcon = <FontAwesomeIcon icon={faUserPlus} />




class Header extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      user: auth().currentUser,
      readError: null,
    };
  }
 
  
  
    render() {
      const isAuth = this.props.authenticated ? <NavDropdown title="Профил" id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to={`profile/${this.state.user.uid}`}>Мойте рецепти</NavDropdown.Item>
      <NavDropdown.Item as={Link} to='/add-recipe'>Добави Рецепта</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={this.props.logout}>Изход</NavDropdown.Item>
    </NavDropdown> :  <Nav.Link as={Link} to="/register">{userPlusIcon} Регистрация</Nav.Link>;
      return (
        <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand as={Link}  to="/">{utensils} <span className={styles.recipesLogo}>Recipes</span> <span className={styles.recipes247}>247</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">{homeIcon} Начало</Nav.Link>
            <Nav.Link as={Link} to="/recipes">{breadIcon} Рецепти</Nav.Link>
            

            {isAuth}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      )
    }
  }

export default Header;