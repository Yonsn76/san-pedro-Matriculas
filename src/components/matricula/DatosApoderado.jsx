import React from 'react';
import { UserCheck, UserCircle, Baby, Building, MapPin, Mail, Phone, User, GraduationCap } from 'lucide-react';

const DatosApoderado = ({ tipoMatricula, styles }) => {
  return (
    <div className="border-b dark:border-gray-700 pb-6">
      <div className="flex items-center mb-6">
        <UserCheck className={`mr-2 ${styles.iconColor}`} size={20} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Apoderado</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombres y Apellidos del Apoderado */}
        <div className="relative col-span-2">
          <div className="flex items-center">
            <UserCircle className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="nombreApoderado"
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
            htmlFor="nombreApoderado"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Nombres y Apellidos del Apoderado
          </label>
        </div>

        {/* DNI del Apoderado */}
        <div className="relative">
          <div className="flex items-center">
            <Baby className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="dniApoderado"
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
            htmlFor="dniApoderado"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            DNI del Apoderado
          </label>
        </div>

        {/* Parentesco */}
        <div className="relative">
          <div className="flex items-center">
            <UserCheck className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <select
              id="parentesco"
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
              <option value="padre">Padre</option>
              <option value="madre">Madre</option>
              <option value="abuelo">Abuelo/a</option>
              <option value="tio">Tío/a</option>
              <option value="hermano">Hermano/a</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <label htmlFor="parentesco" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
            Parentesco
          </label>
        </div>

        {/* Ocupación */}
        <div className="relative">
          <div className="flex items-center">
            <Building className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="ocupacion"
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
            htmlFor="ocupacion"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Ocupación
          </label>
        </div>

        {/* Dirección del Apoderado */}
        <div className="relative col-span-2">
          <div className="flex items-center">
            <MapPin className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="text"
              id="direccionApoderado"
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
            htmlFor="direccionApoderado"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Dirección del Apoderado
          </label>
        </div>

        {/* Email */}
        <div className="relative">
          <div className="flex items-center">
            <Mail className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="email"
              id="email"
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
            htmlFor="email"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Correo Electrónico
          </label>
        </div>

        {/* Teléfono Celular */}
        <div className="relative">
          <div className="flex items-center">
            <Phone className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <input
              type="tel"
              id="telefono"
              pattern="[0-9]{9}"
              maxLength="9"
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
            htmlFor="telefono"
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1"
          >
            Teléfono Celular
          </label>
        </div>

        {/* Estado Civil */}
        <div className="relative">
          <div className="flex items-center">
            <User className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <select
              id="estadoCivil"
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
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
              <option value="conviviente">Conviviente</option>
            </select>
          </div>
          <label htmlFor="estadoCivil" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
            Estado Civil
          </label>
        </div>

        {/* Grado de Instrucción */}
        <div className="relative">
          <div className="flex items-center">
            <GraduationCap className={`absolute left-4 ${styles.iconColor}`} size={18} />
            <select
              id="gradoInstruccion"
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
              <option value="primaria">Primaria</option>
              <option value="secundaria">Secundaria</option>
              <option value="tecnico">Técnico</option>
              <option value="universitario">Universitario</option>
              <option value="postgrado">Postgrado</option>
            </select>
          </div>
          <label htmlFor="gradoInstruccion" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
            Grado de Instrucción
          </label>
        </div>
      </div>
    </div>
  );
};

export default DatosApoderado; 