import React from 'react';
import { MATRICULA_TYPES, THEME_COLORS } from '../utils/constants';
import { MessageSquare } from 'lucide-react';
import FormField from './FormField';

/**
 * Componente para el formulario de comentarios adicionales
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en los campos
 * @param {string} props.tipoMatricula - Tipo de matrícula
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.touchedFields - Campos que han sido tocados
 * @returns {JSX.Element} Componente de formulario de comentarios
 */
const ComentariosForm = ({ formData, handleInputChange, tipoMatricula, errors, touchedFields }) => {
  const themeColors = THEME_COLORS[tipoMatricula] || THEME_COLORS[MATRICULA_TYPES.NUEVA];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
        >
          <MessageSquare size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Comentarios Adicionales
        </h2>
      </div>
      
      <FormField
        label="Comentarios (opcional)"
        name="comentarios"
        type="textarea"
        value={formData.comentarios}
        onChange={(e) => handleInputChange('comentarios', e.target.value)}
        error={touchedFields.comentarios && errors.comentarios}
        rows={4}
        placeholder="Ingrese cualquier información adicional relevante para la matrícula..."
      />
      
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Puede incluir información adicional que considere relevante para el proceso de matrícula.
      </p>
    </div>
  );
};

export default ComentariosForm;
