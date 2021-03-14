import { useState } from 'react'

import { auth, db } from '../../services/firebase'

import { useHistory } from 'react-router-dom';

const AddRecipe = ({ logout, authenticated }) => {
  
  const [user, setUser] = useState(auth().currentUser);

   const [writeError, setWriteError] = useState(null);
   const [name, setName] = useState('');
   const [image, setImage] = useState('');
   const [prepareTime, setPrepareTime] = useState(0);
   const [portions, setPortions] = useState(1);
   const [description, setDescription] = useState('');

   const history = useHistory();

   const submitValue = async (event) => {
     let isSubscribed = true;
     event.preventDefault();
    const inputResult = {
        'name' : name,
        'image' : image,
        'prepareTime' : prepareTime,
        'portions' : portions,
        'description': description
    }
    if(isSubscribed){
    setWriteError(null);
    }
    try {
    
      await db.ref("recipes").push({
        ...inputResult,
        timestamp: Date.now(),
        uid: user.uid,
        creatorEmail: user.email
      });
       history.push(`/profile/${user.uid}`);
    } catch (error) {
      console.log('greshka');
      if(isSubscribed){
     setWriteError(error.message);
      }
     console.log(writeError);
    }
    
   isSubscribed = false;
}
let logOutButton = '';
if(user){
logOutButton = <button onClick={logout}>Log Out</button>;
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

export default AddRecipe