import "./Auswertung.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Gesamtmetrik from "./Gesamtmetrik";
import Einzelmetrik from "./Einzelmetrik";
import Unternehmensangebot from "./Unternehmensangebot";
import { Container, Row, Col, Button } from "react-bootstrap";
import SecurityIcon from "../../imgs/Security.png";
import OfficeToolsIcon from "../../imgs/OfficeTools.png";
import KommunikationsToolsIcon from "../../imgs/KommunikationsTools.png";
import { MdOutlineLocalOffer } from "react-icons/md";

const Auswertung = ({ isAdmin }) => {
  const navigate = useNavigate();

  const [gesamtmetrikWert, setGesamtmetrikWert] = useState(70);
  const [einzelmetriken, setEinzelmetriken] = useState([
    { id: 1, title: "Security", value: 7 },
    { id: 2, title: "Office-Tools", value: 8 },
    { id: 3, title: "Kommunikations-Tools", value: 2 },
  ]);
  const [unternehmensangebote, setUnternehmensangebote] = useState([
    {
      id: 1,
      title: "Mit uns sind ihre Daten sicher",
      description:
        "Unsere Sicherheitslösungen bieten Schutz vor Datenverlust, Cyberangriffen und unbefugtem Zugriff, indem sie fortschrittliche Technologien wie Firewalls, Verschlüsselung und Zugriffssteuerung integrieren. Wir unterstützen Unternehmen dabei, ihre IT-Infrastruktur sicher zu gestalten und Compliance-Anforderungen zu erfüllen.",
      image: SecurityIcon,
    },

    {
      id: 2,
      title: "Steigern Sie Ihre Produktivität",
      description:
        "Mit unseren Büroanwendungen können Unternehmen effizient arbeiten, Dokumente erstellen, Tabellenkalkulationen durchführen und Präsentationen erstellen. Unsere maßgeschneiderten Lösungen bieten flexible und benutzerfreundliche Tools wie Microsoft Office, Google Workspace und weitere, um die Produktivität und Zusammenarbeit im Büro zu maximieren.",
      image: OfficeToolsIcon,
    },
    {
      id: 3,
      title: "Immer und überall verbunden",
      description:
        "Unsere Kommunikationslösungen erleichtern die Zusammenarbeit und den Austausch von Informationen zwischen Teammitgliedern. Mit Messaging-Apps, Videokonferenzplattformen und E-Mail-Clients ermöglichen wir nahtlose Kommunikation und Zusammenarbeit, unabhängig von Standorten und Geräten.",
      image: KommunikationsToolsIcon,
    },
  ]);

  return (
    <Container className="page-container">
      <h1 className="mb-4">Ihre personalisierte Auswertung</h1>
      <Row>
        <Col md={12}>
          <Gesamtmetrik value={gesamtmetrikWert} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={5}></Col>
        <Col md={7}>
          <h1>Unsere Lösungen (Sind das schon Lösungen?)</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        {einzelmetriken.map((metrik, index) => (
          <React.Fragment key={index}>
            <Col md={5}>
              <Einzelmetrik title={metrik.title} value={metrik.value} />
            </Col>
            <Col md={7} className="mt-4 mt-md-0">
              <Unternehmensangebot
                key={unternehmensangebote[index].id}
                angebot={unternehmensangebote[index]}
              />
            </Col>
          </React.Fragment>
        ))}
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => navigate("/angebotseite")}
            className="zurAngebotseite"
          >
            <MdOutlineLocalOffer size={30} /> Zu Ihren personalisierten
            Angeboten
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Auswertung;
