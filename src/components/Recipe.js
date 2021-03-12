import React from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import RecipeDetails from '../components/RecipeDetails';
import PrivateRoute from '../helpers/PrivateRoute';

const Recipe = ({name, image, prepareTime, portions, description, _id}) => {
    return (
        <div>
           
            
            <p><Link to={`/preview-recipe/${_id}`}>  Recipe name : {name}</Link></p>
            <p><img src={image}/></p>
            <p>Prepare Time: {prepareTime}</p>
            <p>Portions: {portions}</p>
            <p>How to: {description}</p>
             
        </div>
    )
}

Recipe.propTypes = {

}

export default Recipe
