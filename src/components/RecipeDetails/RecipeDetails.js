import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { loadAllRecipes } from '../../services/recipeService';
import { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import {Card, Button, Container, Row, Col} from 'react-bootstrap';
import styles from './RecipeDetails.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFileSignature, faGripHorizontal, faUser, faEdit, faTrash, faFolderOpen, faBreadSlice, faHeart } from '@fortawesome/free-solid-svg-icons'

const portionsIcon = <FontAwesomeIcon icon={faGripHorizontal} />
const prepareTimeIcon = <FontAwesomeIcon icon={faClock} />
const howToCookIcon = <FontAwesomeIcon icon={faFileSignature} />
const userIcon = <FontAwesomeIcon icon={faUser} />
const editIcon = <FontAwesomeIcon icon={faEdit} />
const deleteIcon = <FontAwesomeIcon icon={faTrash} />
const categoryIcon = <FontAwesomeIcon icon={faFolderOpen} />;
const recipeNameIcon = <FontAwesomeIcon className={styles.recipeNameIcon} icon={faBreadSlice} />;
const heartIcon = <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />;
const heartLikedIcon = <FontAwesomeIcon className={styles.heartLiked} icon={faHeart} />;

const RecipeDetails = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [creatorId, setCreatorId] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    const { recipeId } = useParams();

    const fetchRecipe = async (isSubscribed) => {
      try { 
          let snapshot = await loadAllRecipes();
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
           setIsLiked(recipes[0].hearts.find(x => x === user.uid))
               }
           }
       } catch (error) {
         setReadError(error.message);
       }
    }
    
      useEffect(() => {
        let isSubscribed = true;
         
        fetchRecipe(isSubscribed);

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
      sweets: '????????????????',
      cakes: '??????????',
      sweetsbiscuits: '???????????? ?? ????????????????'
    }
    const likeHandler = async (event) => {
      event.preventDefault();
      let isSubscribed = true;
      let hearts = recipes[0].hearts;
      if(hearts.find(x => x === user.uid) !== user.uid){
      hearts.push(user.uid);
      }
     const inputResult = {
         'hearts': hearts,
     }
     try {
       await db.ref('recipes/' + recipeId).update({
         ...inputResult
       });
       fetchRecipe(isSubscribed)
     } catch (error) {
      
     }
 }
 
    return (
           <Container className="mt-2 d-flex justify-content-center">
        {recipes.map((recipe, index) => {
          return   <Card key={index} className={styles.cardContainer}>
              <Card.Img variant="top" src={recipe.image} />  
              <Card.Body className={styles.imageOverlay}>
              <Card.Title className={styles.recipeTitle}>{recipeNameIcon} {recipe.name}</Card.Title>
              <Card.Text>{isLiked ? heartLikedIcon : heartIcon}  {recipe.hearts.length} {isLiked ? <Button className={styles.likedButton} disabled>????????????????</Button> : <Button className={styles.likeButton} onClick={likeHandler}>??????????????</Button>}</Card.Text>
              <Card.Text>{categoryIcon} ??????????????????: {showCategory[recipe.category]}</Card.Text>
              <Card.Text>{prepareTimeIcon} {recipe.prepareTime} ????????????</Card.Text>
              <Card.Text>{portionsIcon} {recipe.portions} {recipe.portions > 1 ? '????????????' : '????????????'}</Card.Text>
              <Card.Text>{howToCookIcon} {recipe.description}</Card.Text>
              
            <Row className="mb-2">  
          {user.uid === creatorId ? <Col><Button as={Link} to={`/edit-recipe/${recipe._id}`}>{editIcon} ????????????????????</Button></Col> : ''}
          {user.uid === creatorId ? <Col>
            <Button variant="primary" onClick={() => deleteRecipe(recipe._id)}>
            {deleteIcon} ????????????
            </Button>
            </Col> : ''}
              </Row>
              <Card.Footer>
              <p>???????????????? ????: {user.uid === creatorId ? <Link className={styles.creatorName} to={`/profile/${recipe.uid}`}>{userIcon} {recipe.creatorEmail}</Link> : <Link className={styles.creatorName} to={`/user-profile/${recipe.uid}`}>{recipe.creatorEmail}</Link>}</p>
              </Card.Footer>
              </Card.Body>
          </Card>
        })}
      </Container>
    )
}
export default RecipeDetails
