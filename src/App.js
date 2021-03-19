import './App.css';

import { createContext } from 'react';

import { useState, useEffect  } from 'react';
import { Container } from 'react-bootstrap';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  Redirect
} from "react-router-dom";
import { auth } from './services/firebase';

import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe/EditRecipe';
import Profile from './components/Profile/Profile';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchRecipes from './components/SearchRecipes';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import { UserContext } from './helpers/UserContext';


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth().currentUser);

  
   

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setUser(user);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    })
  });
   
  const logout = () => {
    auth().signOut().then((result) => {
     setAuthenticated(false);
     setUser(auth().currentUser);
     <Redirect to={{ pathname: '/' }} />
    })
  }

  return loading === true ? <Loader className="recipes-loader" type="TailSpin" color="#242582" height={80} width={80} /> : (
    <UserContext.Provider value={user}>
    <Router>
      <Header authenticated={authenticated} user={user} logout={logout} />
      <Container fluid="md">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/recipes" authenticated={authenticated} component={Recipes}></PrivateRoute>
        <PublicRoute path="/register" authenticated={authenticated} component={Register}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        <PrivateRoute path="/add-recipe" authenticated={authenticated}  component={() => <AddRecipe logout={logout} />} ></PrivateRoute> 
        <PrivateRoute path="/preview-recipe/:recipeId" authenticated={authenticated}  component={RecipeDetails} ></PrivateRoute>
        <PrivateRoute path="/edit-recipe/:recipeId" authenticated={authenticated}  component={EditRecipe} ></PrivateRoute>
        <PrivateRoute path="/profile/:userId" authenticated={authenticated} user={user}  component={Profile} ></PrivateRoute>
        <PrivateRoute path="/search" authenticated={authenticated} user={user}  component={SearchRecipes} ></PrivateRoute>
        <Route path="/user-profile/:userId" authenticated={authenticated}  component={UserProfile} ></Route>
        
      </Switch>
      </Container>
      <Footer />
    </Router>
    </UserContext.Provider>
    
  );
}

export default App;
