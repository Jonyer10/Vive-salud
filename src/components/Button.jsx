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

  if (tipo === "reschedule") {
    return (
      <button onClick={handleClick} className="btn-primary">
        Agendar
      </button>
    );
  }

  return (
    <button onClick={handleClick} className="btn-secondary">
      Cancelar
    </button>
  );
};

export default Button;
