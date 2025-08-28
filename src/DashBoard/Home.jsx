import "../App.css";
import Cardss from "./Cardss";
import { useRef } from "react";
import { CiLogin } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  // 👇 create a ref for the Cardss section
  const cardsRef = useRef(null);

  const handleScrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="glassbody">
        <div className="navbar">
          <h1>Heritage Pass </h1>
          <div className="Sign-In">
            <div>
              {/* 👇 Instead of routing, trigger scroll */}
              <button className="btn-primary" onClick={handleScrollToCards}>
                Information <CiLogin />
              </button>
            </div>
            <div>
              <Link to="/Register">
                <button className="btn-primary">
                  Register <FaUserFriends />
                </button>
              </Link>
            </div>
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
