import "../App.css";
import Cardss from "./Cardss";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
// import SearchBar from "./SearchBar";

const Home = () => {
  return (
    <>
      <div className="glassbody">
        {/* <img src="Images/taj1.png" alt="Tajj" /> */}
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
                  Register <FaUserFriends />
                </button>
              </Link>
            </div>
          </div>
          {/* <button>Information</button> */}
        </div>
        <div className="glass">
          <h1>Reserve Your Adventure!</h1>
          <h4>Book Tickets </h4>
        </div>
      </div>
      <h1 className="card-heading">View Meuseums / Monuments</h1>
      <Cardss />
      {/* <ToggleImage  /> */}
    </>
  );
};

export default Home;
