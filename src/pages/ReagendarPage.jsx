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
        .min(new Date().toISOString().split('T')[0], "Debe ser una fecha futura")
        .required("Requerido"),
      hora: Yup.string().required("Requerido"),
    }),
    onSubmit: async (values) => {
      await rescheduleAppointment(id, values.fecha, values.hora);
      navigate("/dashboard");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl mb-4 font-bold">Reagendar Cita</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha:
          </label>
          <input
            name="fecha"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.fecha}
            className="w-full p-2 border rounded"
          />
          {formik.touched.fecha && formik.errors.fecha && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.fecha}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Hora:
          </label>
          <input
            name="hora"
            type="time"
            onChange={formik.handleChange}
            value={formik.values.hora}
            className="w-full p-2 border rounded"
          />
          {formik.touched.hora && formik.errors.hora && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.hora}</div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Reagendar
          </button>
        </div>
        
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default ReagendarPage;
