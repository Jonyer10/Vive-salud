import React from "react";
import Button from "./Button";
import formatDate from "../utils/formatDate";

const CardCita = ({ cita }) => {
  const getEstadoBadge = (estado) => {
    const estadoLower = estado.toLowerCase();
    if (estadoLower.includes("pendiente")) return "badge-pendiente";
    if (estadoLower.includes("completada")) return "badge-completada";
    return "badge-cancelada";
  };

  return (
    <div className="card-cita flex items-center justify-between transition-smooth">
      {/* Información de la cita */}
      <div className="flex-1">
        <h3 className="text-subtitle mb-1">{cita.medico}</h3>
        <p className="text-body">
          {formatDate(cita.fecha)} - {cita.hora}
        </p>
        <span className={`badge ${getEstadoBadge(cita.estado)} mt-2`}>
          {cita.estado}
        </span>
      </div>

      {/* Botones de acción */}
      <div className="flex items-center space-x-3 ml-4">
        <Button tipo="reschedule" citaId={cita.id} />
        <Button tipo="cancel" citaId={cita.id} />
      </div>
    </div>
  );
};

export default CardCita;
