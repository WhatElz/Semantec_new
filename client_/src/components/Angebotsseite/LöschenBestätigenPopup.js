import React from "react";
import { Modal, Button } from "react-bootstrap";

const LöschenBestätigenPopup = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Löschung des Angebots</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sind Sie sicher, dass Sie dieses Angebot löschen möchten?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Abbrechen
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Löschen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LöschenBestätigenPopup;
