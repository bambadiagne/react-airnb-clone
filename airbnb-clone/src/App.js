import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from './components/Signup/SignUp';
import SignIn from './components/Signin/SignIn';

function App() {
  return (
    <div className="" >
      <Router>
     <Navbar/>
     <div className="justify-content-center">
          <Switch>
            <Route exact path={"/signup"} component={()=><SignUp/>} />
            <Route exact path="/signin" component={SignIn} />
           </Switch>
        </div>
     </Router>
    </div>
  );
}

export default App;
