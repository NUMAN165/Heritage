import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../App.css";

const cardData = [
  { id: 1, title: "Taj Mahal", imgSrc: "./Images/taj1.png" },
  { id: 2, title: "Qutub Minar", imgSrc: "./Images/qutub.png" },
  { id: 3, title: "Albert Hall Meuseum", imgSrc: "./Images/alberthall.png" },
];

const cardData2 = [
  { id: 4, title: "Humayuns Tomb", imgSrc: "./Images/humayans.png" },
  { id: 5, title: "Ajanta Caves", imgSrc: "./Images/Ajanta.png" },
  { id: 6, title: "Patna Meusems", imgSrc: "./Images/Patna.png" },
];

const Cardss = () => {
  return (
    <>
      <div className="cardss">
        {cardData.map((card) => (
          <Card key={card.id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={card.imgSrc}
              style={{ height: "25vh" }}
            />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="cards2">
        {cardData2.map((card) => (
          <Card key={card.id} style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={card.imgSrc}
              style={{ height: "25vh" }}
            />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Button variant="primary">Go</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cardss;
