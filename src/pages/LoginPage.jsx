import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Requerido"),
      password: Yup.string()
        .min(8, "Mínimo 8 caracteres")
        .required("Requerido"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Iniciar sesión</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 mb-2 border rounded"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full p-2 mb-2 border rounded"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
        >
          Entrar
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
