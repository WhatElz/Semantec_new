import "./Startseite.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlinePlayCircle } from "react-icons/md";

const Startseite = ({ isAdmin }) => {
  return (
    <div className="page-content">
      <div id="sysInsight-heading">SysInsight</div>
      <Button as={Link} to="/fragebogen" id="sysInsight-startknopf">
        <MdOutlinePlayCircle size={50} /> Ersteinschätzung durchführen
      </Button>
    </div>
  );
};
export default Startseite;
