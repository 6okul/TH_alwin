import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/loginScreen";
import RegisterScreen from "./components/registerScreen";
import HomeScreen from "./components/homeScreen";
import PrivateRoute from "./components/routing/privateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <PrivateRoute exact path="/" component={HomeScreen} />
      </Switch>
    </Router>
  );
};

export default App;
