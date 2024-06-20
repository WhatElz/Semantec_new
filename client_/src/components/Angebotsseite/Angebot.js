import "./Angebot.css";
import { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { CiMail } from "react-icons/ci";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import { FiPackage } from "react-icons/fi";

const Angebot = ({ data, isAdmin, onEdit, onDelete, onSave }) => {
  const [editMode, setEditMode] = useState(data.name === "" && isAdmin);
  const [editData, setEditData] = useState(data);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editData);
    setEditMode(false);
  };
  return (
    <Card>
      {editMode ? (
        <Card.Body>
          <Form.Control
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <Form.Control
            type="text"
            name="kategorie"
            value={editData.kategorie}
            onChange={handleChange}
            placeholder="Kategorie"
          />
          <Form.Control
            type="number"
            name="score"
            value={editData.score}
            onChange={handleChange}
            placeholder="Score"
          />
          <Form.Control
            as="textarea"
            name="beschreibung"
            value={editData.beschreibung}
            onChange={handleChange}
            placeholder="Beschreibung"
          />
          <Form.Control
            type="text"
            name="bild"
            value={editData.bild}
            onChange={handleChange}
            placeholder="Bild URL"
          />
          <div className="admin-buttons">
            <Button variant="success" onClick={handleSave}>
              <MdSave size={20} /> Speichern
            </Button>{" "}
            <Button variant="danger" onClick={() => setEditMode(false)}>
              Änderungen verwerfen
            </Button>
          </div>
        </Card.Body>
      ) : (
        <>
          <Card.Img variant="top" src={data.bild} className="angebot-img" />
          <FiPackage size={50} className="angebot-icon" />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>Kategorie: {data.kategorie}</Card.Text>
            <Card.Text>Score: {data.score}</Card.Text>
            <Card.Text>Beschreibung: {data.beschreibung}</Card.Text>
            <Button>
              <CiMail size={20} /> Angebot erhalten
            </Button>

            {isAdmin && (
              <>
                <div className="admin-buttons">
                  <Button variant="success" onClick={() => setEditMode(true)}>
                    <MdEdit size={20} />
                  </Button>{" "}
                  <Button variant="success" onClick={() => onDelete(data.id)}>
                    <MdDelete size={20} />
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default Angebot;
