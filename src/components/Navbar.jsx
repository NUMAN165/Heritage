import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../App.css"
import SignIn from '../SignIn';
import React from 'react';


function Nav() {

  return (
    <Navbar expand="lg" className="navbarMain">
      <Container>
        <Navbar.Brand className='navbar'>Heritage Pass</Navbar.Brand>
        <SignIn />                                                                    
      </Container>                                                                                                                                  
    </Navbar>
  );
} 

export default Nav;
