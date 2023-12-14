import React from "react";
import "./PastEvent.css";
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const PastEvent = ({ title, description, eventDate, idEvento }) => {
  function conectar(idEvento) {
    ;
  }

  const objeto = {
    nomeEvento : title,
    descricao : description,
    dataEvento : eventDate,
    idEvento : idEvento
  }

  return (
    <article className="event-card">
      <h2 className="event-card__title">{title.substr(0, 20)}</h2>

      <p
        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
        className="event-card__description"
      > 
        <Tooltip id={idEvento} className="tootip"/>
        {description.substr(0, 16)}...
      </p>

      <p className="event-card__description">{dateFormatDbToView(eventDate)}</p>
      {/* <p className="event-card__description">{new Date(eventDate).toLocaleDateString()}</p> */}
      {/* <p className="event-card__description">{eventDate.substr(0,10).split("-").reverse().join("/")}</p> */}

      <Link
        to={`/detalhes-evento`}
        state={objeto}
      >
        Detalhes do Evento  
      </Link>
    </article>
  );
};

export default PastEvent;
