import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';

const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);


      useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed){
        setReadError(null)
        }
        try {
          db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
            
              let _id = snap.ref_.path.pieces_[1];
              recipes.push({...snap.val(), _id});
              
            });
            if(isSubscribed){
            setRecipes( recipes.reverse() );
            }
            
          });
        } catch (error) {
          if(isSubscribed){
          setReadError(error.message);
          }
        }
        return () => (isSubscribed = false)
      }, []);

    return (
        <div>
           <div className="recipes">
        {recipes.map((recipe, index) => {
          return <Recipe
          key={index}
          _id={recipe._id}
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

export default Recipes