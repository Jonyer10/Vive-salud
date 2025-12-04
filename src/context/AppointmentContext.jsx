import React, { useState } from "react";
import api from "../services/api";
import {
  AppointmentContext,
  useAppointment,
} from "./AppointmentContextContext";

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rescheduleId, setRescheduleId] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await api.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.cancelAppointment(id);
      setAppointments((prev) => prev.filter((cita) => cita.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const openReschedule = (id) => setRescheduleId(id);

  const rescheduleAppointment = async (id, fecha, hora) => {
    try {
      await api.rescheduleAppointment(id, fecha, hora);
      setRescheduleId(null);
      fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        error,
        fetchAppointments,
        cancelAppointment,
        openReschedule,
        rescheduleAppointment,
        rescheduleId,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
