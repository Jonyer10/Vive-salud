import React from 'react';

const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
    {message}
    <button onClick={onClose} className="ml-4 text-white">Cerrar</button>
  </div>
);

export default Toast;
