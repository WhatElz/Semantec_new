import React from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import './Einzelmetrik.css'; 

const Einzelmetrik = ({ title, value }) => {
  let metricColorClass = '';
  if (value >= 8) {
    metricColorClass = 'high';
  } else if (value >= 5) {
    metricColorClass = 'medium';
  } else {
    metricColorClass = 'low';
  }

  return (
    <Card className={`einzelmetrik ${metricColorClass} mb-4`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{`Bewertung: ${value}/10`}</Card.Text>
        <ProgressBar now={(value / 10) * 100} />
      </Card.Body>
    </Card>
  );
};

export default Einzelmetrik;
