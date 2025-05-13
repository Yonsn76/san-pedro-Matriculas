import { useState } from 'react';
import { MATRICULA_TYPES, THEME_COLORS, SELECT_OPTIONS } from '../utils/constants';
import { UserCircle, Phone, Mail, MapPin, Briefcase, GraduationCap, Users, Search, UserPlus, Loader2 } from 'lucide-react';
import FormField from './FormField';
import matriculaService from '../services/matriculaService';
import { toast } from 'react-toastify';

/**
 * Componente para el formulario de datos del apoderado
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en los campos
 * @param {string} props.tipoMatricula - Tipo de matrícula
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.touchedFields - Campos que han sido tocados
 * @returns {JSX.Element} Componente de formulario de apoderado
 */
const ApoderadoForm = ({ formData, handleInputChange, tipoMatricula, errors, touchedFields }) => {
  // Si es matrícula de siguiente grado, no mostrar el formulario
  if (tipoMatricula === MATRICULA_TYPES.SIGUIENTE_GRADO) {
    return null;
  }

  // Estados para el manejo de apoderados
  const [tipoApoderado, setTipoApoderado] = useState('nuevo'); // 'nuevo' o 'existente'
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState('');

  const themeColors = THEME_COLORS[tipoMatricula] || THEME_COLORS[MATRICULA_TYPES.NUEVA];

  /**
   * Busca un apoderado por DNI
   */
  const buscarApoderado = async () => {
    if (!formData.dniApoderado || formData.dniApoderado.length !== 8) {
      toast.warning('Ingrese un DNI válido de 8 dígitos');
      return;
    }

    setBuscando(true);
    setErrorBusqueda('');

    try {
      const resultado = await matriculaService.buscarApoderadoPorDNI(formData.dniApoderado);

      if (resultado.success) {
        // Actualizar los campos del formulario con los datos del apoderado
        const apoderado = resultado.data;
        handleInputChange('nombreApoderado', apoderado.nombre);
        handleInputChange('parentesco', apoderado.parentesco || '');
        handleInputChange('ocupacion', apoderado.ocupacion);
        handleInputChange('gradoInstruccion', apoderado.grado_instruccion);
        handleInputChange('telefono', apoderado.telefono);
        handleInputChange('email', apoderado.email || '');
        handleInputChange('direccionApoderado', apoderado.direccion);

        setTipoApoderado('existente');
        toast.success('Apoderado encontrado');
      } else {
        setErrorBusqueda(resultado.message);
        setTipoApoderado('nuevo');
        toast.info('No se encontró el apoderado. Puede registrarlo como nuevo.');
      }
    } catch (error) {
      console.error('Error al buscar apoderado:', error);
      setErrorBusqueda('Error al buscar apoderado. Intente nuevamente.');
      toast.error('Error al buscar apoderado');
    } finally {
      setBuscando(false);
    }
  };

  /**
   * Cambia al modo de registro de nuevo apoderado
   */
  const nuevoApoderado = () => {
    setTipoApoderado('nuevo');
    // Mantener solo el DNI, limpiar los demás campos
    const dni = formData.dniApoderado;
    handleInputChange('nombreApoderado', '');
    handleInputChange('parentesco', '');
    handleInputChange('ocupacion', '');
    handleInputChange('gradoInstruccion', '');
    handleInputChange('telefono', '');
    handleInputChange('email', '');
    handleInputChange('direccionApoderado', '');
    handleInputChange('dniApoderado', dni);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: themeColors.light, color: themeColors.primary }}
          >
            <UserCircle size={20} />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Datos del Apoderado
          </h2>
        </div>

        {/* Selector de tipo de apoderado */}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setTipoApoderado('existente')}
            className={`px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-colors ${
              tipoApoderado === 'existente'
                ? `bg-${themeColors.text} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Search size={16} className="mr-1" />
            Buscar Existente
          </button>
          <button
            type="button"
            onClick={nuevoApoderado}
            className={`px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-colors ${
              tipoApoderado === 'nuevo'
                ? `bg-${themeColors.text} text-white`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <UserPlus size={16} className="mr-1" />
            Registrar Nuevo
          </button>
        </div>
      </div>

      {/* Sección de búsqueda por DNI */}
      {tipoApoderado === 'existente' && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <FormField
                label="DNI del Apoderado"
                name="dniApoderado"
                type="text"
                value={formData.dniApoderado}
                onChange={(e) => handleInputChange('dniApoderado', e.target.value)}
                error={touchedFields.dniApoderado && errors.dniApoderado}
                required
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="Ingrese el DNI para buscar"
              />
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={buscarApoderado}
                disabled={buscando || !formData.dniApoderado || formData.dniApoderado.length !== 8}
                className={`h-[42px] px-4 py-2 rounded-lg font-medium transition-colors ${
                  buscando || !formData.dniApoderado || formData.dniApoderado.length !== 8
                    ? 'bg-emerald-300 text-gray-500 cursor-not-allowed'
                    : `bg-emerald-500 text-white hover:bg-emerald-700`
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
            <div className="mt-2 text-red-500 text-sm">
              {errorBusqueda}
            </div>
          )}
        </div>
      )}

      {/* Formulario de datos del apoderado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <FormField
            label="Nombres y Apellidos"
            name="nombreApoderado"
            type="text"
            value={formData.nombreApoderado}
            onChange={(e) => handleInputChange('nombreApoderado', e.target.value)}
            error={touchedFields.nombreApoderado && errors.nombreApoderado}
            required
            icon={<UserCircle size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.nombreApoderado}
            className={tipoApoderado === 'existente' && formData.nombreApoderado ? 'bg-gray-100' : ''}
          />
        </div>

        {tipoApoderado === 'nuevo' && (
          <div>
            <FormField
              label="DNI"
              name="dniApoderado"
              type="text"
              value={formData.dniApoderado}
              onChange={(e) => handleInputChange('dniApoderado', e.target.value)}
              error={touchedFields.dniApoderado && errors.dniApoderado}
              required
              maxLength={8}
              pattern="[0-9]{8}"
            />
          </div>
        )}

        <div className={tipoApoderado === 'nuevo' ? '' : 'md:col-span-2'}>
          <FormField
            label="Parentesco"
            name="parentesco"
            type="select"
            value={formData.parentesco}
            onChange={(e) => handleInputChange('parentesco', e.target.value)}
            error={touchedFields.parentesco && errors.parentesco}
            required
            options={SELECT_OPTIONS.PARENTESCO}
            icon={<Users size={18} style={{ color: themeColors.primary }} />}
          />
        </div>

        <div>
          <FormField
            label="Ocupación"
            name="ocupacion"
            type="text"
            value={formData.ocupacion}
            onChange={(e) => handleInputChange('ocupacion', e.target.value)}
            error={touchedFields.ocupacion && errors.ocupacion}
            required
            icon={<Briefcase size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.ocupacion}
            className={tipoApoderado === 'existente' && formData.ocupacion ? 'bg-gray-100' : ''}
          />
        </div>

        <div>
          <FormField
            label="Grado de Instrucción"
            name="gradoInstruccion"
            type="select"
            value={formData.gradoInstruccion}
            onChange={(e) => handleInputChange('gradoInstruccion', e.target.value)}
            error={touchedFields.gradoInstruccion && errors.gradoInstruccion}
            required
            options={SELECT_OPTIONS.GRADO_INSTRUCCION}
            icon={<GraduationCap size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.gradoInstruccion}
            className={tipoApoderado === 'existente' && formData.gradoInstruccion ? 'bg-gray-100' : ''}
          />
        </div>

        <div>
          <FormField
            label="Teléfono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleInputChange('telefono', e.target.value)}
            error={touchedFields.telefono && errors.telefono}
            required
            icon={<Phone size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.telefono}
            className={tipoApoderado === 'existente' && formData.telefono ? 'bg-gray-100' : ''}
          />
        </div>

        <div>
          <FormField
            label="Email (opcional)"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={touchedFields.email && errors.email}
            icon={<Mail size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.email}
            className={tipoApoderado === 'existente' && formData.email ? 'bg-gray-100' : ''}
          />
        </div>

        <div className="col-span-2">
          <FormField
            label="Dirección"
            name="direccionApoderado"
            type="text"
            value={formData.direccionApoderado}
            onChange={(e) => handleInputChange('direccionApoderado', e.target.value)}
            error={touchedFields.direccionApoderado && errors.direccionApoderado}
            required
            icon={<MapPin size={18} style={{ color: themeColors.primary }} />}
            disabled={tipoApoderado === 'existente' && formData.direccionApoderado}
            className={tipoApoderado === 'existente' && formData.direccionApoderado ? 'bg-gray-100' : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default ApoderadoForm;
