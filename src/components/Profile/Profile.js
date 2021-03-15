import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from '../Recipe/Recipe';
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Row, Col } from 'react-bootstrap';


const Profile = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const locationUrl = useLocation().pathname;
    const currentUserProfileId = locationUrl.substring(locationUrl.indexOf("/") + 9);
    



    const loadRecipes = (isSubscribed) => {
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
    }


      useEffect(() => {
        let isSubscribed = true;
        loadRecipes(isSubscribed)
        
        return () => (isSubscribed = false)
      }, []);
      
      let creatorEmail = '';
      if(recipes.length > 0 && recipes[0].creatorEmail){
        creatorEmail = recipes[0].creatorEmail
      }
       
      let myRecipes = currentUserProfileId === user.uid ? <h1>My Recipes</h1> : <h1>User {creatorEmail} recipes</h1>
      let whoOwnRecipes = currentUserProfileId === user.uid ? 'You don\'t' : 'This user don\'t' ; 

      const PER_PAGE = 3;
      const COLS_PER_ROW = 3;
      const offset = currentPage * PER_PAGE;
      let pagingRecipes = [...recipes];
      const currentPageRecipes = pagingRecipes
          .slice(offset, offset + PER_PAGE)
          .reduce(
              (rows, key, index) =>
                (index % COLS_PER_ROW === 0
                  ? rows.push([key])
                  : rows[rows.length - 1].push(key)) && rows,
              []
            )
            .map((items, index) =>  (
              <Row key={index}>
                {items.map(item =>  (
                  
                  <Col  key={item._id} lg={3}>
                  <Recipe
                       key={item._id}
                      _id={item._id}
                      name={item.name}
                      image= {item.image}
                      prepareTime = {item.prepareTime}
                      portions = {item.portions}
                      description = {item.description}
                      />
                  </Col>
                ))}
              </Row>
            ))
            const pageCount = Math.ceil(recipes.length / PER_PAGE);
            function handlePageClick({ selected: selectedPage }) {
              setCurrentPage(selectedPage);
          }
    return  recipes.length === 0 ? <p>{whoOwnRecipes} have recipes yet! <Link to='/add-recipe'>Add recipe</Link></p> : 
    (
        <div>
            <p>Email: {user.email}</p>
            <p>Total Recipes Added: {recipes.length}</p>
          {myRecipes}
           <div className="recipes">
           <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
        {currentPageRecipes}
      </div>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
        </div>
    )
}

export default Profile