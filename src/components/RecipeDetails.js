import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';
import { Link, useParams, useHistory } from 'react-router-dom';


const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [content, setContent] = useState('');
    const [readError, setReadError] = useState(null);
    const [writeError, setWriteError] = useState(null);
    const [creatorId, setCreatorId] = useState('');

    const { recipeId } = useParams();
    
     

      useEffect(() => {
        let isSubscribed = true;
        setReadError(null)
        try { 
         db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
                let _id = snap.ref_.path.pieces_[1];
                if(_id === recipeId){
              recipes.push({...snap.val(), _id})
            }
            });
            setRecipes( recipes );
            if(recipes.length > 0){
            setCreatorId(recipes[0].uid);
            }
            
          });
        } catch (error) {
          setReadError(error.message);
        }
        return () => (isSubscribed = false)
      }, []);

      const history = useHistory();
      const deleteRecipe = (id) => {
        db.ref('recipes/' + id).remove()
        .then(()=>{
            history.push('/recipes')
        })
        .catch((error)=>{ setReadError(error.message)})
    }
    


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
          {user.uid === creatorId ? <p><Link to={`/edit-recipe/${recipe._id}`}>Edit Recipe</Link></p> : ''}
          {user.uid === creatorId ? <p>
            <button onClick={() => deleteRecipe(recipe._id)}>
            Delete Recipe
            </button>
              </p> : ''}
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
