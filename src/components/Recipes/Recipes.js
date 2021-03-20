import style from './Recipes.module.css';
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from '../Recipe/Recipe';
import ReactPaginate from 'react-paginate';
import { Row, Col, Button } from 'react-bootstrap'; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faBirthdayCake, faCookie, faStroopwafel } from '@fortawesome/free-solid-svg-icons'

const allIcon = <FontAwesomeIcon icon={faUtensils} />;
const cakeIcon = <FontAwesomeIcon icon={faBirthdayCake} />;
const cookieIcon = <FontAwesomeIcon icon={faCookie} />;
const waffelIcon = <FontAwesomeIcon icon={faStroopwafel} />;

const Recipes = props => {
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const loadRecipes = (isSubscribed, type) => {
      try {
        
       if(type === 'all'){
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
       } else {
        db.ref("recipes")
        .orderByChild('category')
        .equalTo(`${type}`) 
        .on("value", snapshot => {
          let recipes = [];
          snapshot.forEach((snap) => {
          
            let _id = snap.ref_.path.pieces_[1];
            recipes.push({...snap.val(), _id});
            
          });
          if(isSubscribed){
          setRecipes( recipes.reverse() );
          }
          
        });
       }
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
        loadRecipes(isSubscribed, 'all');
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
            ));
      const pageCount = Math.ceil(recipes.length / PER_PAGE);
      function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div>
           <div className={style.recipesContainer}>
           <div className='mt-2 d-flex justify-content-center'>
           <Button onClick={() => loadRecipes(true,'all')} className={style.categoryButton} variant="danger">{allIcon} Всички</Button>
           <Button onClick={() => loadRecipes(true,'cakes')} className={style.categoryButton + ' ml-2'} variant="danger">{cakeIcon} Торти</Button>
           <Button onClick={() => loadRecipes(true,'sweets')} className={style.categoryButton + ' ml-2'} variant="danger">{waffelIcon} Сладкиши</Button>
           <Button onClick={() => loadRecipes(true,'sweetsbiscuits')} className={style.categoryButton + ' ml-2'} variant="danger">{cookieIcon} Сладки и Бисквити</Button>
           </div>
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
        {(currentPageRecipes.length > 0) ? currentPageRecipes : 
        <Loader className="recipes-loader" type="Bars" color="#242582" height={80} width={80} /> 
        }
      </div>
        </div>
    )
}

export default Recipes