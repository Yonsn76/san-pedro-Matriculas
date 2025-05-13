import React from 'react';
import { MATRICULA_TYPES, THEME_COLORS } from '../utils/constants';
import { UserPlus, ArrowRightLeft, ArrowUp, Search } from 'lucide-react';

/**
 * Componente para seleccionar el tipo de matrícula
 * @param {Object} props - Propiedades del componente
 * @param {string} props.selectedType - Tipo de matrícula seleccionado
 * @param {Function} props.onSelect - Función para manejar la selección
 * @param {Function} props.onConsultClick - Función para manejar el clic en consultar
 * @returns {JSX.Element} Componente de selección de tipo de matrícula
 */
const TipoMatriculaSelector = ({ selectedType, onSelect, onConsultClick }) => {
  const matriculaTypes = [
    {
      id: MATRICULA_TYPES.NUEVA,
      title: 'Matrícula Nueva',
      description: 'Para estudiantes que ingresan por primera vez a la institución',
      icon: <UserPlus size={32} />,
      color: THEME_COLORS[MATRICULA_TYPES.NUEVA]
    },
    {
      id: MATRICULA_TYPES.TRASLADO,
      title: 'Matrícula por Traslado',
      description: 'Para estudiantes que provienen de otra institución educativa',
      icon: <ArrowRightLeft size={32} />,
      color: THEME_COLORS[MATRICULA_TYPES.TRASLADO]
    },
    {
      id: MATRICULA_TYPES.SIGUIENTE_GRADO,
      title: 'Siguiente Grado',
      description: 'Para estudiantes que ya están matriculados y pasan al siguiente grado',
      icon: <ArrowUp size={32} />,
      color: THEME_COLORS[MATRICULA_TYPES.SIGUIENTE_GRADO]
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sistema de Matrícula Escolar
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Seleccione el tipo de matrícula que desea realizar o consulte una matrícula existente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {matriculaTypes.map((type) => (
          <div
            key={type.id}
            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              selectedType === type.id ? 'ring-2 ring-offset-2' : ''
            }`}
            style={{ 
              ringColor: type.color.primary,
              boxShadow: selectedType === type.id ? `0 0 0 2px ${type.color.primary}` : ''
            }}
            onClick={() => onSelect(type.id)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${type.color.gradient} opacity-90`}></div>
            
            <div className="relative p-6 h-full flex flex-col items-center text-white">
              <div className="mb-4 opacity-90">{type.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-center">{type.title}</h3>
              <p className="text-sm text-center opacity-90">{type.description}</p>
              
              <button 
                className="mt-6 px-4 py-2 rounded-full bg-white font-medium text-sm transition-all duration-300 hover:shadow-md"
                style={{ color: type.color.primary }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(type.id);
                }}
              >
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onConsultClick}
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors shadow-sm"
        >
          <Search size={20} className="mr-2" />
          Consultar matrícula existente
        </button>
      </div>
    </div>
  );
};

export default TipoMatriculaSelector;
