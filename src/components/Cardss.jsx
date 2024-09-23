import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const Cardss = () => {
  return (
    <>
    
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="taj1.png"/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </>
  )
}

export default Cardss;
