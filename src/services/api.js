import axios from 'axios';

const BASE_URL = "https://692b5f0a7615a15ff24f7337.mockapi.io/api";

// ========== AUTENTICACIÓN ==========

export async function LoginUser(email, password) {
  try {
    const { data } = await axios.get(`${BASE_URL}/usuarios`, {
      params: { email }
    });
    
    if (data.length === 0) {
      throw new Error('Usuario no encontrado');
    }
    
    const usuario = data[0];
    
    if (usuario.password !== password) {
      throw new Error('Contraseña incorrecta');
    }
    
    return usuario;
  } catch (error) {
    throw error;
  }
}

// ========== RESERVAS/CITAS ==========
// Schema de MockAPI para reservas:
// - id: Object ID
// - clase: String (nombre del médico o tipo de consulta)
// - fecha: String (formato: YYYY-MM-DD)
// - estado: String (PENDIENTE, COMPLETADA, CANCELADA)
// - usuarioId: String (ID del usuario que creó la reserva)
// - hora: String (formato: HH:MM) - IMPORTANTE: Debes agregar este campo en MockAPI

export async function getReservas(usuarioId) {
  const { data } = await axios.get(`${BASE_URL}/reservas`, {
    params: { usuarioId }
  });
  return data;
}

export async function createReserva(reserva) {
  const { data } = await axios.post(`${BASE_URL}/reservas`, reserva);
  return data;
}

export async function deleteReserva(reservaId) {
  await axios.delete(`${BASE_URL}/reservas/${reservaId}`);
  return true;
}

export async function updateReserva(reservaId, reserva) {
  const { data } = await axios.put(`${BASE_URL}/reservas/${reservaId}`, reserva);
  return data;
}

// ========== API MOCK COMPATIBLE CON CONTEXTOS ==========
// Objeto por defecto para mantener compatibilidad con los contextos existentes

const api = {
  login: async (email, password) => {
    const user = await LoginUser(email, password);
    return {
      token: `token-${user.id}`,
      user: { 
        id: user.id,
        email: user.email,
        nombre: user.nombre 
      }
    };
  },
  
  getAppointments: async (usuarioId) => {
    const reservas = await getReservas(usuarioId);
    // Mapear campos de reservas a appointments/citas
    return reservas.map(reserva => ({
      id: reserva.id,
      medico: reserva.clase || 'Médico General',
      fecha: reserva.fecha,
      hora: reserva.hora || '10:00',
      estado: reserva.estado || 'PENDIENTE'
    }));
  },
  
  cancelAppointment: async (id) => {
    return await deleteReserva(id);
  },
  
  rescheduleAppointment: async (id, fecha, hora) => {
    return await updateReserva(id, { fecha, hora });
  }
};

export default api;