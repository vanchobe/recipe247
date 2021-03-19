import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import styles from './EditRecipe.module.css';

import validateAddRecipes from '../../helpers/validateAddRecipes';


const EditRecipe = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [writeError, setWriteError] = useState({});
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [prepareTime, setPrepareTime] = useState(0);
    const [portions, setPortions] = useState(1);
    const [description, setDescription] = useState('');
    const [creatorId, setCreatorId] = useState('');
 
 
    const history = useHistory();
    const { recipeId } = useParams();
    const submitValue = async (event) => {
        event.preventDefault();
        let error = await validateAddRecipes(name,image,prepareTime,portions,description);
    
        setWriteError(error);
      
       
       if(Object.keys(error).length !== 0){
          return;
       }
       const inputResult = {
           'name' : name,
           'image' : image,
           'prepareTime' : prepareTime,
           'portions' : portions,
           'description': description
       }
       
       
       try {
         await db.ref('recipes/' + recipeId).update({
           ...inputResult
         });
        history.push(`/preview-recipe/${recipeId}`);
         
       } catch (error) {
        setWriteError(error.message);
        console.log(writeError);
       }
       
   }
     

      useEffect(() => {
        let isSubscribed = true;
        
        try { 
        db.ref("recipes").on("value", snapshot => {
            let recipes = [];
            snapshot.forEach((snap) => {
                let _id = snap.ref_.path.pieces_[1];
                if(_id === recipeId){
              recipes.push(snap.val())
            }
            });
           
           if(isSubscribed && recipes.length > 0){

            setName(recipes[0].name);
            setImage(recipes[0].image);
            setPrepareTime(recipes[0].prepareTime);
            setPortions(recipes[0].portions);
            setDescription(recipes[0].description);
            setCreatorId(recipes[0].uid);
           }

          });
        } catch (error) {
          setWriteError(error.message);
        }
         return () => (isSubscribed = false)
      }, []);

    return (
        user.uid !== creatorId ? <h2>You don't own this recipe! and can't edit</h2> :  
           <Container className='col-md-6 mt-3'>
        <Form className={styles.bdForm} onSubmit={submitValue}>
        <Form.Group controlId="name">
        <Form.Label>Име</Form.Label>
        <Form.Control isInvalid={writeError.name !== undefined} placeholder="Въведи име..." name="name" type="text" onChange={e => setName(e.target.value)} value={name} />
        {writeError.name !== undefined ? writeError.name.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>
        <Form.Group controlId="image">
        <Form.Label>Снимка</Form.Label>
        <Form.Control isInvalid={writeError.image !== undefined} placeholder="Въведи снимка..." name="image" type="text" onChange={e => setImage(e.target.value)} value={image} />
        {writeError.image !== undefined ? writeError.image.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>

        <Form.Group controlId="prepareTime">
        <Form.Label>Време за приготвяне</Form.Label>
        <Form.Control isInvalid={writeError.prepareTime !== undefined} placeholder="Време за приготвяне..." name="prepareTime" type="number" onChange={e => setPrepareTime(e.target.value)} value={prepareTime} />
        {writeError.prepareTime !== undefined ? writeError.prepareTime.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>

        <Form.Group controlId="portions">
        <Form.Label>Порции</Form.Label>
        <Form.Control isInvalid={writeError.portions !== undefined} placeholder="Въведи порции..." name="portions" type="number" onChange={e => setPortions(e.target.value)} value={portions} />
        {writeError.portions !== undefined ? writeError.portions.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>
 
        <Form.Group controlId="description">
        <Form.Label>Описание</Form.Label>
        <Form.Control isInvalid={writeError.description !== undefined} placeholder="Въведи описание..." name="description" type="text" onChange={e => setDescription(e.target.value)} value={description} />
        {writeError.description !== undefined ? writeError.description.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>
 
 
 
{/* {writeError ? <p>{writeError}</p> : null} */}
<Button type="submit">Изпрати</Button>
</Form>
</Container>
     )
}

export default EditRecipe