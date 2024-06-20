import "./Unternehmensangebot.css";
import React from "react";
import { Card } from "react-bootstrap";

const Unternehmensangebot = ({ angebot }) => {
  return (
    <Card className="unternehmensangebote mb-4">
      <div className="image-container">
        <img src={angebot.image} alt="Angebot Bild" className="angebot-image" />
      </div>
      <Card.Body>
        <Card.Title>{angebot.title}</Card.Title>
        <Card.Text>{angebot.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Unternehmensangebot;
