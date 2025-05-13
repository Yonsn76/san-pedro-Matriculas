import { useState, useEffect } from 'react';
import { MATRICULA_TYPES, THEME_COLORS, SELECT_OPTIONS } from '../utils/constants';
import {
  UserCircle, Search, Loader2, GraduationCap, Calendar, School,
  ArrowRight, AlertCircle, CheckCircle2, User, MapPin, Phone, Mail,
  BookOpen, Users, Info, Clock
} from 'lucide-react';
import FormField from './FormField';
import matriculaService from '../services/matriculaService';
import { toast } from 'react-toastify';

/**
 * Componente para buscar y mostrar información de promoción de estudiantes
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en los campos
 * @param {string} props.tipoMatricula - Tipo de matrícula
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.touchedFields - Campos que han sido tocados
 * @returns {JSX.Element} Componente de formulario de promoción
 */
const PromocionForm = ({ formData, handleInputChange, tipoMatricula, errors, touchedFields }) => {
  // Si no es matrícula de siguiente grado, no mostrar el formulario
  if (tipoMatricula !== MATRICULA_TYPES.SIGUIENTE_GRADO) {
    return null;
  }

  // Estados para el manejo de la búsqueda
  const [dniBusqueda, setDniBusqueda] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null);

  const themeColors = THEME_COLORS[tipoMatricula] || THEME_COLORS[MATRICULA_TYPES.SIGUIENTE_GRADO];

  /**
   * Busca un estudiante por DNI y verifica si puede ser promovido
   */
  const buscarEstudiante = async () => {
    if (!dniBusqueda || dniBusqueda.length !== 8) {
      toast.warning('Ingrese un DNI válido de 8 dígitos');
      return;
    }

    setBuscando(true);
    setErrorBusqueda('');
    setResultadoBusqueda(null);

    try {
      const resultado = await matriculaService.verificarPromocionGrado(dniBusqueda);

      if (resultado.success) {
        // Actualizar los campos del formulario con los datos del estudiante
        const { estudiante, apoderado, historial, promocion } = resultado.data;

        // Datos del estudiante
        handleInputChange('nombreEstudiante', estudiante.nombre);
        handleInputChange('dniEstudiante', estudiante.dni);
        handleInputChange('fechaNacimiento', estudiante.fecha_nacimiento);
        handleInputChange('genero', estudiante.genero);
        handleInputChange('direccion', estudiante.direccion);

        // Datos del apoderado si existe
        if (apoderado) {
          handleInputChange('nombreApoderado', apoderado.nombre);
          handleInputChange('dniApoderado', apoderado.dni);
          handleInputChange('parentesco', apoderado.parentesco || '');
          handleInputChange('ocupacion', apoderado.ocupacion);
          handleInputChange('gradoInstruccion', apoderado.grado_instruccion);
          handleInputChange('telefono', apoderado.telefono);
          handleInputChange('email', apoderado.email || '');
          handleInputChange('direccionApoderado', apoderado.direccion);
        }

        // Datos específicos para siguiente grado
        handleInputChange('estudianteId', estudiante.id);
        handleInputChange('gradoActual', estudiante.grado_actual.toString());
        handleInputChange('gradoSiguiente', (estudiante.grado_actual + 1).toString());

        // Guardar el resultado completo para mostrar información adicional
        setResultadoBusqueda(resultado.data);
        toast.success('Estudiante encontrado. Puede ser promovido al siguiente grado.');
      } else {
        setErrorBusqueda(resultado.message);
        toast.error(resultado.message);
      }
    } catch (error) {
      console.error('Error al buscar estudiante:', error);
      setErrorBusqueda('Error al buscar estudiante. Intente nuevamente.');
      toast.error('Error al buscar estudiante');
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
        >
          <GraduationCap size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Promoción al Siguiente Grado
        </h2>
      </div>

      {/* Sección de búsqueda por DNI */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white">
          Buscar Estudiante
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <FormField
              label="DNI del Estudiante"
              name="dniBusqueda"
              type="text"
              value={dniBusqueda}
              onChange={(e) => setDniBusqueda(e.target.value)}
              maxLength={8}
              pattern="[0-9]{8}"
              placeholder="Ingrese el DNI para buscar"
            />
          </div>
          <div className="pt-6">
            <button
              type="button"
              onClick={buscarEstudiante}
              disabled={buscando || !dniBusqueda || dniBusqueda.length !== 8}
              className={`h-[42px] px-4 py-2 rounded-lg font-medium transition-colors ${
                buscando || !dniBusqueda || dniBusqueda.length !== 8
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : `bg-${themeColors.text} text-white hover:bg-${themeColors.textDark}`
              }`}
            >
              {buscando ? (
                <div className="flex items-center">
                  <Loader2 size={16} className="animate-spin mr-2" />
                  <span>Buscando...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Search size={16} className="mr-2" />
                  <span>Buscar</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {errorBusqueda && (
          <div className="mt-2 text-red-500 text-sm flex items-center">
            <AlertCircle size={16} className="mr-1" />
            {errorBusqueda}
          </div>
        )}
      </div>

      {/* Resultado de la búsqueda */}
      {resultadoBusqueda && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center mb-3">
            <CheckCircle2 size={20} className="text-green-600 dark:text-green-400 mr-2" />
            <h3 className="text-lg font-medium text-green-800 dark:text-green-400">
              Estudiante Encontrado
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserCircle size={18} className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Nombre:</div>
                <div className="font-medium">{resultadoBusqueda.estudiante.nombre}</div>
              </div>
            </div>

            <div className="flex items-center">
              <School size={18} className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Grado Actual:</div>
                <div className="font-medium">{resultadoBusqueda.estudiante.grado_actual}° Grado</div>
              </div>
            </div>

            <div className="flex items-center">
              <ArrowRight size={18} className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Grado Siguiente:</div>
                <div className="font-medium">{resultadoBusqueda.estudiante.grado_actual + 1}° Grado</div>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar size={18} className="text-gray-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Año Escolar:</div>
                <div className="font-medium">{new Date().getFullYear() + 1}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            {resultadoBusqueda.promocion.mensaje}
          </div>
        </div>
      )}

      {/* Campos ocultos para almacenar los datos del estudiante */}
      <div className="hidden">
        <input type="hidden" name="estudianteId" value={formData.estudianteId || ''} />
        <input type="hidden" name="gradoActual" value={formData.gradoActual || ''} />
        <input type="hidden" name="gradoSiguiente" value={formData.gradoSiguiente || ''} />
      </div>
    </div>
  );
};

export default PromocionForm;
