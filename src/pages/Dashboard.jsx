import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContextContext";
import { useAuth } from "../context/AuthContext";
import CardCita from "../components/CardCita";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const { appointments, loading, fetchAppointments, error } = useAppointment();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4 mb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Mis Citas</h1>
            {user && <p className="text-gray-600">Bienvenido, {user.nombre || user.email}</p>}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <Skeleton />
        ) : appointments.length === 0 ? (
          <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500 text-lg">No tienes citas agendadas</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((cita) => (
              <CardCita key={cita.id} cita={cita} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
