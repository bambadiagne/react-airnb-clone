import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/Signup/SignUp";
import SignIn from "./components/Signin/SignIn";
import Profile from "./components/Profile/Profile";
import RoomList from "./components/Room/RoomList/RoomList";
import RoomPage from "./components/Room/RoomPage/RoomPage";
import Annonce from "./components/Annonce/Annonce";
import ReservationList from "./components/Reservations/ReservationList/ReservationList";
import "./css/room.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div>
          <Switch>
            <Route exact path={"/signup"} component={() => <SignUp />} />
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/profile"} component={() => <Profile />} />
            <Route exact path={"/rooms"} component={RoomList} />
            <Route exact path={"/rooms/:id"} component={RoomPage} />
            <Route exact path={"/reservations"} component={ReservationList} />
            <Route exact path={"/annonces"} component={Annonce} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
