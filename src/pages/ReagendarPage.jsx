import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppointment } from "../context/AppointmentContextContext";

const ReagendarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rescheduleAppointment, error } = useAppointment();

  const formik = useFormik({
    initialValues: { fecha: "", hora: "" },
    validationSchema: Yup.object({
      fecha: Yup.date()
        .min(
          new Date().toISOString().split("T")[0],
          "Debe ser una fecha futura"
        )
        .required("Requerido"),
      hora: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      await rescheduleAppointment(id, values.fecha, values.hora);
      navigate("/dashboard");
    },
  });

  return (
    <div className="login-container">
      <div style={{ maxWidth: "420px", width: "100%" }}>
        <form onSubmit={formik.handleSubmit} className="login-card">
          <h2 className="form-title">Reagendar Cita</h2>

          {error && <div className="alert-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Fecha</label>
            <input
              name="fecha"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fecha}
              className="form-input"
            />
            {formik.touched.fecha && formik.errors.fecha && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.fecha}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Hora</label>
            <input
              name="hora"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hora}
              className="form-input"
            />
            {formik.touched.hora && formik.errors.hora && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.hora}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-form-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-form-primary">
              Reagendar
            </button>
          </div>
        </form>

        <div className="register-banner">
          <span className="register-banner-text">¿Necesitas ayuda?</span>
          <button
            className="register-banner-button"
            onClick={() => navigate("/dashboard")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReagendarPage;
