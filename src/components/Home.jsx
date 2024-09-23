// import React from 'react';
// import "./Home.css"



// const Home = () => {
//   return (
//     <div className='tajdiv'>
//       {/* <img className='taj' src="taj.png" alt="taj" /> */}
//     </div>
//   )
// }

// export default Home

// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';

// function GridExample() {
//   return (
//     <Row xs={1} md={3} className="g-4">
//       {Array.from({ length: 6 }).map((_, idx) => (
//         <Col key={idx}>
//           <Card>
//             <Card.Img variant="top" src="taj.png" style={{ width: '100%', height: '400px' }}/>
//             <Card.Body>
//               <Card.Title>Card title</Card.Title>
//               <Card.Text>
//                 This is a longer card with supporting text below as a natural
//                 lead-in to additional content. This content is a little bit
//                 longer.
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }

// export default GridExample;


// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import "../App.css"
import Cardss from "./Cardss";


const Home = ()=> {
  return (
    <>
    <img className='taj-img' src="taj1.png" alt="taj" />
    <h1 className='card-heading'>View Meuseums / Monuments</h1>
    <Cardss />
    </>
  );
}

export default Home;

