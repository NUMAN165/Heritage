import { Container, Navbar } from "react-bootstrap";
import "../App.css";
import Cardss from "./Cardss";
import { Link } from "react-router-dom";
// import SignIn from "../SignIn";



const Home = () => {
  return (
    <>
      <Navbar expand="lg" className="navbarMain">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar">
            Heritage Pass
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="glassbody">
        <div className="glass">
          {/* <img className='taj-img' src="./Images/taj1.png" alt="taj" /> */}
          <h1>Welcome!</h1>
          <h4>To Heritage Pass </h4>
          {/* <SignIn /> */}
          <Link to="/SignIn">
            <button>Sign Up</button>
          </Link>
          <p>Visit Meusems and Monuments</p>
        </div>
      </div>
      <h1 className="card-heading">View Meuseums / Monuments</h1>
      <Cardss />
    </>
  );
};

export default Home;
