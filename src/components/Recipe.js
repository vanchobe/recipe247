import React from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

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
export default Recipe