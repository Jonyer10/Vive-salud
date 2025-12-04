import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppointment } from '../context/AppointmentContext';

const ReagendarPage = ({ citaId }) => {
  const { rescheduleAppointment, error } = useAppointment();
  const formik = useFormik({
    initialValues: { fecha: '', hora: '' },
    validationSchema: Yup.object({
      fecha: Yup.date().min(new Date(), 'Debe ser una fecha futura').required('Requerido'),
      hora: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      rescheduleAppointment(citaId, values.fecha, values.hora);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80 mx-auto mt-10">
      <h2 className="text-xl mb-4 font-bold">Reagendar Cita</h2>
      <input
        name="fecha"
        type="date"
        onChange={formik.handleChange}
        value={formik.values.fecha}
        className="w-full p-2 mb-2 border rounded"
      />
      {formik.touched.fecha && formik.errors.fecha && (
        <div className="text-red-500 text-sm">{formik.errors.fecha}</div>
      )}
      <input
        name="hora"
        type="time"
        onChange={formik.handleChange}
        value={formik.values.hora}
        className="w-full p-2 mb-2 border rounded"
      />
      {formik.touched.hora && formik.errors.hora && (
        <div className="text-red-500 text-sm">{formik.errors.hora}</div>
      )}
      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-4">Reagendar</button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};

export default ReagendarPage;
