// Simulación de API RESTful y lógica de backoff
const API_URL = 'https://api.vivesalud.com';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const exponentialBackoff = async (fn, maxRetries = 3) => {
  let attempt = 0;
  let delay = 500;
  while (attempt < maxRetries) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries - 1) throw err;
      await sleep(delay);
      delay *= 2;
      attempt++;
    }
  }
};

const api = {
  login: async (email, password) => {
    return exponentialBackoff(async () => {
      // Simulación de petición
      if (email === 'test@demo.com' && password === '12345678') {
        return { token: 'demo-token', user: { email } };
      }
      throw new Error('Credenciales inválidas');
    });
  },
  getAppointments: async () => {
    return exponentialBackoff(async () => {
      // Simulación de datos
      return [
        { id: 1, medico: 'Dr. Pérez', fecha: '2025-12-10', hora: '10:00', estado: 'PENDIENTE' },
        { id: 2, medico: 'Dra. Gómez', fecha: '2025-12-12', hora: '12:00', estado: 'COMPLETADA' },
      ];
    });
  },
  cancelAppointment: async (id) => {
    return exponentialBackoff(async () => {
      // Simulación de cancelación
      if (!id) throw new Error('ID requerido');
      return true;
    });
  },
  rescheduleAppointment: async (id, fecha, hora) => {
    return exponentialBackoff(async () => {
      // Simulación de reagendamiento
      if (!id || !fecha || !hora) throw new Error('Datos requeridos');
      return true;
    });
  },
};

export default api;
