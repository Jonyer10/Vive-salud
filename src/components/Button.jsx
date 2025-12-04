import React from "react";
import { useAppointment } from "../context/AppointmentContextContext";

const Button = ({ tipo, citaId }) => {
  const { cancelAppointment, openReschedule } = useAppointment();
  const handleClick = () => {
    if (tipo === "cancel") cancelAppointment(citaId);
    if (tipo === "reschedule") openReschedule(citaId);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded text-white ${
        tipo === "cancel" ? "bg-red-500" : "bg-blue-500"
      }`}
    >
      {tipo === "cancel" ? "Cancelar" : "Reagendar"}
    </button>
  );
};

export default Button;
