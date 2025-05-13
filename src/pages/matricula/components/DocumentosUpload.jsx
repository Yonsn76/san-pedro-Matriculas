import React from 'react';
import { MATRICULA_TYPES, THEME_COLORS, REQUIRED_DOCUMENTS } from '../utils/constants';
import { FileText, Upload, Check, AlertCircle, X, Info, FileUp } from 'lucide-react';

/**
 * Componente para la subida de documentos
 * @param {Object} props - Propiedades del componente
 * @param {string} props.tipoMatricula - Tipo de matrícula
 * @param {Function} props.handleFileChange - Función para manejar cambios en los archivos
 * @param {Object} props.uploadProgress - Progreso de carga de archivos
 * @param {Function} props.removeFile - Función para eliminar archivos
 * @param {Object} props.errors - Errores de validación
 * @returns {JSX.Element} Componente de subida de documentos
 */
const DocumentosUpload = ({ tipoMatricula, handleFileChange, uploadProgress, removeFile, errors }) => {
  const themeColors = THEME_COLORS[tipoMatricula] || THEME_COLORS[MATRICULA_TYPES.NUEVA];
  const requiredDocs = REQUIRED_DOCUMENTS[tipoMatricula] || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
        >
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Documentos Requeridos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {requiredDocs.length} documentos para {tipoMatricula === MATRICULA_TYPES.NUEVA 
              ? 'matrícula nueva' 
              : tipoMatricula === MATRICULA_TYPES.TRASLADO 
                ? 'matrícula por traslado' 
                : 'siguiente grado'}
          </p>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start">
        <Info size={20} className="text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-medium">Importante:</span> Todos los documentos marcados con * son obligatorios.
            Formatos aceptados: PDF, JPG, JPEG, PNG. Tamaño máximo: 5MB por archivo.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {requiredDocs.map((doc) => (
          <div 
            key={doc.id} 
            className={`border rounded-lg p-4 transition-all ${
              uploadProgress[doc.id] === 100 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : errors[doc.id]
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start">
                {uploadProgress[doc.id] === 100 ? (
                  <Check 
                    size={20} 
                    className="text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" 
                  />
                ) : errors[doc.id] ? (
                  <AlertCircle 
                    size={20} 
                    className="text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" 
                  />
                ) : (
                  <FileText 
                    size={20} 
                    className="mt-0.5 mr-3 flex-shrink-0" 
                    style={{ color: themeColors.primary }} 
                  />
                )}
                <div>
                  <div className="font-medium text-gray-800 dark:text-white flex items-center">
                    {doc.name}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {doc.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="file"
                  id={`file-${doc.id}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files[0], doc.id)}
                  accept={doc.acceptedFormats}
                />
                <label
                  htmlFor={`file-${doc.id}`}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: uploadProgress[doc.id] ? '#FFFFFF' : themeColors.primary,
                    color: uploadProgress[doc.id] ? themeColors.primary : '#FFFFFF',
                    border: uploadProgress[doc.id] ? `1px solid ${themeColors.primary}` : 'none'
                  }}
                >
                  <FileUp size={16} className="mr-2" />
                  {uploadProgress[doc.id] ? 'Cambiar archivo' : 'Subir archivo'}
                </label>
                
                {uploadProgress[doc.id] !== undefined && (
                  <button
                    onClick={() => removeFile(doc.id)}
                    className="ml-2 p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Eliminar archivo"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Mostrar progreso o archivo subido */}
            {uploadProgress[doc.id] !== undefined && (
              <div className="mt-4">
                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${uploadProgress[doc.id]}%`,
                      backgroundColor: uploadProgress[doc.id] === 100 ? '#10B981' : themeColors.primary
                    }}
                  ></div>
                </div>
                
                {/* Información del archivo */}
                <div className="flex items-center justify-between text-sm">
                  <span className={`${
                    uploadProgress[doc.id] === 100 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {uploadProgress[doc.id] < 100 
                      ? `Subiendo... ${uploadProgress[doc.id]}%` 
                      : 'Archivo subido correctamente'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Mensaje de error */}
            {errors[doc.id] && (
              <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                <AlertCircle size={14} className="mr-1 flex-shrink-0" />
                <span>{errors[doc.id]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentosUpload;
