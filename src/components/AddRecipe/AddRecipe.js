import { useState } from 'react'

import { auth, db } from '../../services/firebase'

import { useHistory } from 'react-router-dom';

import styles from './AddRecipe.module.css';

import { Container, Form, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faGripHorizontal, faClock, faFileSignature, faBreadSlice } from '@fortawesome/free-solid-svg-icons'

const nameIcon = <FontAwesomeIcon icon={faBreadSlice} />;
const imageIcon = <FontAwesomeIcon icon={faImage} />;
const portionsIcon = <FontAwesomeIcon icon={faGripHorizontal} />;
const prepareTimeIcon = <FontAwesomeIcon icon={faClock} />;
const howToCookIcon = <FontAwesomeIcon icon={faFileSignature} />;

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
           <Form.Control placeholder="Въведи име..." name="name" type="text" onChange={e => setName(e.target.value)} value={name} />
           <Form.Text className="text-muted">
                 Кратко име на рецептата
            </Form.Text>
        </Form.Group>
        
        <Form.Group controlId="image">
        <Form.Label>{imageIcon} Снимка</Form.Label>
           <Form.Control placeholder="Въведи снимка..." name="image" type="text" onChange={e => setImage(e.target.value)} value={image} />
        </Form.Group>

        <Form.Group controlId="prepareTime">
        <Form.Label>{prepareTimeIcon} Време за приготвяне</Form.Label>
           <Form.Control placeholder="Време за приготвяне..." name="prepareTime" type="number" onChange={e => setPrepareTime(e.target.value)} value={prepareTime} />
        </Form.Group>

        <Form.Group controlId="portions">
        <Form.Label>{portionsIcon} Порции</Form.Label>
           <Form.Control placeholder="Въведи порции..." name="portions" type="number" onChange={e => setPortions(e.target.value)} value={portions} />
        </Form.Group>
          
        <Form.Group controlId="description">
        <Form.Label>{howToCookIcon} Описание</Form.Label>
           <Form.Control placeholder="Въведи описание..." name="description" type="text" onChange={e => setDescription(e.target.value)} value={description} />
        </Form.Group>
        
          
         {writeError ? <p>{writeError}</p> : null}
         <Button variant="primary" type="submit">
             Добави рецептата
          </Button>
       </Form>
       </Container>
    )
}

export default AddRecipe