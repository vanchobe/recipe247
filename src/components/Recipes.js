import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';

const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);


      useEffect(() => {
         
        setReadError(null)
        try {
          db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
              recipes.push(snap.val());
            });
            setRecipes( recipes );
          });
        } catch (error) {
          setReadError(error.message);
        }
      });
    


    return (
        <div>
           <div className="recipes">
        {recipes.map(recipe => {
          return <Recipe
          key={recipe.id}
          name={recipe.name}
          image= {recipe.image}
          prepareTime = {recipe.prepareTime}
          portions = {recipe.portions}
          description = {recipe.description}
          />
        })}
      </div>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
        </div>
    )
}

Recipes.propTypes = {

}

export default Recipes
