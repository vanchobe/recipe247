import { useState } from 'react';
import { auth, db } from '../../services/firebase';
import { useHistory } from 'react-router-dom';
import styles from './AddRecipe.module.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faGripHorizontal, faClock, faFileSignature, faBreadSlice, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import validateAddRecipes from '../../helpers/validateAddRecipes';

const nameIcon = <FontAwesomeIcon icon={faBreadSlice} />;
const imageIcon = <FontAwesomeIcon icon={faImage} />;
const portionsIcon = <FontAwesomeIcon icon={faGripHorizontal} />;
const prepareTimeIcon = <FontAwesomeIcon icon={faClock} />;
const howToCookIcon = <FontAwesomeIcon icon={faFileSignature} />;
const categoryIcon = <FontAwesomeIcon icon={faFolderOpen} />;

const AddRecipe = ({ logout, authenticated }) => {
  
  const [user, setUser] = useState(auth().currentUser);

   const [writeError, setWriteError] = useState({});
   const [name, setName] = useState('');
   const [category, setCategory] = useState('');
   const [image, setImage] = useState('');
   const [prepareTime, setPrepareTime] = useState(0);
   const [portions, setPortions] = useState(1);
   const [description, setDescription] = useState('');

   const history = useHistory();

   const submitValue = async (event) => {
     let isSubscribed = true;
     event.preventDefault();
     let error = await validateAddRecipes(name,image,prepareTime,portions,description,category);
    
      setWriteError(error);

     if(Object.keys(error).length !== 0){
        return;
     }
    const inputResult = {
        'name' : name,
        'category' : category,
        'image' : image,
        'prepareTime' : prepareTime,
        'portions' : portions,
        'description': description,
        'hearts': [user.uid]
    }
    try {
      await db.ref("recipes").push({
        ...inputResult,
        timestamp: Date.now(),
        uid: user.uid,
        creatorEmail: user.email
      });
      isSubscribed = false;
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

    return (
      <Container className='col-md-6 mt-3'>
      <Form onSubmit={submitValue} className={styles.bdForm}>
        <Form.Group controlId="name">
        <Form.Label>{nameIcon} Име</Form.Label>
           <Form.Control isInvalid={writeError.name !== undefined} placeholder="Въведи име..." name="name" type="text" onChange={e => setName(e.target.value)} value={name} />
            {writeError.name !== undefined ? writeError.name.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>

        <Form.Group controlId="category">
       <Form.Label>{categoryIcon} Категория</Form.Label>
         <Form.Control as="select" onChange={e => setCategory(e.target.value)} custom>
            <option defaultValue value="">Избери категория...</option>  
            <option value="cakes">Торти</option>
            <option value="sweets">Сладкиши</option>
            <option value="sweetsbiscuits">Сладки и Бисквити</option>
         </Form.Control>
         {writeError.category !== undefined ? writeError.category.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
         </Form.Group>
        
        <Form.Group controlId="image">
        <Form.Label>{imageIcon} Снимка</Form.Label>
           <Form.Control isInvalid={writeError.image !== undefined} placeholder="Въведи снимка..." name="image" type="text" onChange={e => setImage(e.target.value)} value={image} />
           {writeError.image !== undefined ? writeError.image.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>

        <Form.Group controlId="prepareTime">
        <Form.Label>{prepareTimeIcon} Време за приготвяне</Form.Label>
           <Form.Control isInvalid={writeError.prepareTime !== undefined} placeholder="Време за приготвяне..." name="prepareTime" type="number" onChange={e => setPrepareTime(e.target.value)} value={prepareTime} />
           {writeError.prepareTime !== undefined ? writeError.prepareTime.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>

        <Form.Group controlId="portions">
        <Form.Label>{portionsIcon} Порции</Form.Label>
           <Form.Control isInvalid={writeError.portions !== undefined} placeholder="Въведи порции..." name="portions" type="number" onChange={e => setPortions(e.target.value)} value={portions} />
           {writeError.portions !== undefined ? writeError.portions.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>
          
        <Form.Group controlId="description">
        <Form.Label>{howToCookIcon} Описание</Form.Label>
           <Form.Control isInvalid={writeError.description !== undefined}  placeholder="Въведи описание..." name="description" type="text" onChange={e => setDescription(e.target.value)} value={description} />
           {writeError.description !== undefined ? writeError.description.map((error, index) => <Alert key={index} variant="danger mt-1">{error}</Alert>) : ''}
        </Form.Group>
        
         <Button variant="primary" type="submit">
             Добави рецептата
          </Button>
       </Form>
       </Container>
    )
}
export default AddRecipe
