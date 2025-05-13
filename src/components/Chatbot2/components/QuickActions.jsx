import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, User, Users, School, Calendar,
  Search, HelpCircle, ChevronRight, ChevronLeft,
  ChevronDown, ChevronUp
} from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Categorías de acciones rápidas
 */
const actionCategories = [
  {
    id: 'consultas',
    name: 'Consultas',
    icon: <Search size={16} />,
    actions: [
      {
        id: 'consulta-estudiante',
        text: 'Consultar estudiante por DNI',
        prompt: 'Buscar estudiante con DNI 12345678',
        icon: <User size={14} />
      },
      {
        id: 'consulta-apoderado',
        text: 'Consultar apoderado y sus estudiantes',
        prompt: 'Buscar apoderado con DNI 87654321',
        icon: <Users size={14} />
      },
      {
        id: 'consulta-nueva',
        text: 'Verificar estado de matrícula nueva',
        prompt: 'Quiero saber el estado de matrícula nueva de mi hijo con DNI 12345678',
        icon: <School size={14} />
      },
      {
        id: 'consulta-traslado',
        text: 'Verificar estado de traslado',
        prompt: 'Quiero saber el estado de traslado de mi hijo con DNI 12345678',
        icon: <School size={14} />
      },
      {
        id: 'consulta-siguiente',
        text: 'Verificar estado de siguiente grado',
        prompt: 'Quiero saber el estado de matrícula siguiente grado de mi hijo con DNI 12345678',
        icon: <School size={14} />
      }
    ]
  },
  {
    id: 'documentos',
    name: 'Documentos',
    icon: <FileText size={16} />,
    actions: [
      {
        id: 'docs-nueva',
        text: 'Documentos para matrícula nueva',
        prompt: '¿Qué documentos necesito para matrícula nueva?',
        icon: <FileText size={14} />
      },
      {
        id: 'docs-traslado',
        text: 'Documentos para traslado',
        prompt: '¿Qué documentos necesito para traslado?',
        icon: <FileText size={14} />
      },
      {
        id: 'docs-siguiente',
        text: 'Documentos para siguiente grado',
        prompt: '¿Qué documentos necesito para siguiente grado?',
        icon: <FileText size={14} />
      }
    ]
  },
  {
    id: 'matricula',
    name: 'Matrícula',
    icon: <School size={16} />,
    actions: [
      {
        id: 'proceso-nueva',
        text: 'Proceso de matrícula nueva',
        prompt: '¿Cómo es el proceso de matrícula nueva?',
        icon: <School size={14} />
      },
      {
        id: 'proceso-traslado',
        text: 'Proceso de traslado',
        prompt: '¿Cómo es el proceso de traslado?',
        icon: <School size={14} />
      },
      {
        id: 'proceso-siguiente',
        text: 'Proceso de siguiente grado',
        prompt: '¿Cómo es el proceso de matrícula para siguiente grado?',
        icon: <School size={14} />
      },
      {
        id: 'estado-nueva',
        text: 'Verificar estado de matrícula nueva',
        prompt: 'Quiero verificar el estado de matrícula nueva',
        icon: <Search size={14} />
      },
      {
        id: 'estado-traslado',
        text: 'Verificar estado de traslado',
        prompt: 'Quiero verificar el estado de traslado',
        icon: <Search size={14} />
      },
      {
        id: 'estado-siguiente',
        text: 'Verificar estado de siguiente grado',
        prompt: 'Quiero verificar el estado de matrícula siguiente grado',
        icon: <Search size={14} />
      }
    ]
  },
  {
    id: 'fechas',
    name: 'Fechas',
    icon: <Calendar size={16} />,
    actions: [
      {
        id: 'fechas-matricula',
        text: 'Fechas de matrícula',
        prompt: '¿Cuáles son las fechas de matrícula?',
        icon: <Calendar size={14} />
      },
      {
        id: 'anio-escolar',
        text: 'Año escolar actual',
        prompt: '¿Cuál es el año escolar actual?',
        icon: <Calendar size={14} />
      }
    ]
  },
  {
    id: 'ayuda',
    name: 'Ayuda',
    icon: <HelpCircle size={16} />,
    actions: [
      {
        id: 'ayuda-general',
        text: '¿Qué puedes hacer?',
        prompt: '¿Qué puedes hacer?',
        icon: <HelpCircle size={14} />
      }
    ]
  }
];

/**
 * Componente de acciones rápidas para el chatbot
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onActionSelect - Función a ejecutar cuando se selecciona una acción
 * @param {Function} props.onActionAutocomplete - Función para autocompletar el texto sin enviarlo
 * @returns {JSX.Element} Componente QuickActions
 */
const QuickActions = forwardRef(({ onActionSelect, onActionAutocomplete }, ref) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Exponer métodos a través de la referencia
  useImperativeHandle(ref, () => ({
    collapse: () => setIsCollapsed(true)
  }));

  const activeCategory = actionCategories[activeCategoryIndex];

  const handlePrevCategory = () => {
    setActiveCategoryIndex(prev =>
      prev === 0 ? actionCategories.length - 1 : prev - 1
    );
  };

  const handleNextCategory = () => {
    setActiveCategoryIndex(prev =>
      prev === actionCategories.length - 1 ? 0 : prev + 1
    );
  };

  const handleActionClick = (prompt) => {
    // Usar la función de autocompletado en lugar de enviar directamente
    if (onActionAutocomplete) {
      onActionAutocomplete(prompt);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="chatbot2-quick-actions">
      <div className="chatbot2-quick-actions-header">
        <button
          className="chatbot2-category-nav-button"
          onClick={handlePrevCategory}
          aria-label="Categoría anterior"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="chatbot2-category-title">
          {activeCategory.icon}
          <span>{activeCategory.name}</span>
        </div>

        <div className="chatbot2-header-actions">
          <button
            className="chatbot2-category-nav-button"
            onClick={handleNextCategory}
            aria-label="Categoría siguiente"
          >
            <ChevronRight size={16} />
          </button>
          
          <button
            className="chatbot2-category-nav-button"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? "Expandir acciones" : "Colapsar acciones"}
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="chatbot2-quick-actions-list-vertical">
          {activeCategory.actions.map(action => (
            <motion.button
              key={action.id}
              className="chatbot2-action-button-full-width"
              onClick={() => handleActionClick(action.prompt)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="chatbot2-action-icon">{action.icon}</span>
              <span className="chatbot2-action-text">{action.text}</span>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}); // Close forwardRef

QuickActions.propTypes = {
  onActionSelect: PropTypes.func.isRequired,
  onActionAutocomplete: PropTypes.func.isRequired
};

export default QuickActions;







