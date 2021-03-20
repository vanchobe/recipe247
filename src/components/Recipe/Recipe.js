import React from 'react'
import { Link } from "react-router-dom";
import {Card, Button, Row } from 'react-bootstrap';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faFileSignature, faGripHorizontal, faEye  } from '@fortawesome/free-solid-svg-icons'

const portionsIcon = <FontAwesomeIcon icon={faGripHorizontal} />
const prepareTimeIcon = <FontAwesomeIcon icon={faClock} />
const howToCookIcon = <FontAwesomeIcon icon={faFileSignature} />
const seeRecipeIcon = <FontAwesomeIcon icon={faEye} />

const Recipe = ({name, image, prepareTime, portions, description, _id, index}) => {
    return (
        <Row>
        <Card className='mt-2 mr-2 mb-2' style={{ width: '25rem' }}>
        <Link to={`/preview-recipe/${_id}`} ><Card.Img variant="top" src={image} /></Link>
        <Card.Body>
          <Card.Title>{name.length > 12 ? name.substring(0,12) + '..' : name}</Card.Title>
          <Card.Text>{portionsIcon} {portions} порции</Card.Text>
          <Card.Text>{prepareTimeIcon} {prepareTime} минути</Card.Text>
          <Card.Text>{howToCookIcon} {description.length > 10 ? description.substring(0,10) + '...' : description}</Card.Text>
          <Button as={Link} to={`/preview-recipe/${_id}`} variant="primary">{seeRecipeIcon} Виж</Button>
        </Card.Body>
      </Card>
      </Row>
    )
}
export default Recipe