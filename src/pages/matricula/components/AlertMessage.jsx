import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, X, Info } from 'lucide-react';

/**
 * Tipos de alerta
 * @type {Object}
 */
export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

/**
 * Componente para mostrar mensajes de alerta
 * @param {Object} props - Propiedades del componente
 * @param {string} props.type - Tipo de alerta (success, error, warning, info)
 * @param {string} props.title - Título de la alerta
 * @param {string} props.message - Mensaje de la alerta
 * @param {Function} props.onClose - Función para cerrar la alerta
 * @param {boolean} props.showIcon - Indica si se debe mostrar el icono
 * @returns {JSX.Element} Componente de alerta
 */
const AlertMessage = ({ type = ALERT_TYPES.INFO, title, message, onClose, showIcon = true }) => {
  if (!message) return null;

  // Configuración según el tipo de alerta
  const getAlertConfig = () => {
    switch (type) {
      case ALERT_TYPES.SUCCESS:
        return {
          icon: <CheckCircle size={20} className="text-green-500 dark:text-green-400" />,
          title: title || 'Operación exitosa',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-800 dark:text-green-300'
        };
      
      case ALERT_TYPES.ERROR:
        return {
          icon: <XCircle size={20} className="text-red-500 dark:text-red-400" />,
          title: title || 'Error',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-800 dark:text-red-300'
        };
      
      case ALERT_TYPES.WARNING:
        return {
          icon: <AlertTriangle size={20} className="text-yellow-500 dark:text-yellow-400" />,
          title: title || 'Advertencia',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-800 dark:text-yellow-300'
        };
      
      case ALERT_TYPES.INFO:
      default:
        return {
          icon: <Info size={20} className="text-blue-500 dark:text-blue-400" />,
          title: title || 'Información',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-800 dark:text-blue-300'
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div className={`rounded-lg border ${config.borderColor} ${config.bgColor} p-4 mb-6`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {config.icon}
          </div>
        )}
        
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          {config.title && (
            <h3 className={`text-sm font-medium ${config.textColor}`}>
              {config.title}
            </h3>
          )}
          
          <div className={`mt-2 text-sm ${config.textColor}`}>
            {typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              message
            )}
          </div>
        </div>
        
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 ${config.bgColor} ${config.textColor} hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                style={{
                  ringOffsetColor: config.bgColor,
                  ringColor: config.borderColor
                }}
              >
                <span className="sr-only">Cerrar</span>
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
