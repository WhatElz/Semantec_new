import React from "react";
import { ProgressBar, Card } from "react-bootstrap";
import "./Gesamtmetrik.css";

const Gesamtmetrik = ({ value }) => {
  let metricColorClass = "";
  if (value >= 70) {
    metricColorClass = "high";
  } else if (value >= 30) {
    metricColorClass = "medium";
  } else {
    metricColorClass = "low";
  }

  return (
    <Card className={`gesamtmetrik ${metricColorClass}`}>
      <Card.Body>
        <Card.Title>
          Ihr Digital Workplace ist insgesamt: (umschreiben und label
          vergrößern)
        </Card.Title>
        <ProgressBar now={value} label={`${value}%`} />
      </Card.Body>
    </Card>
  );
};

export default Gesamtmetrik;
