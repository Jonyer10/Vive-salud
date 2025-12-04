import React from "react";
import Button from "./Button";
import formatDate from "../utils/formatDate";

const CardCita = ({ cita }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center">
    <div>
      <div className="font-bold">{cita.medico}</div>
      <div>
        {formatDate(cita.fecha)} - {cita.hora}
      </div>
      <div className="text-sm text-gray-500">Estado: {cita.estado}</div>
    </div>
    <div className="flex gap-2 mt-2 md:mt-0">
      <Button tipo="cancel" citaId={cita.id} />
      <Button tipo="reschedule" citaId={cita.id} />
    </div>
  </div>
);

export default CardCita;
