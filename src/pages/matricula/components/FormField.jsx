import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Componente reutilizable para campos de formulario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta del campo
 * @param {string} props.name - Nombre del campo
 * @param {string} props.type - Tipo de campo (text, email, password, select, textarea, etc.)
 * @param {string} props.value - Valor del campo
 * @param {Function} props.onChange - Función para manejar cambios
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Indica si el campo es obligatorio
 * @param {React.ReactNode} props.icon - Icono para el campo
 * @param {Array} props.options - Opciones para campos select
 * @param {boolean} props.disabled - Indica si el campo está deshabilitado
 * @param {string} props.className - Clases CSS adicionales
 * @param {Object} props.rest - Propiedades adicionales
 * @returns {JSX.Element} Componente de campo de formulario
 */
const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  icon,
  options = [],
  disabled = false,
  className = '',
  ...rest
}) => {
  // Clases base para todos los campos
  const baseClasses = `w-full rounded-lg border ${
    error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
  } focus:ring-2 focus:outline-none transition-colors dark:bg-gray-700 dark:text-white ${
    disabled ? 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-75' : ''
  } ${className}`;

  // Clases adicionales para campos con icono
  const iconClasses = icon ? 'pl-10' : 'px-4';

  // Renderizar campo según su tipo
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${baseClasses} ${iconClasses} py-2`}
            required={required}
            disabled={disabled}
            {...rest}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${baseClasses} ${iconClasses} py-2 appearance-none`}
            required={required}
            disabled={disabled}
            {...rest}
          >
            <option value="">Seleccionar</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`${baseClasses} ${iconClasses} py-2`}
            required={required}
            disabled={disabled}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {renderField()}
      </div>

      {error && (
        <div className="mt-1 flex items-center text-sm text-red-600 dark:text-red-400">
          <AlertCircle size={14} className="mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
