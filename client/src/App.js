import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/Home"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import Navbar from "./components/Navbar";
import Store from "./store/index";
import Dashboard from "./components/Dashboard";
import "./main.scss";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import NotFound from "./components/NotFound";
import Create from "./components/Create";
import Edit from "./components/Edit";
import EditImage from "./components/EditImage";
import UpdateName from "./components/UpdateName";
import ChangePassword from "./components/ChangePassword";
import Details from "./components/Details";
function App() {
  return (
    <>
    <Provider store = {Store}>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact  component={Home} />
          <Route path="/home/:page" exact  component={Home} />
          <Route path="/details/:id" exact  component={Details} />
          <RouteLinks exact path="/register" component={Register} />
          <RouteLinks exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard/:page?" component={Dashboard} />
          <PrivateRoute exact path="/create" component={Create} />
          <PrivateRoute exact path="/edit/:id" component={Edit} />
          <PrivateRoute exact path="/updateImage/:id" component={EditImage} />
          <PrivateRoute exact path="/updateName" component={UpdateName} />
          <PrivateRoute exact path="/updatePassword" component={ChangePassword} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
    </>
  );
}

export default App;
