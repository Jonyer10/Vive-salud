import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContextContext";

const Button = ({ tipo, citaId }) => {
  const { cancelAppointment } = useAppointment();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (tipo === "cancel") {
      if (window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
        cancelAppointment(citaId);
      }
    }
    if (tipo === "reschedule") {
      navigate(`/reagendar/${citaId}`);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded text-white hover:opacity-90 ${
        tipo === "cancel" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {tipo === "cancel" ? "Cancelar" : "Reagendar"}
    </button>
  );
};

export default Button;
