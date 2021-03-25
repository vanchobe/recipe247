import { loadAllRecipes } from '../../services/recipeService';
import { useState, useEffect } from 'react';
import  Recipe  from '../Recipe/Recipe';
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Row, Col } from 'react-bootstrap';
import styles from './UserProfile.module.css';

const UserProfile = props => {
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const locationUrl = useLocation().pathname;
    const currentUserProfileId = locationUrl.substring(locationUrl.indexOf("/") + 14);
  
    async function fetchUserRecipes(isSubscribed) {
      try {
      let recipes = [];
      let value =  await loadAllRecipes();
      value.forEach((snap) => {
        let _id = snap.ref_.path.pieces_[1];
        if(snap.val().uid === currentUserProfileId){
        recipes.push({...snap.val(), _id});
      }})
      if(isSubscribed){
        setRecipes( recipes.reverse() );
      }
    } catch (error) {
    if(isSubscribed){
    setReadError(error.message);
    }
    }
  }
      useEffect(() => {
        let isSubscribed = true;
        fetchUserRecipes(isSubscribed)
        return () => (isSubscribed = false)
      }, []);
      
      let creatorEmail = '';
      if(recipes.length > 0 && recipes[0].creatorEmail){
        creatorEmail = recipes[0].creatorEmail
      }

      const PER_PAGE = 4;
      const COLS_PER_ROW = 4;
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

          const myProfileBadge = (<div className="container mt-2">
          <div className="row">
            <div className="col-md-12">
              <div className={styles['our-team']}>
                <div className={styles.picture}>
                  <img className="img-fluid" src="/no-picture.jpg" />
                </div>
                <div className={styles['team-content']}>
                  <h3 className={styles.name}>{creatorEmail}</h3>
                  <h4 className={styles.title}>Добавени рецепти: {recipes.length}</h4>
                </div>
              </div>
            </div>    
        </div>
        </div>)
    return  recipes.length === 0 ? <p>Този потребител няма добавени рецепти още! <Link to='/add-recipe'>Добави рецепта</Link></p> : 
    (
        <div>
          <Row> 
            <Col md='3'> {myProfileBadge} </Col>
            <Col  md='9'>
            
        {currentPageRecipes}
        <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination mt-3 justify-content-md-center"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"page-item active"}
        pageLinkClassName={"page-link"}
        breakLabel={3}
      />
        </Col>
        </Row> 
        </div>
    )
}

export default UserProfile
