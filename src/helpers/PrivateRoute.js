import {
  Route,
  Redirect,
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
function PrivateRoute({ component: Component, authenticated, ...rest }) {
  const history = useHistory();
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
      />
    )
  }

export default PrivateRoute;