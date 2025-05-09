import React from 'react';
import { User, Baby, Calendar, MapPin, GraduationCap, Heart, School } from 'lucide-react';

const DatosEstudiante = ({ tipoMatricula, styles }) => {
  return (
    <div className="border-b dark:border-gray-700 pb-6">
      <div className="flex items-center mb-6">
        <User className={`mr-2 ${styles.iconColor}`} size={20} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Estudiante</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombres y Apellidos */}
        <div className="relative col-span-2">
          <div className="flex items-center">
            <User className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="nombre"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              placeholder=" "
              required
            />
          </div>
          <label
            htmlFor="nombre"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Nombres y Apellidos
          </label>
        </div>

        {/* DNI */}
        <div className="relative">
          <div className="flex items-center">
            <Baby className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="dni"
              maxLength="8"
              pattern="[0-9]{8}"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              placeholder=" "
              required
            />
          </div>
          <label
            htmlFor="dni"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            DNI del Estudiante
          </label>
        </div>

        {/* Fecha de Nacimiento */}
        <div className="relative">
          <div className="flex items-center">
            <Calendar className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="date"
              id="fechaNacimiento"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              required
            />
          </div>
          <label
            htmlFor="fechaNacimiento"
            className="text-sm font-medium block mb-1"
          >
            Fecha de Nacimiento
          </label>
        </div>

        {/* Dirección */}
        <div className="relative col-span-2">
          <div className="flex items-center">
            <MapPin className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="direccion"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              placeholder=" "
              required
            />
          </div>
          <label
            htmlFor="direccion"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Dirección Completa
          </label>
        </div>

        {/* Grado a cursar */}
        <div className="relative">
          <div className="flex items-center">
            <GraduationCap className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <select
              id="grado"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              required
            >
              <option value="">Seleccionar</option>
              <option value="1">1° Grado</option>
              <option value="2">2° Grado</option>
              <option value="3">3° Grado</option>
              <option value="4">4° Grado</option>
              <option value="5">5° Grado</option>
              <option value="6">6° Grado</option>
            </select>
          </div>
          <label
            htmlFor="grado"
            className="text-sm font-medium block mb-1"
          >
            Grado a cursar
          </label>
        </div>

        {/* Alergias */}
        <div className="relative col-span-2">
          <div className="flex items-center">
            <Heart className={`absolute left-4 top-3 ${styles.iconColor}`} size={18} />
            <textarea
              id="alergias"
              className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                tipoMatricula === 'nuevo'
                  ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                  : tipoMatricula === 'traslado'
                  ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                  : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
              }`}
              placeholder=" "
              rows="2"
            />
          </div>
          <label
            htmlFor="alergias"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Alergias o Condiciones Médicas (opcional)
          </label>
        </div>

        {/* Colegio de Procedencia (para traslados) */}
        {tipoMatricula === 'traslado' && (
          <div className="relative col-span-2">
            <div className="flex items-center">
              <School className={`absolute left-4 ${styles.iconColor}`} size={18} />
              <input
                type="text"
                id="colegioAnterior"
                className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                  tipoMatricula === 'traslado'
                    ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                    : 'border-gray-200'
                }`}
                placeholder=" "
                required
              />
            </div>
            <label
              htmlFor="colegioAnterior"
              className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
            >
              Colegio de Procedencia
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatosEstudiante; 