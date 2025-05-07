import React, { useState } from 'react';
import { Modal1 } from '../../components/Modal1'; 

export const ModalTest = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Abrir Modal
      </button>

      <Modal1 isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Este é o modal</h2>
        <p>Você pode fechar clicando fora ou no "×" acima.</p>
        {/* Modificar aqui Coraline, depois que tu terminar ele comenta e faz outro embaixo, não apaga. */}
      </Modal1>
    </div>
  );
};