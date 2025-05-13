// Componente para el formulario de datos del estudiante
import { MATRICULA_TYPES, THEME_COLORS, SELECT_OPTIONS } from '../utils/constants';
import { User, Calendar, MapPin, GraduationCap, Building, Info } from 'lucide-react';
import FormField from './FormField';

/**
 * Componente para el formulario de datos del estudiante
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en los campos
 * @param {string} props.tipoMatricula - Tipo de matrícula
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.touchedFields - Campos que han sido tocados
 * @returns {JSX.Element} Componente de formulario de estudiante
 */
const EstudianteForm = ({ formData, handleInputChange, tipoMatricula, errors, touchedFields }) => {
  const themeColors = THEME_COLORS[tipoMatricula] || THEME_COLORS[MATRICULA_TYPES.NUEVA];

  // Renderizar formulario para matrícula de siguiente grado
  if (tipoMatricula === MATRICULA_TYPES.SIGUIENTE_GRADO) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
          >
            <User size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Información del Estudiante
          </h2>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-start">
          <Info size={20} className="text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Para matricular a un estudiante en el siguiente grado, busque al estudiante por su DNI en la sección de "Promoción al Siguiente Grado".
              Los datos se autocompletarán automáticamente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* El ID del estudiante se maneja automáticamente y se guarda en un campo oculto */}

          <div>
            <FormField
              label="Nombres y Apellidos"
              name="nombreEstudiante"
              type="text"
              value={formData.nombreEstudiante}
              onChange={(e) => handleInputChange('nombreEstudiante', e.target.value)}
              error={touchedFields.nombreEstudiante && errors.nombreEstudiante}
              required
              readOnly
              className="bg-gray-100"
              icon={<User size={18} style={{ color: themeColors.primary }} />}
            />
          </div>

          <div>
            <FormField
              label="DNI"
              name="dniEstudiante"
              type="text"
              value={formData.dniEstudiante}
              onChange={(e) => handleInputChange('dniEstudiante', e.target.value)}
              error={touchedFields.dniEstudiante && errors.dniEstudiante}
              required
              readOnly
              className="bg-gray-100"
              maxLength={8}
              pattern="[0-9]{8}"
            />
          </div>

          <div>
            <FormField
              label="Grado Actual"
              name="gradoActual"
              type="text"
              value={formData.gradoActual ? `${formData.gradoActual}° Grado` : ''}
              readOnly
              className="bg-gray-100"
              icon={<GraduationCap size={18} style={{ color: themeColors.primary }} />}
            />
          </div>

          <div>
            <FormField
              label="Grado Siguiente"
              name="gradoSiguiente"
              type="text"
              value={formData.gradoSiguiente ? `${formData.gradoSiguiente}° Grado` : ''}
              readOnly
              className="bg-gray-100"
              icon={<GraduationCap size={18} style={{ color: themeColors.primary }} />}
            />
          </div>

          <div>
            <FormField
              label="Año Escolar Actual"
              name="anioEscolarActual"
              type="text"
              value={formData.anioEscolarActual}
              readOnly
              className="bg-gray-100"
              icon={<Calendar size={18} style={{ color: themeColors.primary }} />}
            />
          </div>

          <div>
            <FormField
              label="Año Escolar Siguiente"
              name="anioEscolarSiguiente"
              type="text"
              value={formData.anioEscolarSiguiente}
              readOnly
              className="bg-gray-100"
              icon={<Calendar size={18} style={{ color: themeColors.primary }} />}
            />
          </div>
        </div>

        {/* Campo oculto para el ID del estudiante */}
        <input type="hidden" name="estudianteId" value={formData.estudianteId || ''} />
      </div>
    );
  }

  // Formulario para matrícula nueva o traslado
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
        >
          <User size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Datos del Estudiante
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <FormField
            label="Nombres y Apellidos"
            name="nombreEstudiante"
            type="text"
            value={formData.nombreEstudiante}
            onChange={(e) => handleInputChange('nombreEstudiante', e.target.value)}
            error={touchedFields.nombreEstudiante && errors.nombreEstudiante}
            required
            icon={<User size={18} style={{ color: themeColors.primary }} />}
          />
        </div>

        <div>
          <FormField
            label="DNI"
            name="dniEstudiante"
            type="text"
            value={formData.dniEstudiante}
            onChange={(e) => handleInputChange('dniEstudiante', e.target.value)}
            error={touchedFields.dniEstudiante && errors.dniEstudiante}
            required
            maxLength={8}
            pattern="[0-9]{8}"
          />
        </div>

        <div>
          <FormField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
            error={touchedFields.fechaNacimiento && errors.fechaNacimiento}
            required
            icon={<Calendar size={18} style={{ color: themeColors.primary }} />}
          />
        </div>

        <div>
          <FormField
            label="Género"
            name="genero"
            type="select"
            value={formData.genero}
            onChange={(e) => handleInputChange('genero', e.target.value)}
            error={touchedFields.genero && errors.genero}
            required
            options={SELECT_OPTIONS.GENERO}
          />
        </div>

        <div>
          <FormField
            label="Grado Solicitado"
            name="gradoSolicitado"
            type="select"
            value={formData.gradoSolicitado}
            onChange={(e) => handleInputChange('gradoSolicitado', e.target.value)}
            error={touchedFields.gradoSolicitado && errors.gradoSolicitado}
            required
            options={SELECT_OPTIONS.GRADO}
            icon={<GraduationCap size={18} style={{ color: themeColors.primary }} />}
          />
        </div>

        <div className="col-span-2">
          <FormField
            label="Dirección"
            name="direccion"
            type="text"
            value={formData.direccion}
            onChange={(e) => handleInputChange('direccion', e.target.value)}
            error={touchedFields.direccion && errors.direccion}
            required
            icon={<MapPin size={18} style={{ color: themeColors.primary }} />}
          />
        </div>

        {tipoMatricula === MATRICULA_TYPES.TRASLADO && (
          <>
            <div className="col-span-2">
              <FormField
                label="Colegio Anterior"
                name="colegioAnterior"
                type="text"
                value={formData.colegioAnterior}
                onChange={(e) => handleInputChange('colegioAnterior', e.target.value)}
                error={touchedFields.colegioAnterior && errors.colegioAnterior}
                required
                icon={<Building size={18} style={{ color: themeColors.primary }} />}
              />
            </div>

            <div className="col-span-2">
              <FormField
                label="Motivo de Traslado"
                name="motivoTraslado"
                type="textarea"
                value={formData.motivoTraslado}
                onChange={(e) => handleInputChange('motivoTraslado', e.target.value)}
                error={touchedFields.motivoTraslado && errors.motivoTraslado}
                rows={3}
                placeholder="Describa brevemente el motivo del traslado..."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EstudianteForm;
