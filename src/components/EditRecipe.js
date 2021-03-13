import { auth } from "../services/firebase";
import { db } from "../services/firebase"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import  Recipe  from './Recipe';
import { useParams } from 'react-router-dom';

const EditRecipe = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [writeError, setWriteError] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [prepareTime, setPrepareTime] = useState(0);
    const [portions, setPortions] = useState(1);
    const [description, setDescription] = useState('');
    const [creatorId, setCreatorId] = useState('');
 
 
    
    const { recipeId } = useParams();
    const submitValue = async (event) => {
        event.preventDefault();
       const inputResult = {
           'name' : name,
           'image' : image,
           'prepareTime' : prepareTime,
           'portions' : portions,
           'description': description
       }
       
       setWriteError(null);
       try {
         await db.ref('recipes/' + recipeId).update({
           ...inputResult
         });
       } catch (error) {
        setWriteError(error.message);
        console.log(writeError);
       }
       
   }
     

      useEffect(async () => {
         
        setWriteError(null)
        try { 
          db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
                let _id = snap.ref_.path.pieces_[1];
                if(_id === recipeId){
              recipes.push(snap.val())
            }
            });
           
           setName(recipes[0].name);
           setImage(recipes[0].image);
           setPrepareTime(recipes[0].prepareTime);
           setPortions(recipes[0].portions);
           setDescription(recipes[0].description);
           setCreatorId(recipes[0].uid);

           
          
          
          });
        } catch (error) {
          setWriteError(error.message);
        }
      }, []);

    
     
    
    
    return (
        user.uid !== creatorId ? <h2>You don't own this recipe! and can't edit</h2> :  <div>
           <div className="recipes">
        <form onSubmit={submitValue}>
<div>
 <input placeholder="Name" name="name" type="text" onChange={e => setName(e.target.value)} value={name}></input>
</div>
<div>
 <input placeholder="Image" name="image" type="text" onChange={e => setImage(e.target.value)} value={image}></input>
</div>
<div>
 <input placeholder="Prepare time" name="prepareTime" type="number" onChange={e => setPrepareTime(e.target.value)} value={prepareTime}></input>
</div>
<div>
 <input placeholder="Portions" name="portions" type="number" onChange={e => setPortions(e.target.value)} value={portions}></input>
</div>
<div>
 <input placeholder="Description" name="description" type="text" onChange={e => setDescription(e.target.value)} value={description}></input>
</div>
{writeError ? <p>{writeError}</p> : null}
<button type="submit">Send</button>
</form>
 
           
        )
      </div>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
        </div>
    )
}

EditRecipe.propTypes = {

}

export default EditRecipe
