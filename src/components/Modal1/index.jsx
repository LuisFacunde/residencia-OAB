import React from 'react';

export const Modal1 = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-[28px] font-400 text-gray-500 hover:text-red-600"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
