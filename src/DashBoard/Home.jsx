import "../App.css";
import Cardss from "./Cardss";
import { Link } from "react-router-dom";
// import SignIn from "../SignIn";

const Home = () => {
  return (
    <>
      <div className="glassbody">
        {/* <img src="Images/taj1.png" alt="" /> */}
        <div className="glass">
          <h1>Heritage Pass</h1>
          <h4>Book Tickets</h4>
          <div className="Sign-In">
            <div className="signin1">
              <Link to="/SignIn">
                <button>Sign Up</button>
              </Link>
            </div>
            <div className="signin2">
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="card-heading">View Meuseums / Monuments</h1>
      <Cardss />
    </>
  );
};

export default Home;
