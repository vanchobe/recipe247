import style from './SearchRecipes.module.css';
import { db } from "../../services/firebase"
import { useState, useEffect } from 'react';
import  Recipe  from '../Recipe/Recipe';
import ReactPaginate from 'react-paginate';
import { Row, Col } from 'react-bootstrap'; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import SearchBar from '../SearchBar/SearchBar';

const SearchRecipes = props => {
    const [recipes, setRecipes] = useState([]);
    const [readError, setReadError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [keyword, setKeyWord] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const loadRecipes = (isSubscribed) => {
      try {
        db.ref("recipes").on("value", snapshot => {
          let recipes = [];
          snapshot.forEach((snap) => {
          
            let _id = snap.ref_.path.pieces_[1];
            recipes.push({...snap.val(), _id});
          });
          if(isSubscribed){
          setRecipes( recipes.reverse());
          
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
      let pagingRecipes = [...filteredRecipes];
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
            
      const pageCount = Math.ceil(filteredRecipes.length / PER_PAGE);
      function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const updateKeyword = async (keyword) => { 
      let isSubscribed = true; 
      let currentRecipes = [...recipes];
      if(isSubscribed){
      setKeyWord(keyword);
      }
      if(keyword !== ''){
      let filtered = currentRecipes.reverse().filter(recipe => {
        return recipe.name.toLowerCase().includes(keyword.toLowerCase())
    }) 
    if(isSubscribed){
      setFilteredRecipes(filtered);
    }
      
  } else {
    if(isSubscribed){
    setFilteredRecipes([]);
    }
  }
    
  return () => (isSubscribed = false)
     }

    return (
        <div> 
           <div className={style.recipesContainer}>
           <SearchBar keyword={keyword} setKeyword={updateKeyword} className='mt-3 d-flex ' />
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

export default SearchRecipes