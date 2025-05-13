import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, ChevronDown, ChevronUp, Send,
  User, FileText, School, Calendar, Search, Database,
  Loader2, CheckCircle, AlertCircle, Info
} from 'lucide-react';
import {
  sendMessage,
  fetchStudentByDni,
  fetchGuardianByDni,
  fetchDocumentsList,
  fetchSolicitudesNuevaByDni,
  fetchSolicitudesTrasladoByDni,
  fetchSolicitudesSiguienteByDni
} from './services/api';
import { formatTimestamp } from './utils/dateUtils';
import QuickActions from './components/QuickActions';
import MessageItem from './components/MessageItem';
import './styles/chatbot2.css';

/**
 * Chatbot2 - Componente principal del chatbot mejorado
 * @returns {JSX.Element} Componente Chatbot2
 */
const Chatbot2 = () => {
  // Estados principales
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSearch, setActiveSearch] = useState(null);
  
  // Referencias
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const quickActionsRef = useRef(null);
  
  // Eliminamos las referencias y estados relacionados con el redimensionamiento

  // Mensaje de bienvenida al iniciar el chatbot
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          type: 'text',
          content: '👋 ¡Hola! Soy el asistente virtual del Colegio San Pedro. Estoy aquí para ayudarte con:',
          sender: 'bot',
          timestamp: new Date(),
          icon: <Info size={16} />
        },
        {
          id: 'welcome-options',
          type: 'options',
          content: [
            { id: 'option-1', text: 'Consultar estudiante por DNI', action: 'Quiero consultar un estudiante por DNI' },
            { id: 'option-2', text: 'Consultar apoderado y sus estudiantes', action: 'Soy apoderado y quiero ver a mis estudiantes' },
            { id: 'option-3', text: 'Verificar estado de matrícula nueva', action: 'Quiero saber el estado de matrícula nueva de mi hijo' },
            { id: 'option-4', text: 'Verificar estado de traslado', action: 'Quiero saber el estado de traslado de mi hijo' },
            { id: 'option-5', text: 'Verificar estado de matrícula siguiente grado', action: 'Quiero saber el estado de matrícula siguiente grado de mi hijo' },
            { id: 'option-6', text: 'Documentos para matrícula nueva', action: 'Documentos para matrícula nueva' },
            { id: 'option-7', text: 'Documentos para traslado', action: 'Documentos para matrícula traslado' },
            { id: 'option-8', text: 'Documentos para siguiente grado', action: 'Documentos para matrícula siguiente' }
          ],
          sender: 'bot',
          timestamp: new Date(),
          icon: <Info size={16} />
        }
      ]);
    }
  }, [messages.length]);

  // Scroll automático al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isExpanded]);

  /**
   * Maneja el envío de mensajes
   * @param {Event} e - Evento de formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Referencia al componente QuickActions para plegarlo
    if (quickActionsRef.current) {
      quickActionsRef.current.collapse();
    }

    await sendUserMessage(inputMessage);
  };

  /**
   * Envía un mensaje del usuario y obtiene la respuesta
   * @param {string} text - Texto del mensaje
   */
  const sendUserMessage = async (text) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'text',
      content: text,
      sender: 'user',
      timestamp: new Date(),
      icon: <User size={16} />
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Detectar si es una consulta de DNI
      const dniMatch = text.match(/\b\d{8}\b/);

      // Detectar si es una consulta de documentos
      const docsMatch = text.toLowerCase().match(/documentos? (?:para|de) (?:matrícula )?(?:(nueva)|(traslado)|(siguiente))/);

      // Detectar si es una consulta sobre estado de matrícula
      const nuevaMatch = text.toLowerCase().match(/(?:estado|situaci[oó]n|tr[aá]mite|saber|conocer|consultar|verificar).*(?:matrícula )?nueva/);
      const trasladoMatch = text.toLowerCase().match(/(?:estado|situaci[oó]n|tr[aá]mite|saber|conocer|consultar|verificar).*(?:matrícula )?traslado/);
      const siguienteMatch = text.toLowerCase().match(/(?:estado|situaci[oó]n|tr[aá]mite|saber|conocer|consultar|verificar).*(?:matrícula )?siguiente/);

      console.log(`[DEBUG] sendUserMessage - Texto: "${text}"`);
      console.log(`[DEBUG] sendUserMessage - DNI encontrado:`, dniMatch);
      console.log(`[DEBUG] sendUserMessage - Match traslado:`, trasladoMatch);
      console.log(`[DEBUG] sendUserMessage - Incluye 'traslado':`, text.toLowerCase().includes('traslado'));
      console.log(`[DEBUG] sendUserMessage - Incluye 'verificar':`, text.toLowerCase().includes('verificar'));

      if (dniMatch) {
        // Priorizar la detección de consultas específicas con DNI
        if (nuevaMatch ||
            (text.toLowerCase().includes('nueva') &&
             !text.toLowerCase().includes('documentos'))) {
          // Consulta sobre estado de matrícula nueva
          console.log(`[DEBUG] sendUserMessage - Detectada consulta de matrícula nueva con DNI: ${dniMatch[0]}`);
          await handleStudentQuery(dniMatch[0], 'nueva');
        } else if (trasladoMatch ||
            (text.toLowerCase().includes('traslado') &&
             !text.toLowerCase().includes('documentos'))) {
          // Consulta sobre estado de traslado
          console.log(`[DEBUG] sendUserMessage - Detectada consulta de traslado con DNI: ${dniMatch[0]}`);
          await handleStudentQuery(dniMatch[0], 'traslado');
        } else if (siguienteMatch ||
            (text.toLowerCase().includes('siguiente') &&
             !text.toLowerCase().includes('documentos'))) {
          // Consulta sobre estado de matrícula siguiente grado
          console.log(`[DEBUG] sendUserMessage - Detectada consulta de siguiente grado con DNI: ${dniMatch[0]}`);
          await handleStudentQuery(dniMatch[0], 'siguiente');
        } else if (text.toLowerCase().includes('apoderado') ||
                  text.toLowerCase().includes('padre') ||
                  text.toLowerCase().includes('madre') ||
                  text.toLowerCase().includes('mis hijos') ||
                  text.toLowerCase().includes('mi hijo') ||
                  text.toLowerCase().includes('mi hija')) {
          // Consulta sobre apoderado
          await handleGuardianQuery(dniMatch[0]);
        } else if (text.toLowerCase().includes('estudiante') ||
                  text.toLowerCase().includes('hijo') ||
                  text.toLowerCase().includes('hija') ||
                  text.toLowerCase().includes('alumno') ||
                  text.toLowerCase().includes('alumna')) {
          // Consulta general sobre estudiante
          await handleStudentQuery(dniMatch[0]);
        } else {
          // Si hay un DNI pero no está claro el contexto, asumir que es estudiante
          await handleStudentQuery(dniMatch[0]);
        }
      } else if (docsMatch) {
        // Determinar el tipo de matrícula
        const tipoMatricula = docsMatch[1] ? 'nueva' : docsMatch[2] ? 'traslado' : 'siguiente';
        await handleDocumentsQuery(tipoMatricula);
      } else {
        // Consulta general
        const response = await sendMessage(text);

        const botMessage = {
          id: `bot-${Date.now()}`,
          type: 'text',
          content: response,
          sender: 'bot',
          timestamp: new Date(),
          icon: <MessageSquare size={16} />
        };

        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error al procesar mensaje:', error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'error',
        content: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, intenta nuevamente.',
        sender: 'bot',
        timestamp: new Date(),
        icon: <AlertCircle size={16} />
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja una consulta específica de estudiante por DNI
   * @param {string} dni - DNI del estudiante
   * @param {string} tipoConsulta - Tipo de consulta específica (ej: 'nueva', 'traslado', 'siguiente')
   */
  const handleStudentQuery = async (dni, tipoConsulta = null) => {
    try {
      setActiveSearch('student');

      console.log(`[DEBUG] handleStudentQuery - Iniciando consulta para DNI: ${dni}, Tipo: ${tipoConsulta}`);

      // Personalizar el mensaje de carga según el tipo de consulta
      let loadingContent = `Buscando información del estudiante con DNI ${dni}...`;
      if (tipoConsulta === 'nueva') {
        loadingContent = `Verificando estado de matrícula nueva para el estudiante con DNI ${dni}...`;
      } else if (tipoConsulta === 'traslado') {
        loadingContent = `Verificando estado de traslado para el estudiante con DNI ${dni}...`;
      } else if (tipoConsulta === 'siguiente') {
        loadingContent = `Verificando estado de matrícula siguiente grado para el estudiante con DNI ${dni}...`;
      }

      const loadingMessage = {
        id: `loading-${Date.now()}`,
        type: 'loading',
        content: loadingContent,
        sender: 'bot',
        timestamp: new Date(),
        icon: <Database size={16} />
      };

      setMessages(prev => [...prev, loadingMessage]);

      console.log(`[DEBUG] handleStudentQuery - Llamando a fetchStudentByDni con DNI: ${dni}, Tipo: ${tipoConsulta}`);
      const studentData = await fetchStudentByDni(dni, tipoConsulta);
      console.log(`[DEBUG] handleStudentQuery - Resultado de fetchStudentByDni:`, studentData);

      // Eliminar mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      if (studentData) {
        // Personalizar el mensaje según el tipo de consulta
        let responseMessage;

        // Verificar si hay información específica del tipo de matrícula consultado
        const tieneInfoEspecifica = studentData.matricula &&
                                   studentData.matricula.tipo === tipoConsulta &&
                                   studentData.matricula.estado !== 'No disponible';

        if (tipoConsulta && tieneInfoEspecifica) {
          // Mostrar información específica del tipo de matrícula
          responseMessage = {
            id: `result-${Date.now()}`,
            type: 'student-data',
            content: studentData,
            sender: 'bot',
            timestamp: new Date(),
            icon: <CheckCircle size={16} />
          };

          // Añadir mensaje adicional con detalles según el tipo de matrícula
          const estadoMatricula = studentData.matricula.estado.toLowerCase();
          let mensajeAdicional = '';
          let tipoTexto = '';

          // Determinar el texto según el tipo de matrícula
          switch (tipoConsulta) {
            case 'nueva':
              tipoTexto = 'matrícula nueva';
              break;
            case 'traslado':
              tipoTexto = 'traslado';
              break;
            case 'siguiente':
              tipoTexto = 'matrícula para el siguiente grado';
              break;
            default:
              tipoTexto = 'matrícula';
          }

          // Generar mensaje según el estado
          if (estadoMatricula === 'aprobada' || estadoMatricula === 'aprobado') {
            mensajeAdicional = `Estimado apoderado, la solicitud de ${tipoTexto} del estudiante ${studentData.nombre} ha sido APROBADA. Ya puede proceder con la matrícula para el año escolar ${studentData.matricula.anio_escolar}. Por favor, complete el proceso de matrícula en la sección correspondiente.`;
          } else if (estadoMatricula === 'pendiente') {
            mensajeAdicional = `Estimado apoderado, la solicitud de ${tipoTexto} del estudiante ${studentData.nombre} está EN PROCESO. Actualmente estamos revisando la documentación presentada. Le notificaremos cuando haya una actualización. Si tiene alguna consulta adicional, puede comunicarse con secretaría.`;
          } else if (estadoMatricula === 'rechazada' || estadoMatricula === 'rechazado') {
            mensajeAdicional = `Estimado apoderado, lamentamos informarle que la solicitud de ${tipoTexto} del estudiante ${studentData.nombre} ha sido RECHAZADA. Por favor, acérquese a secretaría para obtener más información sobre los motivos y las opciones disponibles.`;
          }

          if (mensajeAdicional) {
            const infoMessage = {
              id: `info-${Date.now()}`,
              type: 'text',
              content: mensajeAdicional,
              sender: 'bot',
              timestamp: new Date(),
              icon: <Info size={16} />
            };

            setMessages(prev => [...prev, responseMessage, infoMessage]);
            return;
          }
        } else if (tipoConsulta) {
          // No hay información específica del tipo de matrícula consultado
          let mensajeNoEncontrado = '';
          let documentosRequeridos = [];

          // Personalizar mensaje según el tipo de consulta
          switch (tipoConsulta) {
            case 'nueva':
              documentosRequeridos = [
                'Partida de nacimiento',
                'DNI del estudiante',
                'DNI del apoderado',
                'Certificado de vacunación',
                'Foto del estudiante'
              ];
              mensajeNoEncontrado = `Estimado apoderado, no se encontró ninguna solicitud de matrícula nueva para el estudiante ${studentData.nombre} con DNI ${dni}.`;
              break;
            case 'traslado':
              documentosRequeridos = [
                'Constancia de matrícula del colegio anterior',
                'Libreta de notas del colegio anterior',
                'Partida de nacimiento',
                'DNI del estudiante',
                'DNI del apoderado'
              ];
              mensajeNoEncontrado = `Estimado apoderado, no se encontró ninguna solicitud de traslado para el estudiante ${studentData.nombre} con DNI ${dni}.`;
              break;
            case 'siguiente':
              documentosRequeridos = [
                'Libreta de notas del año anterior',
                'Comprobante de pago APAFA'
              ];
              mensajeNoEncontrado = `Estimado apoderado, no se encontró ninguna solicitud de matrícula para el siguiente grado para el estudiante ${studentData.nombre} con DNI ${dni}.`;
              break;
          }

          responseMessage = {
            id: `result-${Date.now()}`,
            type: 'text',
            content: `${mensajeNoEncontrado}

Si desea iniciar un proceso de ${tipoConsulta === 'nueva' ? 'matrícula nueva' : tipoConsulta === 'traslado' ? 'traslado' : 'matrícula para el siguiente grado'}, por favor complete el formulario correspondiente en la sección de matrículas. Necesitará presentar los siguientes documentos:
${documentosRequeridos.map(doc => `- ${doc}`).join('\n')}

Para más información, puede consultar la sección de documentos para ${tipoConsulta === 'nueva' ? 'matrícula nueva' : tipoConsulta === 'traslado' ? 'traslado' : 'siguiente grado'}.`,
            sender: 'bot',
            timestamp: new Date(),
            icon: <Info size={16} />
          };
        } else {
          // Consulta general de estudiante
          responseMessage = {
            id: `result-${Date.now()}`,
            type: 'student-data',
            content: studentData,
            sender: 'bot',
            timestamp: new Date(),
            icon: <CheckCircle size={16} />
          };
        }

        setMessages(prev => [...prev, responseMessage]);
      } else {
        // Personalizar el mensaje según el tipo de consulta
        let notFoundContent = `No se encontró ningún estudiante con el DNI ${dni}.`;

        if (tipoConsulta) {
          let tipoTexto = tipoConsulta === 'nueva' ? 'matrícula nueva' :
                          tipoConsulta === 'traslado' ? 'traslado' :
                          'matrícula para el siguiente grado';

          notFoundContent = `Estimado apoderado, no se encontró ningún estudiante con el DNI ${dni} en nuestro sistema.

Para iniciar un proceso de ${tipoTexto}, primero debe registrar al estudiante en la sección de matrículas seleccionando la opción correspondiente.`;
        }

        const notFoundMessage = {
          id: `not-found-${Date.now()}`,
          type: 'error',
          content: notFoundContent,
          sender: 'bot',
          timestamp: new Date(),
          icon: <AlertCircle size={16} />
        };

        setMessages(prev => [...prev, notFoundMessage]);
      }
    } catch (error) {
      console.error('Error al consultar estudiante:', error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'error',
        content: 'Lo siento, ha ocurrido un error al consultar la información del estudiante.',
        sender: 'bot',
        timestamp: new Date(),
        icon: <AlertCircle size={16} />
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setActiveSearch(null);
    }
  };

  /**
   * Maneja una consulta específica de apoderado por DNI
   * @param {string} dni - DNI del apoderado
   */
  const handleGuardianQuery = async (dni) => {
    try {
      setActiveSearch('guardian');

      const loadingMessage = {
        id: `loading-${Date.now()}`,
        type: 'loading',
        content: `Buscando información del apoderado con DNI ${dni} y sus estudiantes asociados...`,
        sender: 'bot',
        timestamp: new Date(),
        icon: <Database size={16} />
      };

      setMessages(prev => [...prev, loadingMessage]);

      const guardianData = await fetchGuardianByDni(dni);

      // Eliminar mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      if (guardianData) {
        const resultMessage = {
          id: `result-${Date.now()}`,
          type: 'guardian-data',
          content: guardianData,
          sender: 'bot',
          timestamp: new Date(),
          icon: <CheckCircle size={16} />
        };

        // Verificar si hay estudiantes asociados
        if (guardianData.estudiantes && guardianData.estudiantes.length > 0) {
          // Agregar mensaje adicional con información de solicitudes
          let mensajeAdicional = `Estimado(a) ${guardianData.nombre}, a continuación se muestra un resumen de las solicitudes de sus estudiantes:\n\n`;

          // Procesar cada estudiante
          for (const estudiante of guardianData.estudiantes) {
            try {
              // Intentar obtener las solicitudes para este estudiante
              const solicitudesNueva = await fetchSolicitudesNuevaByDni(estudiante.dni);
              const solicitudesTraslado = await fetchSolicitudesTrasladoByDni(estudiante.dni);
              const solicitudesSiguiente = await fetchSolicitudesSiguienteByDni(estudiante.dni);

              // Calcular el total de solicitudes
              const totalSolicitudes =
                (solicitudesNueva ? solicitudesNueva.total_solicitudes : 0) +
                (solicitudesTraslado ? solicitudesTraslado.total_solicitudes : 0) +
                (solicitudesSiguiente ? solicitudesSiguiente.total_solicitudes : 0);

              if (totalSolicitudes > 0) {
                mensajeAdicional += `**${estudiante.nombre}** (DNI: ${estudiante.dni}):\n`;

                // Combinar todas las solicitudes
                let todasSolicitudes = [];

                if (solicitudesNueva && solicitudesNueva.solicitudes) {
                  solicitudesNueva.solicitudes.forEach(s => todasSolicitudes.push({
                    ...s,
                    tipo_solicitud: 'nueva'
                  }));
                }

                if (solicitudesTraslado && solicitudesTraslado.solicitudes) {
                  solicitudesTraslado.solicitudes.forEach(s => todasSolicitudes.push({
                    ...s,
                    tipo_solicitud: 'traslado'
                  }));
                }

                if (solicitudesSiguiente && solicitudesSiguiente.solicitudes) {
                  solicitudesSiguiente.solicitudes.forEach(s => todasSolicitudes.push({
                    ...s,
                    tipo_solicitud: 'siguiente'
                  }));
                }

                // Ordenar por fecha (más reciente primero)
                todasSolicitudes.sort((a, b) => new Date(b.fecha_solicitud) - new Date(a.fecha_solicitud));

                // Mostrar solicitudes recientes (máximo 3)
                const solicitudesRecientes = todasSolicitudes.slice(0, 3);

                for (const solicitud of solicitudesRecientes) {
                  const tipoTexto = solicitud.tipo_solicitud === 'nueva' ? 'Matrícula Nueva' :
                                   solicitud.tipo_solicitud === 'traslado' ? 'Traslado' :
                                   'Siguiente Grado';

                  const estadoTexto = solicitud.estado === 'aprobada' ? '✅ APROBADA' :
                                     solicitud.estado === 'pendiente' ? '⏳ PENDIENTE' :
                                     '❌ RECHAZADA';

                  mensajeAdicional += `- ${tipoTexto}: ${estadoTexto} (${new Date(solicitud.fecha_solicitud).toLocaleDateString()})\n`;
                }

                // Agregar resumen estadístico
                mensajeAdicional += `  Total: ${totalSolicitudes} solicitud(es)\n\n`;
              } else {
                mensajeAdicional += `**${estudiante.nombre}** (DNI: ${estudiante.dni}): No tiene solicitudes registradas.\n\n`;
              }
            } catch (error) {
              console.error(`Error al obtener solicitudes para estudiante ${estudiante.dni}:`, error);
              mensajeAdicional += `**${estudiante.nombre}** (DNI: ${estudiante.dni}): No se pudo obtener información de solicitudes.\n\n`;
            }
          }

          // Agregar mensaje con el resumen
          const resumenMessage = {
            id: `resumen-${Date.now()}`,
            type: 'text',
            content: mensajeAdicional,
            sender: 'bot',
            timestamp: new Date(),
            icon: <Info size={16} />
          };

          setMessages(prev => [...prev, resultMessage, resumenMessage]);
        } else {
          setMessages(prev => [...prev, resultMessage]);
        }
      } else {
        const notFoundMessage = {
          id: `not-found-${Date.now()}`,
          type: 'error',
          content: `No se encontró ningún apoderado con el DNI ${dni}.`,
          sender: 'bot',
          timestamp: new Date(),
          icon: <AlertCircle size={16} />
        };

        setMessages(prev => [...prev, notFoundMessage]);
      }
    } catch (error) {
      console.error('Error al consultar apoderado:', error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'error',
        content: 'Lo siento, ha ocurrido un error al consultar la información del apoderado.',
        sender: 'bot',
        timestamp: new Date(),
        icon: <AlertCircle size={16} />
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setActiveSearch(null);
    }
  };

  /**
   * Maneja una consulta de documentos requeridos para un tipo de matrícula
   * @param {string} tipoMatricula - Tipo de matrícula ('nueva', 'traslado', 'siguiente')
   */
  const handleDocumentsQuery = async (tipoMatricula) => {
    try {
      setActiveSearch('documents');

      const tipoTexto = tipoMatricula === 'nueva' ? 'matrícula nueva' :
                        tipoMatricula === 'traslado' ? 'matrícula por traslado' :
                        'matrícula de siguiente grado';

      const loadingMessage = {
        id: `loading-${Date.now()}`,
        type: 'loading',
        content: `Buscando documentos requeridos para ${tipoTexto}...`,
        sender: 'bot',
        timestamp: new Date(),
        icon: <FileText size={16} />
      };

      setMessages(prev => [...prev, loadingMessage]);

      const documentsData = await fetchDocumentsList(tipoMatricula);

      // Eliminar mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      const resultMessage = {
        id: `docs-${Date.now()}`,
        type: 'documents-list',
        content: documentsData,
        sender: 'bot',
        timestamp: new Date(),
        icon: <FileText size={16} />
      };

      setMessages(prev => [...prev, resultMessage]);

      // Mensaje adicional con sugerencia
      const suggestionMessage = {
        id: `suggestion-${Date.now()}`,
        type: 'text',
        content: `¿Necesitas más información sobre el proceso de ${tipoTexto} o quieres consultar otro tipo de documentos?`,
        sender: 'bot',
        timestamp: new Date(),
        icon: <Info size={16} />
      };

      setMessages(prev => [...prev, suggestionMessage]);

    } catch (error) {
      console.error('Error al consultar documentos:', error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'error',
        content: 'Lo siento, ha ocurrido un error al consultar la información de documentos requeridos.',
        sender: 'bot',
        timestamp: new Date(),
        icon: <AlertCircle size={16} />
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setActiveSearch(null);
    }
  };

  /**
   * Autocompleta el texto en el campo de entrada sin enviarlo
   * @param {string} text - Texto para autocompletar
   */
  const handleAutocomplete = (text) => {
    setInputMessage(text);
    // Enfocar el input para que el usuario pueda editar el texto
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Si el chat está cerrado, solo mostrar el botón flotante
  if (!isOpen) {
    return (
      <div className="chatbot2-container">
        <motion.div
          className="chatbot2-toggle-button-wrapper"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="chatbot2-toggle-button-fullsize"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir asistente virtual"
          >
            <img 
              src="/logo-chat.png" 
              alt="Chatbot" 
              className="chatbot2-toggle-icon-fullsize" 
            />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="chatbot2-container">
      <motion.div
        className={`chatbot2-window ${!isExpanded ? 'chatbot2-collapsed' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        // Eliminamos el estilo dinámico de dimensiones
      >
        {/* Header */}
        <div className="chatbot2-header">
          <div className="chatbot2-header-title">
            <img 
              src="/logo-chat.png" 
              alt="Chatbot" 
              className="chatbot2-header-icon-large" 
            />
            <h2>Asistente Virtual</h2>
          </div>
          <div className="chatbot2-header-actions">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="chatbot2-header-button"
              aria-label={isExpanded ? "Minimizar" : "Expandir"}
            >
              {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot2-header-button"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        {isExpanded && (
          <>
            <div className="chatbot2-body" ref={chatContainerRef}>
              <div className="chatbot2-messages">
                <AnimatePresence>
                  {messages.map(message => (
                    <MessageItem
                      key={message.id}
                      message={message}
                      formatTimestamp={formatTimestamp}
                      onOptionSelect={sendUserMessage}
                    />
                  ))}

                  {isLoading && (
                    <motion.div
                      className="chatbot2-message chatbot2-bot-message"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="chatbot2-message-avatar">
                        <Loader2 className="chatbot2-loading-icon" size={20} />
                      </div>
                      <div className="chatbot2-message-content">
                        <div className="chatbot2-message-bubble chatbot2-loading-bubble">
                          <span>Escribiendo</span>
                          <span className="chatbot2-loading-dots">
                            <span>.</span><span>.</span><span>.</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions 
              ref={quickActionsRef}
              onActionSelect={sendUserMessage} 
              onActionAutocomplete={handleAutocomplete}
            />

            {/* Input */}
            <form onSubmit={handleSubmit} className="chatbot2-input-container">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta aquí..."
                className="chatbot2-input"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="chatbot2-send-button"
                disabled={isLoading || !inputMessage.trim()}
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </form>
          </>
        )}
        {/* Controladores de redimensionamiento */}
        <div 
          className="chatbot2-resize-handle chatbot2-resize-handle-e"
          onMouseDown={(e) => startResize(e, 'e')}
        />
        <div 
          className="chatbot2-resize-handle chatbot2-resize-handle-s"
          onMouseDown={(e) => startResize(e, 's')}
        />
        <div 
          className="chatbot2-resize-handle chatbot2-resize-handle-se"
          onMouseDown={(e) => startResize(e, 'se')}
        />
        {/* Handler visual para redimensionar */}
        <div
          className="chatbot2-resize-handle"
          style={{
            position: 'absolute',
            width: 24,
            height: 24,
            right: 0,
            bottom: 0,
            cursor: 'se-resize',
            zIndex: 1100,
            background: 'transparent'
          }}
          onMouseDown={e => startResize(e, 'se')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <polyline points="6,18 18,18 18,6" fill="none" stroke="#aaa" strokeWidth="2"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Chatbot2;


























