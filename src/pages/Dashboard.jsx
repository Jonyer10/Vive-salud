import React, { useEffect } from "react";
import { useAppointment } from "../context/AppointmentContextContext";
import CardCita from "../components/CardCita";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const { appointments, loading, fetchAppointments } = useAppointment();

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="grid gap-4">
          {appointments.map((cita) => (
            <CardCita key={cita.id} cita={cita} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
