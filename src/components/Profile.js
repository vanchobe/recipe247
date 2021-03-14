import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';
import { Link, useLocation } from "react-router-dom";


const Profile = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);

    const locationUrl = useLocation().pathname;
    const currentUserProfileId = locationUrl.substring(locationUrl.indexOf("/") + 9);
    
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
              if(snap.val().uid === currentUserProfileId){
              recipes.push({...snap.val(), _id});
              }
              
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
      
      let creatorEmail = '';
      if(recipes.length > 0 && recipes[0].creatorEmail){
        creatorEmail = recipes[0].creatorEmail
      }
       
      let myRecipes = currentUserProfileId === user.uid ? <h1>My Recipes</h1> : <h1>User {creatorEmail} recipes</h1>
      let whoOwnRecipes = currentUserProfileId === user.uid ? 'You don\'t' : 'This user don\'t' ; 
     
    return  recipes.length === 0 ? <p>{whoOwnRecipes} have recipes yet! <Link to='/add-recipe'>Add recipe</Link></p> : 
    (
        <div>
            <p>Email: {user.email}</p>
            <p>Total Recipes Added: {recipes.length}</p>
          {myRecipes}
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

export default Profile