import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppointment } from "../context/AppointmentContextContext";
import { useAuth } from "../context/AuthContext";
import CardCita from "../components/CardCita";
import Skeleton from "../components/Skeleton";

const Dashboard = () => {
  const { appointments, loading, fetchAppointments, error } = useAppointment();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("servicios");
  const [sortBy, setSortBy] = useState("recientes");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortBy === "recientes") {
      return new Date(b.fecha) - new Date(a.fecha);
    }
    return new Date(a.fecha) - new Date(b.fecha);
  });

  return (
    <div className="app-background">
      {/* Header */}
      <header className="header-nav">
        <div className="container-main">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo + Tabs */}
            <div className="flex items-center space-x-8">
              <h1 className="text-title">Vive Salud</h1>
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("servicios")}
                  className={`nav-tab ${
                    activeTab === "servicios"
                      ? "nav-tab-active"
                      : "nav-tab-inactive"
                  }`}
                >
                  Servicios
                </button>
                <button
                  onClick={() => setActiveTab("doctores")}
                  className={`nav-tab ${
                    activeTab === "doctores"
                      ? "nav-tab-active"
                      : "nav-tab-inactive"
                  }`}
                >
                  Doctores
                </button>
              </nav>
            </div>
            {/* Right: Logout */}
            <button onClick={handleLogout} className="btn-secondary">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-main py-3">
          <div className="flex justify-end items-center">
            <div className="flex items-center space-x-3">
              <span className="text-body font-medium">Organizar</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select-custom"
              >
                <option value="recientes">Más antiguos</option>
                <option value="antiguos">Más recientes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container-main spacing-section">
        {/* Error Message */}
        {error && <div className="alert-error">{error}</div>}

        {/* Content Area */}
        {loading ? (
          <Skeleton />
        ) : sortedAppointments.length === 0 ? (
          <div className="empty-state">
            <p className="text-body">No tienes citas agendadas</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            {sortedAppointments.map((cita) => (
              <CardCita key={cita.id} cita={cita} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
