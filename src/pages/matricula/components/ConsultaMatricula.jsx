import React, { useState } from 'react';
import { Search, ArrowLeft, FileText, User, Calendar, School } from 'lucide-react';
import FormField from './FormField';
import AlertMessage, { ALERT_TYPES } from './AlertMessage';

/**
 * Componente para consultar matrículas
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onConsultar - Función para consultar matrícula
 * @param {boolean} props.isConsulting - Indica si se está consultando
 * @param {Object} props.consultResult - Resultado de la consulta
 * @param {Function} props.onBack - Función para volver atrás
 * @returns {JSX.Element} Componente de consulta de matrícula
 */
const ConsultaMatricula = ({ onConsultar, isConsulting, consultResult, onBack }) => {
  const [dni, setDni] = useState('');
  const [anioEscolar, setAnioEscolar] = useState('');
  const [error, setError] = useState('');

  /**
   * Maneja el envío del formulario
   * @param {Event} e - Evento de formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar DNI
    if (!dni) {
      setError('El DNI del estudiante es obligatorio');
      return;
    }
    
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
      setError('El DNI debe tener 8 dígitos numéricos');
      return;
    }
    
    setError('');
    onConsultar(dni, anioEscolar);
  };

  /**
   * Renderiza los resultados de la consulta
   * @returns {JSX.Element} Componente con los resultados
   */
  const renderResults = () => {
    if (!consultResult) return null;
    
    if (!consultResult.success) {
      return (
        <AlertMessage
          type={ALERT_TYPES.ERROR}
          message={consultResult.message || 'Error al consultar la matrícula'}
        />
      );
    }
    
    if (!consultResult.found || consultResult.data.length === 0) {
      return (
        <AlertMessage
          type={ALERT_TYPES.WARNING}
          title="No se encontraron resultados"
          message="No se encontraron matrículas para el DNI proporcionado. Verifique el DNI o realice una nueva matrícula."
        />
      );
    }
    
    return (
      <div className="space-y-4">
        <AlertMessage
          type={ALERT_TYPES.SUCCESS}
          title="Matrícula encontrada"
          message={`Se encontraron ${consultResult.data.length} matrícula(s) para el DNI proporcionado.`}
        />
        
        {consultResult.data.map((matricula, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <School size={20} className="text-blue-500 dark:text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Matrícula #{matricula.id}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <User size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estudiante</p>
                  <p className="text-gray-800 dark:text-white">{matricula.nombre_estudiante}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Año Escolar</p>
                  <p className="text-gray-800 dark:text-white">{matricula.anio_escolar}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <School size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Grado</p>
                  <p className="text-gray-800 dark:text-white">{matricula.grado_solicitado}° Grado</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FileText size={16} className="text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</p>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {matricula.estado || 'Registrado'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fecha de registro: {new Date(matricula.fecha_solicitud).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Consulta de Matrícula
        </h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FormField
                label="DNI del Estudiante"
                name="dni"
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                error={error}
                required
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="Ingrese el DNI del estudiante"
              />
            </div>
            
            <div>
              <FormField
                label="Año Escolar (opcional)"
                name="anioEscolar"
                type="text"
                value={anioEscolar}
                onChange={(e) => setAnioEscolar(e.target.value)}
                placeholder="Ej: 2023"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isConsulting}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isConsulting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Consultando...
                </>
              ) : (
                <>
                  <Search size={16} className="mr-2" />
                  Consultar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {renderResults()}
    </div>
  );
};

export default ConsultaMatricula;
