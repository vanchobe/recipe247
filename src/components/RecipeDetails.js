import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';
import { useParams } from 'react-router-dom';

const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);

    const { recipeId } = useParams();
    
     

      useEffect(() => {
         
        setReadError(null)
        try { 
         db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
                let _id = snap.ref_.path.pieces_[1];
                if(_id === recipeId){
              recipes.push(snap.val())
            }
            });
            setRecipes( recipes );
            
          });
        } catch (error) {
          setReadError(error.message);
        }
      }, []);
    


    return (
        <div>
           <div className="recipes">
        {recipes.map((recipe, index) => {
          return  <div key={index}>
               <p>Recipe name : {recipe.name}</p>
          <p><img src={recipe.image}/></p>
          <p>Prepare Time: {recipe.prepareTime}</p>
          <p>Portions: {recipe.portions}</p>
          <p>How to: {recipe.description}</p>
          </div>
           
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
