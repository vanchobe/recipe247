import './App.css';

import { useState, useEffect  } from 'react';

import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { auth } from './services/firebase';

import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import RecipeDetails from './components/RecipeDetails';
import EditRecipe from './components/EditRecipe';
import Profile from './components/Profile';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
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
    })
  }

  return loading === true ? <h2>Loading...</h2> : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/recipes" authenticated={authenticated} component={Recipes}></PrivateRoute>
        <PublicRoute path="/register" authenticated={authenticated} component={Register}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
        <PrivateRoute path="/add-recipe" authenticated={authenticated}  component={() => <AddRecipe logout={logout} />} ></PrivateRoute> 
        <PrivateRoute path="/preview-recipe/:recipeId" authenticated={authenticated}  component={RecipeDetails} ></PrivateRoute>
        <PrivateRoute path="/edit-recipe/:recipeId" authenticated={authenticated}  component={EditRecipe} ></PrivateRoute>
        <Route path="/profile/:userId" authenticated={authenticated}  component={Profile} ></Route>
        
      </Switch>
    </Router>
    
  );
}

export default App;
