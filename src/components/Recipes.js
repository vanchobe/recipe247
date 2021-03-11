import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

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
            setRecipes({ recipes });
          });
        } catch (error) {
          setReadError(error.message);
        }
      });
    


    return (
        <div>
        
        </div>
    )
}

Recipes.propTypes = {

}

export default Recipes
