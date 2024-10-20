import "../App.css";
import Cardss from "./Cardss";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="glassbody">
        <div className="navbar">
          <h1>Heritage Pass </h1>
          <div className="Sign-In">
            <div className="signin1">
              <Link to="/SignIn">
                <button>
                  Sign Up <CiLogin />
                </button>
              </Link>
            </div>
            <div className="signin2">
              <Link to="/Register">
                <button>
                  Register <FaUserFriends />{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="glass">
          <h1>Reserve Your Adventure!</h1>
          <h4>Culture Awaits</h4>
          <button className="ticket">Book Tickets</button>
        </div>
      </div>
      <h1 className="card-heading">View Meuseums / Monuments</h1>
      <Cardss />
    </>
  );
};

export default Home;
