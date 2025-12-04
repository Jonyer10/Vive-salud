import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('Requerido'),
});

export const rescheduleSchema = Yup.object({
  fecha: Yup.date().min(new Date(), 'Debe ser una fecha futura').required('Requerido'),
  hora: Yup.string().required('Requerido'),
});
