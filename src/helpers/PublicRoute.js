import {
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === false
          ? <Component {...props} />
          : <Redirect to='/recipes' />}
      />
    )
  }
  export default PublicRoute;