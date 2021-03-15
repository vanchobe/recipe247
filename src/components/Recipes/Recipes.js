import style from './Recipes.module.css';
import { auth } from "../../services/firebase";
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from '../Recipe/Recipe';
import ReactPaginate from 'react-paginate';
import { Row, Col } from 'react-bootstrap'; 

const Recipes = props => {
    const [user, setUser] = useState(auth().currentUser);
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);


    const loadRecipes = (isSubscribed) => {
      try {
        db.ref("recipes").on("value", snapshot => {
          let recipes = [];
          snapshot.forEach((snap) => {
          
            let _id = snap.ref_.path.pieces_[1];
            recipes.push({...snap.val(), _id});
            
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
        if(isSubscribed){
        setReadError(null)
        }
        loadRecipes(isSubscribed);
        return () => (isSubscribed = false)
      }, []);

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
          
         
           
     
        
           ;
      const pageCount = Math.ceil(recipes.length / PER_PAGE);
      function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    
    return (
        <div>
           <div className={style.recipesContainer}>
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
        {currentPageRecipes}
      </div>
        </div>
    )
}

export default Recipes