import { motion } from 'framer-motion';
import {
  User, AlertCircle, MessageSquare, ChevronRight,
  FileText, CheckCircle, XCircle, Info
} from 'lucide-react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar un mensaje individual en el chatbot
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.message - Datos del mensaje
 * @param {Function} props.formatTimestamp - Función para formatear la marca de tiempo
 * @returns {JSX.Element} Componente MessageItem
 */
const MessageItem = ({ message, formatTimestamp, onOptionSelect }) => {
  const isBot = message.sender === 'bot';

  // Renderizar diferentes tipos de mensajes
  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <p className="chatbot2-message-text">{message.content}</p>;

      case 'error':
        return (
          <div className="chatbot2-message-error">
            <AlertCircle size={16} />
            <p>{message.content}</p>
          </div>
        );

      case 'loading':
        return <p className="chatbot2-message-text">{message.content}</p>;

      case 'options':
        return (
          <div className="chatbot2-message-options">
            {message.content.map(option => (
              <button
                key={option.id}
                className="chatbot2-option-button"
                onClick={() => onOptionSelect && onOptionSelect(option.action)}
              >
                <ChevronRight size={14} />
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        );

      case 'student-data':
        return renderStudentData(message.content);

      case 'guardian-data':
        return renderGuardianData(message.content);

      case 'documents-list':
        return renderDocumentsList(message.content);

      default:
        return <p className="chatbot2-message-text">{message.content}</p>;
    }
  };

  /**
   * Renderiza los datos de un estudiante
   * @param {Object} student - Datos del estudiante
   * @returns {JSX.Element} Componente con los datos del estudiante
   */
  const renderStudentData = (student) => {
    return (
      <div className="chatbot2-data-card">
        <div className="chatbot2-data-header">
          <h3>Información del Estudiante</h3>
        </div>
        <div className="chatbot2-data-body">
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">Nombre:</span>
            <span className="chatbot2-data-value">{student.nombre}</span>
          </div>
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">DNI:</span>
            <span className="chatbot2-data-value">{student.dni}</span>
          </div>
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">Grado actual:</span>
            <span className="chatbot2-data-value">{student.grado_actual}° {student.seccion || ''}</span>
          </div>
          {student.matricula && student.matricula.tipo !== 'No disponible' && student.grado_solicitado && (
            <div className="chatbot2-data-row">
              <span className="chatbot2-data-label">Grado solicitado:</span>
              <span className="chatbot2-data-value">{student.grado_solicitado}°</span>
            </div>
          )}
          {student.estado && (
            <div className="chatbot2-data-row">
              <span className="chatbot2-data-label">Estado:</span>
              <span className={`chatbot2-data-value chatbot2-status-${student.estado.toLowerCase()}`}>
                {student.estado}
              </span>
            </div>
          )}
          {student.apoderado && (
            <>
              <div className="chatbot2-data-divider"></div>
              <div className="chatbot2-data-row">
                <span className="chatbot2-data-label">Apoderado:</span>
                <span className="chatbot2-data-value">{student.apoderado.nombre}</span>
              </div>
              <div className="chatbot2-data-row">
                <span className="chatbot2-data-label">Parentesco:</span>
                <span className="chatbot2-data-value">{student.apoderado.parentesco}</span>
              </div>
            </>
          )}
          {student.matricula && student.matricula.tipo !== 'No disponible' && (
            <>
              <div className="chatbot2-data-divider"></div>
              <div className="chatbot2-data-row">
                <span className="chatbot2-data-label">Matrícula:</span>
                <span className={`chatbot2-data-value chatbot2-status-${student.matricula.estado.toLowerCase()}`}>
                  {student.matricula.estado}
                </span>
              </div>
              <div className="chatbot2-data-row">
                <span className="chatbot2-data-label">Tipo:</span>
                <span className="chatbot2-data-value">{student.matricula.tipo}</span>
              </div>
              <div className="chatbot2-data-row">
                <span className="chatbot2-data-label">Año escolar:</span>
                <span className="chatbot2-data-value">{student.matricula.anio_escolar}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  /**
   * Renderiza los datos de un apoderado y sus estudiantes asociados
   * @param {Object} guardian - Datos del apoderado
   * @returns {JSX.Element} Componente con los datos del apoderado
   */
  const renderGuardianData = (guardian) => {
    return (
      <div className="chatbot2-data-card">
        <div className="chatbot2-data-header">
          <h3>Información del Apoderado</h3>
        </div>
        <div className="chatbot2-data-body">
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">Nombre:</span>
            <span className="chatbot2-data-value">{guardian.nombre}</span>
          </div>
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">DNI:</span>
            <span className="chatbot2-data-value">{guardian.dni}</span>
          </div>
          <div className="chatbot2-data-row">
            <span className="chatbot2-data-label">Teléfono:</span>
            <span className="chatbot2-data-value">{guardian.telefono}</span>
          </div>

          {guardian.estudiantes && guardian.estudiantes.length > 0 && (
            <>
              <div className="chatbot2-data-divider"></div>
              <h4 className="chatbot2-data-subtitle">Estudiantes asociados ({guardian.estudiantes.length})</h4>

              {guardian.estudiantes.map((estudiante, index) => (
                <div key={estudiante.id || index} className="chatbot2-data-student-card">
                  <div className="chatbot2-data-row">
                    <span className="chatbot2-data-label">Nombre:</span>
                    <span className="chatbot2-data-value">{estudiante.nombre}</span>
                  </div>
                  <div className="chatbot2-data-row">
                    <span className="chatbot2-data-label">DNI:</span>
                    <span className="chatbot2-data-value">{estudiante.dni}</span>
                  </div>
                  <div className="chatbot2-data-row">
                    <span className="chatbot2-data-label">Grado:</span>
                    <span className="chatbot2-data-value">{estudiante.grado_actual}° {estudiante.seccion || ''}</span>
                  </div>
                  {estudiante.matricula && (
                    <div className="chatbot2-data-row">
                      <span className="chatbot2-data-label">Matrícula:</span>
                      <span className={`chatbot2-data-value chatbot2-status-${estudiante.matricula.estado.toLowerCase()}`}>
                        {estudiante.matricula.estado}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    );
  };

  /**
   * Renderiza una lista de documentos requeridos
   * @param {Object} data - Datos de los documentos
   * @returns {JSX.Element} Componente con la lista de documentos
   */
  const renderDocumentsList = (data) => {
    return (
      <div className="chatbot2-data-card">
        <div className="chatbot2-data-header">
          <div className="chatbot2-data-header-icon">
            <FileText size={18} />
          </div>
          <h3>Documentos para {data.tipo}</h3>
        </div>
        <div className="chatbot2-data-body">
          <div className="chatbot2-documents-info">
            <div className="chatbot2-documents-count">
              <span>{data.documentos.length}</span> documentos requeridos
            </div>
            {data.descripcion && (
              <div className="chatbot2-documents-description">
                {data.descripcion}
              </div>
            )}
          </div>

          <div className="chatbot2-documents-list">
            {data.documentos.map((doc, index) => (
              <div key={index} className="chatbot2-document-item">
                <div className="chatbot2-document-icon">
                  <FileText size={16} />
                </div>
                <div className="chatbot2-document-name">
                  {doc.nombre}
                </div>
                {doc.estado && (
                  <div className={`chatbot2-document-status chatbot2-status-${doc.estado}`}>
                    {doc.estado === 'entregado' ? (
                      <CheckCircle size={16} />
                    ) : doc.estado === 'pendiente' ? (
                      <Info size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {data.nota && (
            <div className="chatbot2-documents-note">
              <Info size={14} />
              <span>{data.nota}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className={`chatbot2-message ${isBot ? 'chatbot2-bot-message' : 'chatbot2-user-message'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isBot && (
        <div className="chatbot2-message-avatar">
          {message.icon || <User size={20} />}
        </div>
      )}
      <div className="chatbot2-message-content">
        <div className="chatbot2-message-bubble">
          {renderMessageContent()}
        </div>
        <div className="chatbot2-message-time">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </motion.div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    icon: PropTypes.node
  }).isRequired,
  formatTimestamp: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func
};

MessageItem.defaultProps = {
  onOptionSelect: null
};

export default MessageItem;
