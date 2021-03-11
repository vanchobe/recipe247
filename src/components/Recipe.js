import React from 'react'
import PropTypes from 'prop-types'

const Recipe = ({name, image, prepareTime, portions, description}) => {
    return (
        <div>
            <p>Recipe name : {name}</p>
            <p>{image}</p>
            <p>Prepare Time: {prepareTime}</p>
            <p>Portions: {portions}</p>
            <p>How to: {description}</p>
        </div>
    )
}

Recipe.propTypes = {

}

export default Recipe
