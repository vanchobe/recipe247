import logo from './logo.svg';
import './App.css';

import { useState, useEffect  } from 'react';

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { auth } from './services/firebase';

import PrivateRoute from './helpers/PrivateRoute';
import PublicRoute from './helpers/PublicRoute';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Recipes from './components/Recipes';

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
  return loading === true ? <h2>Loading...</h2> : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/recipes" authenticated={authenticated} component={Recipes}></PrivateRoute>
        <PublicRoute path="/register" authenticated={authenticated} component={Register}></PublicRoute>
        <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
