import { useState } from 'react'
import PropTypes from 'prop-types'

import { auth, db } from '../services/firebase'

const AddRecipe = ({ logout, authenticated }) => {
  
  const [user, setUser] = useState(auth().currentUser);

   const [writeError, setWriteError] = useState(null);
   const [name, setName] = useState('');
   const [image, setImage] = useState('');
   const [prepareTime, setPrepareTime] = useState(0);
   const [portions, setPortions] = useState(1);
   const [description, setDescription] = useState('');



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
    
      await db.ref("recipes").push({
        ...inputResult,
        timestamp: Date.now(),
        uid: user.uid
      });
       console.log('im here');
    } catch (error) {
      console.log('greshka');
     setWriteError(error.message);
     console.log(writeError);
    }
}
let logOutButton = '';
if(user){
logOutButton = <button onClick={logout}>Log Out</button>;
console.log(logout);
}
    
    
    return (
        <div>
       {logOutButton}
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
        <div>
          Login in as: <strong>{user.email}</strong>
        </div>
      </div>
    )
}

AddRecipe.propTypes = {

}

export default AddRecipe
