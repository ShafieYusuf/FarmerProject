import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { TOAST_TYPES } from '../../contexts/ToastContext';

const Toast = ({ toast, onClose }) => {
  const { id, message, type } = toast;

  // Define icon based on toast type
  let Icon;
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      Icon = FaCheckCircle;
      break;
    case TOAST_TYPES.ERROR:
      Icon = FaTimesCircle;
      break;
    case TOAST_TYPES.WARNING:
      Icon = FaExclamationCircle;
      break;
    case TOAST_TYPES.INFO:
    default:
      Icon = FaInfoCircle;
      break;
  }

  // Define background color based on toast type
  const getBackgroundColor = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'bg-green-100 border-green-500 text-green-800';
      case TOAST_TYPES.ERROR:
        return 'bg-red-100 border-red-500 text-red-800';
      case TOAST_TYPES.WARNING:
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case TOAST_TYPES.INFO:
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  // Define icon color based on toast type
  const getIconColor = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'text-green-500';
      case TOAST_TYPES.ERROR:
        return 'text-red-500';
      case TOAST_TYPES.WARNING:
        return 'text-yellow-500';
      case TOAST_TYPES.INFO:
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div
      className={`rounded-md p-4 mb-3 flex items-start shadow-md border-l-4 ${getBackgroundColor()}`}
      role="alert"
    >
      <div className={`mr-3 ${getIconColor()}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-grow">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:bg-gray-200"
      >
        <span className="sr-only">Close</span>
        <FaTimes className="h-4 w-4" />
      </button>
    </div>
  );
};

// Toast container component that displays all toasts
export const ToastContainer = ({ toasts, onClose }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default Toast; 