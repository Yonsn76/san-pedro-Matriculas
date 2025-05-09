import React from 'react';
import { School } from 'lucide-react';

const TipoMatricula = ({ tipoMatricula, handleTipoMatriculaChange, styles }) => {
  return (
    <div className="border-b dark:border-gray-700 pb-6">
      <div className="flex items-center mb-4">
        <School className={`mr-2 ${styles.iconColor}`} size={20} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tipo de Matrícula</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Matrícula Nueva */}
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
            tipoMatricula === 'nuevo'
              ? `${styles.borderColor} bg-blue-50 dark:bg-gray-700`
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
          }`}
          onClick={() => handleTipoMatriculaChange({ target: { value: 'nuevo' } })}
        >
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="tipoNuevo"
              name="tipoMatricula"
              value="nuevo"
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              required
              onChange={handleTipoMatriculaChange}
              checked={tipoMatricula === 'nuevo'}
            />
            <label htmlFor="tipoNuevo" className="ml-2 font-medium text-gray-800 dark:text-white">
              Matrícula por primera vez
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">
            Para estudiantes que ingresan por primera vez a nuestra institución
          </p>
        </div>

        {/* Matrícula Traslado */}
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
            tipoMatricula === 'traslado'
              ? `${styles.borderColor} bg-green-50 dark:bg-gray-700`
              : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500'
          }`}
          onClick={() => handleTipoMatriculaChange({ target: { value: 'traslado' } })}
        >
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="tipoTraslado"
              name="tipoMatricula"
              value="traslado"
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              onChange={handleTipoMatriculaChange}
              checked={tipoMatricula === 'traslado'}
            />
            <label htmlFor="tipoTraslado" className="ml-2 font-medium text-gray-800 dark:text-white">
              Traslado
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">
            Para estudiantes que provienen de otra institución educativa
          </p>
        </div>

        {/* Siguiente Grado */}
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
            tipoMatricula === 'siguiente'
              ? `${styles.borderColor} bg-purple-50 dark:bg-gray-700`
              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'
          }`}
          onClick={() => handleTipoMatriculaChange({ target: { value: 'siguiente' } })}
        >
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="tipoSiguiente"
              name="tipoMatricula"
              value="siguiente"
              className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              onChange={handleTipoMatriculaChange}
              checked={tipoMatricula === 'siguiente'}
            />
            <label htmlFor="tipoSiguiente" className="ml-2 font-medium text-gray-800 dark:text-white">
              Paso al siguiente grado
            </label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">
            Para estudiantes que ya están matriculados y pasan al siguiente grado
          </p>
        </div>
      </div>
    </div>
  );
};

export default TipoMatricula; 