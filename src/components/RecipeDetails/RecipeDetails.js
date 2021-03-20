import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import styles from './RecipeDetails.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFileSignature, faGripHorizontal, faUser, faEdit, faTrash, faFolderOpen, faBreadSlice  } from '@fortawesome/free-solid-svg-icons'

const portionsIcon = <FontAwesomeIcon icon={faGripHorizontal} />
const prepareTimeIcon = <FontAwesomeIcon icon={faClock} />
const howToCookIcon = <FontAwesomeIcon icon={faFileSignature} />
const userIcon = <FontAwesomeIcon icon={faUser} />
const editIcon = <FontAwesomeIcon icon={faEdit} />
const deleteIcon = <FontAwesomeIcon icon={faTrash} />
const categoryIcon = <FontAwesomeIcon icon={faFolderOpen} />;
const recipeNameIcon = <FontAwesomeIcon className={styles.recipeNameIcon} icon={faBreadSlice} />;

const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
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
           
            if(isSubscribed){
                if(recipes.length > 0){
            setRecipes( recipes );
            setCreatorId(recipes[0].uid);
                }
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
          history.push(`/profile/${user.uid}`);
          return null;
        })
        .catch((error)=>{ setReadError(error.message)})
    }
    const showCategory = {
      sweets: 'Сладкиши',
      cakes: 'Торти',
      sweetsbiscuits: 'Сладки и Бисквити'
    }
    return (
           <Container className="mt-2 d-flex justify-content-center">
        {recipes.map((recipe, index) => {
          return   <Card key={index} className={styles.cardContainer}>
              <Card.Img variant="top" src={recipe.image} />  
              <Card.Body className={styles.imageOverlay}>
              <Card.Title className={styles.recipeTitle}>{recipeNameIcon} {recipe.name}</Card.Title>
              <Card.Text>{categoryIcon} Категория: {showCategory[recipe.category]}</Card.Text>
              <Card.Text>{prepareTimeIcon} {recipe.prepareTime} минути</Card.Text>
              <Card.Text>{portionsIcon} {recipe.portions} {recipe.portions > 1 ? 'порции' : 'порция'}</Card.Text>
              <Card.Text>{howToCookIcon} {recipe.description}</Card.Text>
              
            <Row className="mb-2">  
          {user.uid === creatorId ? <Col><Button as={Link} to={`/edit-recipe/${recipe._id}`}>{editIcon} Редактирай</Button></Col> : ''}
          {user.uid === creatorId ? <Col>
            <Button variant="primary" onClick={() => deleteRecipe(recipe._id)}>
            {deleteIcon} Изтрии
            </Button>
            </Col> : ''}
              </Row>
              <Card.Footer>
              <p>Добавена от: {user.uid === creatorId ? <Link className={styles.creatorName} to={`/profile/${recipe.uid}`}>{userIcon} {recipe.creatorEmail}</Link> : <Link className={styles.creatorName} to={`/user-profile/${recipe.uid}`}>{recipe.creatorEmail}</Link>}</p>
              </Card.Footer>
              </Card.Body>
          </Card>
        })}
      </Container>
    )
}
export default Recipes
