import { useState } from 'react';
import { Search, Loader2, User, Calendar, School, MapPin } from 'lucide-react';
import FormField from './FormField';
import { MATRICULA_TYPES, THEME_COLORS } from '../utils/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

/**
 * Componente para consultar matrículas
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onConsultaCompleta - Función para manejar la consulta completa
 * @returns {JSX.Element} Componente de consulta de matrícula
 */
const ConsultaMatricula = ({ onConsultaCompleta }) => {
  const [dniEstudiante, setDniEstudiante] = useState('');
  const [anioEscolar, setAnioEscolar] = useState('');
  const [consultando, setConsultando] = useState(false);
  const [resultadoConsulta, setResultadoConsulta] = useState(null);
  
  // Por defecto, usar el tema azul (matrícula nueva)
  const themeColors = THEME_COLORS[MATRICULA_TYPES.NUEVA];

  const handleConsulta = async () => {
    if (!dniEstudiante || dniEstudiante.length !== 8) {
      toast.warning('Ingrese un DNI válido de 8 dígitos');
      return;
    }

    setConsultando(true);
    setResultadoConsulta(null);
    console.log('Iniciando consulta con DNI:', dniEstudiante, 'y año escolar:', anioEscolar || 'no especificado');
    
    try {
      console.log('Realizando petición a:', `http://localhost:3000/api/estudiantes/resumen?dni=${dniEstudiante}${anioEscolar ? `&anio_escolar=${anioEscolar}` : ''}`);
      
      // Usar el endpoint de resumen directamente con la URL completa
      const response = await axios.get(`http://localhost:3000/api/estudiantes/resumen`, {
        params: { 
          dni: dniEstudiante,
          anio_escolar: anioEscolar || undefined
        }
      });
      
      console.log('Respuesta recibida:', response.data);
      
      if (response.data && response.data.estudiante) {
        console.log('Estudiante encontrado:', response.data.estudiante);
        setResultadoConsulta(response.data);
        toast.success('Estudiante encontrado');
        if (onConsultaCompleta) onConsultaCompleta(response.data);
      } else {
        console.log('No se encontró información del estudiante en la respuesta:', response.data);
        toast.error('No se encontró información del estudiante');
      }
    } catch (error) {
      console.error('Error completo al consultar estudiante:', error);
      console.log('Mensaje de error:', error.message);
      console.log('Respuesta del servidor:', error.response?.data);
      console.log('Estado HTTP:', error.response?.status);
      toast.error(error.response?.data?.message || 'Error al consultar información del estudiante');
    } finally {
      setConsultando(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Consulta de Matrícula
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormField
          label="DNI del Estudiante"
          name="dniEstudiante"
          type="text"
          value={dniEstudiante}
          onChange={(e) => setDniEstudiante(e.target.value)}
          required
          maxLength={8}
          pattern="[0-9]{8}"
          placeholder="Ingrese el DNI del estudiante"
        />
        
        <FormField
          label="Año Escolar (opcional)"
          name="anioEscolar"
          type="text"
          value={anioEscolar}
          onChange={(e) => setAnioEscolar(e.target.value)}
          placeholder="Ej: 2023"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleConsulta}
          disabled={consultando || !dniEstudiante || dniEstudiante.length !== 8}
          className={`h-[42px] px-6 py-2 rounded-lg font-medium transition-colors ${
            consultando || !dniEstudiante || dniEstudiante.length !== 8
              ? 'bg-blue-300 text-gray-500 cursor-not-allowed'
              : `bg-blue-500 text-white hover:bg-blue-700`
          }`}
        >
          {consultando ? (
            <div className="flex items-center">
              <Loader2 size={16} className="animate-spin mr-2" />
              <span>Consultando...</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Search size={16} className="mr-2" />
              <span>Consultar</span>
            </div>
          )}
        </button>
      </div>

      {/* Mostrar resultados de la consulta */}
      {resultadoConsulta && resultadoConsulta.estudiante && (
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4">
            Información del Estudiante
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <User size={18} className="text-blue-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Nombre:</div>
                <div className="font-medium">{resultadoConsulta.estudiante.nombre}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar size={18} className="text-blue-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">DNI:</div>
                <div className="font-medium">{resultadoConsulta.estudiante.dni}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <School size={18} className="text-blue-500 mr-2" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Grado Actual:</div>
                <div className="font-medium">{resultadoConsulta.estudiante.grado_actual}° Grado</div>
              </div>
            </div>
            
            {resultadoConsulta.historial && resultadoConsulta.historial.ultimo_anio && (
              <div className="flex items-center">
                <Calendar size={18} className="text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Año Escolar:</div>
                  <div className="font-medium">{resultadoConsulta.historial.ultimo_anio}</div>
                </div>
              </div>
            )}
            
            {resultadoConsulta.estudiante.direccion && (
              <div className="flex items-center">
                <MapPin size={18} className="text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Dirección:</div>
                  <div className="font-medium">{resultadoConsulta.estudiante.direccion}</div>
                </div>
              </div>
            )}
            
            {resultadoConsulta.promocion && resultadoConsulta.promocion.puede_promocionar && (
              <div className="flex items-center">
                <School size={18} className="text-blue-500 mr-2" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Promoción:</div>
                  <div className="font-medium text-green-600">
                    Puede pasar al siguiente grado
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultaMatricula;
