import "../App.css";
import Cardss from "./Cardss";
import { useRef, useEffect, useContext } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";

const Home = () => {
  // 👇 create a ref for the Cardss section
  const cardsRef = useRef(null);

  const handleScrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const location = useLocation();
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="glassbody">
        <div className="navbar">
          <h1>Heritage Pass </h1>
          <div className="Sign-In">
            {!user && (
              <div>
                <Link to="/Register">
                  <button className="btn-primary">
                    Register <FaUserFriends />
                  </button>
                </Link>
              </div>
            )}
            {user && (
              <div
                className="user-info"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Profile"
                  style={{ width: 32, height: 32, borderRadius: "50%" }}
                />
                <span style={{ fontWeight: "bold" }}>{user.firstName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="glass">
          <h1>Reserve Your Adventure!</h1>
          <h4>Culture Awaits</h4>
          <Link to="/BookTicket">
            <button className="btn-primary">Book Tickets</button>
          </Link>
        </div>

        {/* 🔽 Animated Down Arrow */}
        <div className="scroll-down">
          <span></span>
        </div>
      </div>

      <h1 className="card-heading">View Museums / Monuments</h1>

      {/* 👇 Attach the ref here */}
      <div ref={cardsRef}>
        <Cardss />
      </div>
    </>
  );
};

export default Home;
