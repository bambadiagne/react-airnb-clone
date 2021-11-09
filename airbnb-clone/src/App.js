import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from './components/Signup/SignUp';
import SignIn from './components/Signin/SignIn';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="container-fluid" >
      <Router>
     <Navbar/>
     <div className="">
          <Switch>
            <Route exact path={"/signup"} component={()=><SignUp/>} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/profile"} component={()=><Profile/>} />
           </Switch>
        </div>
     </Router>
    </div>
  );
}

export default App;
