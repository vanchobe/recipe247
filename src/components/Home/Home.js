import { Jumbotron, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = props => {
    return (
        <Container>
            <Jumbotron>
  <h1>Добре дошли в света на рецептите</h1>
  <p>
    Станете част от нашата общонст. Започнете още от днес, като добавите вашата първа рецепта.
  </p>
  <p>
    <Button as={Link} to='/add-recipe' variant="primary">Добави рецепта</Button>
  </p>
</Jumbotron>
        </Container>
    )
}

export default Home