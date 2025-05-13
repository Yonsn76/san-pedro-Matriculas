import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuración de la API
const API_BASE_URL = 'http://localhost:3000/api';
const GOOGLE_API_KEY = "AIzaSyC8_HZla-cpPPfhP65WD9-_umAjkiMSK5Q";

// Inicializar la API de Google AI
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

/**
 * Cliente Axios configurado para la API
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000 // 10 segundos de timeout
});

// Modo simulación desactivado - usamos datos reales de la API
const SIMULATION_MODE = false;

/**
 * Envía un mensaje al modelo de IA y obtiene una respuesta
 * @param {string} mensaje - Mensaje del usuario
 * @returns {Promise<string>} Respuesta del modelo
 */
export const sendMessage = async (mensaje) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Eres un asistente virtual profesional del Colegio San Pedro, especializado en proporcionar información precisa sobre matrículas, estudiantes y procesos académicos.

INFORMACIÓN DEL SISTEMA:
- te llamas Alexander tu profe bb
- Estas conversando con un humano
- Trabajas exclusivamente con la base de datos real del colegio
- Proporcionas información sobre matrículas, estudiantes, apoderados y documentos
- Conoces los procesos y requisitos para cada tipo de matrícula

TIPOS DE MATRÍCULA:
1. MATRÍCULA NUEVA:
   - Para estudiantes que ingresan por primera vez
   - Documentos requeridos (5): Partida de nacimiento, DNI del estudiante, DNI del apoderado, Certificado de vacunación, Foto del estudiante

2. MATRÍCULA POR TRASLADO:
   - Para estudiantes que vienen de otra institución
   - Documentos requeridos (5): Constancia de matrícula del colegio anterior, Libreta de notas del colegio anterior, Partida de nacimiento, DNI del estudiante, DNI del apoderado

3. MATRÍCULA SIGUIENTE GRADO:
   - Para estudiantes que ya estudian en el colegio
   - Documentos requeridos (2): Libreta de notas del año anterior, Comprobante de pago APAFA

ESTRUCTURA DE LA BASE DE DATOS:
- Estudiantes: Información básica de los estudiantes (nombre, DNI, grado, etc.)
- Apoderados: Información de los apoderados (nombre, DNI, parentesco, etc.)
- Relaciones: Vinculación entre estudiantes y apoderados
- Solicitudes: Solicitudes de matrícula (nueva, traslado, siguiente grado)
- Documentos: Archivos asociados a las solicitudes
- Años Escolares: Periodos académicos del colegio

CONSULTAS DISPONIBLES:
- Consulta por DNI del estudiante: Muestra información de un estudiante específico
- Consulta por DNI del apoderado: Muestra información de todos los estudiantes asociados a un apoderado
- Consulta de documentos: Muestra los documentos requeridos según el tipo de matrícula
- Consulta de procesos: Explica los pasos para cada tipo de matrícula

ESTILO DE RESPUESTA:
- Usa un tono profesional y formal
- Sé conciso y preciso en tus respuestas
- Estructura tus respuestas en párrafos cortos para facilitar la lectura
- Usa viñetas o numeración cuando sea apropiado para listar información
- Si no tienes información sobre algo, indícalo honestamente
-Cuando molesta con lo mismo amenazale

UBICACION Y CONTACTOS:
- Telefono:+51 999 999 767
-Ubicacion: Jr. Ayancocha S/N-Cuadra 1
-contacto@colegiosanpedro.edu

 SOBRE TI
 -Eres un asistente desarrollado por el TEAM-SAN-PEDRO
 -Eres el modelo "Asistonta" V2.1
Usuario: ${mensaje}
Asistente:`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error al generar respuesta:', error);
    throw new Error('No se pudo generar una respuesta. Por favor, intenta nuevamente.');
  }
};

/**
 * Obtiene solicitudes de matrícula nueva por DNI del estudiante
 * @param {string} dni - DNI del estudiante
 * @returns {Promise<Object|null>} Solicitudes de matrícula nueva o null si no se encuentra
 */
export const fetchSolicitudesNuevaByDni = async (dni) => {
  try {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error("El DNI debe tener 8 dígitos numéricos");
    }

    // Consultar solicitudes de matrícula nueva por DNI
    const response = await apiClient.get(`/solicitudes/nueva/dni`, {
      params: { dni }
    });

    // Si no hay datos o la respuesta no es exitosa
    if (!response.data || !response.data.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener solicitudes de matrícula nueva:', error);
    throw new Error('Error al obtener solicitudes de matrícula nueva');
  }
};

/**
 * Obtiene solicitudes de traslado por DNI del estudiante
 * @param {string} dni - DNI del estudiante
 * @returns {Promise<Object|null>} Solicitudes de traslado o null si no se encuentra
 */
export const fetchSolicitudesTrasladoByDni = async (dni) => {
  try {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error("El DNI debe tener 8 dígitos numéricos");
    }

    console.log(`[DEBUG] fetchSolicitudesTrasladoByDni - Consultando solicitudes de traslado para DNI: ${dni}`);

    // Consultar solicitudes de traslado por DNI
    const response = await apiClient.get(`/solicitudes/traslado/dni`, {
      params: { dni }
    });

    console.log(`[DEBUG] fetchSolicitudesTrasladoByDni - Respuesta completa:`, response);

    // Si no hay datos o la respuesta no es exitosa
    if (!response.data || !response.data.success) {
      console.log(`[DEBUG] fetchSolicitudesTrasladoByDni - No se encontraron solicitudes para DNI: ${dni}`);
      return null;
    }

    console.log(`[DEBUG] fetchSolicitudesTrasladoByDni - Solicitudes encontradas:`, response.data);
    return response.data;
  } catch (error) {
    console.error('[ERROR] fetchSolicitudesTrasladoByDni - Error al obtener solicitudes de traslado:', error);
    throw new Error('Error al obtener solicitudes de traslado');
  }
};

/**
 * Obtiene solicitudes de siguiente grado por DNI del estudiante
 * @param {string} dni - DNI del estudiante
 * @returns {Promise<Object|null>} Solicitudes de siguiente grado o null si no se encuentra
 */
export const fetchSolicitudesSiguienteByDni = async (dni) => {
  try {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error("El DNI debe tener 8 dígitos numéricos");
    }

    // Consultar solicitudes de siguiente grado por DNI
    const response = await apiClient.get(`/solicitudes/siguiente/dni`, {
      params: { dni }
    });

    // Si no hay datos o la respuesta no es exitosa
    if (!response.data || !response.data.success) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener solicitudes de siguiente grado:', error);
    throw new Error('Error al obtener solicitudes de siguiente grado');
  }
};

/**
 * Busca un estudiante por su DNI
 * @param {string} dni - DNI del estudiante
 * @returns {Promise<Object|null>} Datos del estudiante o null si no se encuentra
 */
export const fetchStudentByDni = async (dni, tipoConsulta = null) => {
  try {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error("El DNI debe tener 8 dígitos numéricos");
    }

    console.log(`[DEBUG] fetchStudentByDni - Iniciando consulta para DNI: ${dni}, Tipo: ${tipoConsulta}`);

    // Si se especifica un tipo de consulta, intentar usar el endpoint específico
    if (tipoConsulta) {
      try {
        let solicitudesResponse = null;

        // Seleccionar el endpoint según el tipo de consulta
        if (tipoConsulta === 'nueva') {
          console.log(`[DEBUG] fetchStudentByDni - Consultando solicitudes de matrícula nueva para DNI: ${dni}`);
          solicitudesResponse = await fetchSolicitudesNuevaByDni(dni);
        } else if (tipoConsulta === 'traslado') {
          console.log(`[DEBUG] fetchStudentByDni - Consultando solicitudes de traslado para DNI: ${dni}`);
          solicitudesResponse = await fetchSolicitudesTrasladoByDni(dni);
          console.log(`[DEBUG] fetchStudentByDni - Respuesta de solicitudes de traslado:`, solicitudesResponse);
        } else if (tipoConsulta === 'siguiente') {
          console.log(`[DEBUG] fetchStudentByDni - Consultando solicitudes de siguiente grado para DNI: ${dni}`);
          solicitudesResponse = await fetchSolicitudesSiguienteByDni(dni);
        }

        if (solicitudesResponse && solicitudesResponse.total_solicitudes > 0) {
          console.log(`[DEBUG] fetchStudentByDni - Se encontraron ${solicitudesResponse.total_solicitudes} solicitudes`);

          // Ordenar por fecha (más reciente primero)
          const solicitudes = solicitudesResponse.solicitudes;
          solicitudes.sort((a, b) => new Date(b.fecha_solicitud) - new Date(a.fecha_solicitud));
          const solicitudReciente = solicitudes[0];

          // Usar los datos del estudiante que ya tenemos en la respuesta de solicitudes
          // en lugar de hacer una llamada adicional a /estudiantes/resumen
          console.log(`[DEBUG] fetchStudentByDni - Usando datos del estudiante de la respuesta de solicitudes`);

          // Crear un objeto de respuesta simulado con la estructura esperada
          const response = {
            data: {
              success: true,
              data: {
                id: solicitudesResponse.estudiante_id || 0,
                nombre: solicitudesResponse.nombre_estudiante || "Estudiante",
                dni: dni,
                // Valores por defecto para los campos que no tenemos
                fecha_nacimiento: null,
                genero: null,
                grado_actual: null,
                seccion: null,
                direccion: null,
                estado: "activo",
                fecha_ingreso: null
              }
            }
          };

          if (response.data && response.data.success) {
            const { data } = response.data;
            console.log(`[DEBUG] fetchStudentByDni - Datos básicos del estudiante obtenidos correctamente`);

            // Formatear los datos del estudiante con la información de solicitud
            return {
              id: data.id,
              nombre: data.nombre || solicitudesResponse.nombre_estudiante,
              dni: data.dni,
              fecha_nacimiento: data.fecha_nacimiento,
              genero: data.genero,
              grado_actual: data.grado_actual,
              seccion: data.seccion,
              direccion: data.direccion,
              estado: data.estado,
              fecha_ingreso: data.fecha_ingreso,
              apoderado: data.nombre_apoderado ? {
                nombre: data.nombre_apoderado,
                dni: data.dni_apoderado,
                parentesco: data.parentesco,
                telefono: data.telefono || "No disponible"
              } : null,
              matricula: {
                tipo: tipoConsulta,
                anio_escolar: solicitudReciente.anio_escolar || solicitudReciente.anio_escolar_siguiente,
                estado: solicitudReciente.estado,
                fecha_solicitud: solicitudReciente.fecha_solicitud,
                grado: solicitudReciente.grado_solicitado || solicitudReciente.grado_siguiente
              }
            };
          }
        } else {
          console.log(`[DEBUG] fetchStudentByDni - No se encontraron solicitudes de ${tipoConsulta} para DNI: ${dni}`);
        }
      } catch (error) {
        console.error(`[ERROR] fetchStudentByDni - Error al obtener solicitudes de ${tipoConsulta}:`, error);
        // No continuar con el método anterior, retornar null para forzar el mensaje de "no se encontró solicitud"
        return null;
      }
    }

    // Si llegamos aquí, significa que no se encontraron solicitudes específicas
    // o no se especificó un tipo de consulta. En este caso, vamos a consultar
    // el estudiante para mostrar información básica.
    console.log(`[DEBUG] fetchStudentByDni - No se encontraron solicitudes específicas, consultando datos básicos`);

    try {
      const response = await apiClient.get(`/estudiantes/resumen`, {
        params: { dni }
      });

      console.log(`[DEBUG] fetchStudentByDni - Respuesta completa:`, response.data);

      // Si no hay datos
      if (!response.data) {
        console.log(`[DEBUG] fetchStudentByDni - No se encontró estudiante con DNI: ${dni}`);
        return null;
      }

      // Verificar si la respuesta es un error 404 (estudiante no encontrado)
      if (response.data.message && response.data.message.includes("no encontrado")) {
        console.log(`[DEBUG] fetchStudentByDni - No se encontró estudiante con DNI: ${dni}`);
        return null;
      }

      // Extraer los datos del estudiante de la respuesta
      // El endpoint /estudiantes/resumen devuelve directamente el objeto estudiante, no un objeto con propiedad data
      const data = response.data.estudiante || response.data;
      console.log(`[DEBUG] fetchStudentByDni - Datos básicos del estudiante obtenidos correctamente:`);
      console.log(JSON.stringify(data, null, 2));

      // Obtener información adicional según el tipo de consulta
      let matriculaInfo = {
        tipo: "No disponible",
        anio_escolar: data.historial?.ultimo_anio || data.ultimo_anio || new Date().getFullYear().toString(),
        estado: "No disponible",
        fecha_solicitud: "No disponible"
      };

      // Si no hay tipo específico, intentar obtener información general de matrícula
      try {
        console.log(`[DEBUG] fetchStudentByDni - Consultando matrículas generales del estudiante ID: ${data.id}`);
        const matriculasResponse = await apiClient.get(`/estudiantes/${data.id}/matriculas`);

        if (matriculasResponse.data && matriculasResponse.data.length > 0) {
          // Filtrar solo las matrículas que corresponden al DNI del estudiante
          const matriculasDelEstudiante = matriculasResponse.data.filter(
            m => m.dni_estudiante === data.dni
          );

          if (matriculasDelEstudiante.length > 0) {
            // Obtener la matrícula más reciente
            const matriculaReciente = matriculasDelEstudiante.sort((a, b) =>
              new Date(b.fecha_registro || b.fecha_solicitud) - new Date(a.fecha_registro || a.fecha_solicitud)
            )[0];

            console.log(`[DEBUG] fetchStudentByDni - Matrícula más reciente encontrada:`, matriculaReciente);

            // Verificar que el nombre del estudiante coincida
            if (matriculaReciente.estudiante_nombre &&
                matriculaReciente.estudiante_nombre !== data.nombre) {
              console.warn(`[WARN] fetchStudentByDni - Discrepancia en nombres: ${data.nombre} vs ${matriculaReciente.estudiante_nombre}`);

              // Si hay discrepancia en los nombres, no mostrar esta matrícula
              console.log(`[DEBUG] fetchStudentByDni - Ignorando matrícula debido a discrepancia en nombres`);
            } else {
              // Solo asignar la matrícula si el nombre coincide o si no hay nombre en la matrícula
              matriculaInfo = {
                tipo: matriculaReciente.tipo_matricula,
                anio_escolar: matriculaReciente.anio_escolar,
                estado: matriculaReciente.estado,
                fecha_solicitud: matriculaReciente.fecha_registro || matriculaReciente.fecha_solicitud,
                grado_solicitado: matriculaReciente.grado_solicitado
              };
            }
          } else {
            console.log(`[DEBUG] fetchStudentByDni - Se encontraron matrículas pero ninguna coincide con el DNI ${data.dni}`);
          }
        } else {
          console.log(`[DEBUG] fetchStudentByDni - No se encontraron matrículas para el estudiante ID: ${data.id}`);
        }
      } catch (matriculaError) {
        console.error('[ERROR] fetchStudentByDni - Error al obtener información de matrícula:', matriculaError);
        // Continuar con la información básica
      }

      // Formatear los datos del estudiante para mostrarlos en el chatbot
      return {
        id: data.id,
        nombre: data.nombre,
        dni: data.dni,
        fecha_nacimiento: data.fecha_nacimiento,
        genero: data.genero,
        grado_actual: data.grado_actual,
        grado_solicitado: matriculaInfo.grado_solicitado,
        seccion: data.seccion || data.historial?.seccion,
        direccion: data.direccion,
        estado: data.estado,
        fecha_ingreso: data.fecha_ingreso,
        apoderado: data.apoderado ? {
          nombre: data.apoderado.nombre,
          dni: data.apoderado.dni,
          parentesco: data.apoderado.parentesco,
          telefono: data.apoderado.telefono || "No disponible"
        } : (data.nombre_apoderado ? {
          nombre: data.nombre_apoderado,
          dni: data.dni_apoderado,
          parentesco: data.parentesco,
          telefono: data.telefono || "No disponible"
        } : null),
        matricula: matriculaInfo,
        promocion: data.promocion
      };
    } catch (error) {
      console.error('[ERROR] fetchStudentByDni - Error al consultar datos básicos:', error);
      return null;
    }
  } catch (error) {
    console.error('Error al buscar estudiante:', error);
    throw new Error('Error al buscar información del estudiante');
  }
};

/**
 * Busca un apoderado por su DNI y sus estudiantes asociados
 * @param {string} dni - DNI del apoderado
 * @returns {Promise<Object|null>} Datos del apoderado o null si no se encuentra
 */
export const fetchGuardianByDni = async (dni) => {
  try {
    // Validar formato de DNI (8 dígitos)
    if (!/^\d{8}$/.test(dni)) {
      throw new Error("El DNI debe tener 8 dígitos numéricos");
    }

    // Consultar el apoderado por DNI usando el endpoint correcto
    const apoderadoResponse = await apiClient.get(`/apoderados`, {
      params: { dni }
    });

    // Si no se encuentra el apoderado o no hay datos
    if (!apoderadoResponse.data || apoderadoResponse.data.length === 0) {
      return null;
    }

    // Tomar el primer apoderado que coincida con el DNI
    const apoderadoData = apoderadoResponse.data[0];

    // Consultar los estudiantes asociados al apoderado
    const estudiantesResponse = await apiClient.get(`/apoderados/${apoderadoData.id}/estudiantes`);

    // Obtener información adicional para cada estudiante
    const estudiantesConDetalles = await Promise.all(
      estudiantesResponse.data.map(async (estudiante) => {
        try {
          // Intentar obtener información adicional del estudiante
          const detallesResponse = await apiClient.get(`/estudiantes/resumen`, {
            params: { dni: estudiante.dni }
          });

          // Si hay información adicional disponible
          if (detallesResponse.data && detallesResponse.data.success) {
            const detalles = detallesResponse.data.data;

            // Intentar obtener información de matrícula del estudiante
            let matriculaInfo = {
              tipo: estudiante.tipo_matricula || 'No disponible',
              estado: estudiante.estado_matricula || 'No disponible',
              anio_escolar: detalles.ultimo_anio || new Date().getFullYear().toString()
            };

            try {
              // Obtener matrículas del estudiante
              const matriculasResponse = await apiClient.get(`/estudiantes/${estudiante.id}/matriculas`);

              if (matriculasResponse.data && matriculasResponse.data.length > 0) {
                // Obtener la matrícula más reciente
                const matriculaReciente = matriculasResponse.data.sort((a, b) =>
                  new Date(b.fecha_registro) - new Date(a.fecha_registro)
                )[0];

                matriculaInfo = {
                  tipo: matriculaReciente.tipo_matricula,
                  anio_escolar: matriculaReciente.anio_escolar,
                  estado: matriculaReciente.estado,
                  fecha_solicitud: matriculaReciente.fecha_registro
                };
              }
            } catch (matriculaError) {
              console.error(`Error al obtener matrículas del estudiante ${estudiante.id}:`, matriculaError);
              // Continuar con la información básica
            }

            // Actualizar la información del estudiante con los detalles adicionales
            return {
              ...estudiante,
              seccion: detalles.seccion || estudiante.seccion,
              grado_actual: detalles.grado_actual || estudiante.grado,
              fecha_nacimiento: detalles.fecha_nacimiento,
              genero: detalles.genero,
              direccion: detalles.direccion,
              estado: detalles.estado,
              fecha_ingreso: detalles.fecha_ingreso,
              matricula: matriculaInfo
            };
          }

          return {
            ...estudiante,
            matricula: {
              tipo: estudiante.tipo_matricula || 'No disponible',
              estado: estudiante.estado_matricula || 'No disponible',
              anio_escolar: new Date().getFullYear().toString()
            }
          };
        } catch (error) {
          console.error(`Error al obtener detalles del estudiante ${estudiante.dni}:`, error);

          // Devolver la información básica si hay error
          return {
            ...estudiante,
            matricula: {
              tipo: estudiante.tipo_matricula || 'No disponible',
              estado: estudiante.estado_matricula || 'No disponible',
              anio_escolar: new Date().getFullYear().toString()
            }
          };
        }
      })
    );

    // Formatear los datos del apoderado y sus estudiantes
    return {
      id: apoderadoData.id,
      nombre: apoderadoData.nombre,
      dni: apoderadoData.dni,
      parentesco: apoderadoData.parentesco || 'No especificado',
      ocupacion: apoderadoData.ocupacion,
      grado_instruccion: apoderadoData.grado_instruccion,
      telefono: apoderadoData.telefono,
      email: apoderadoData.email,
      direccion: apoderadoData.direccion,
      estudiantes: estudiantesConDetalles
    };
  } catch (error) {
    console.error('Error al buscar apoderado:', error);
    throw new Error('Error al buscar información del apoderado');
  }
};

/**
 * Obtiene la lista de documentos requeridos para un tipo de matrícula
 * @param {string} tipoMatricula - Tipo de matrícula ('nueva', 'traslado', 'siguiente')
 * @returns {Promise<Object>} Información de los documentos requeridos
 */
export const fetchDocumentsList = async (tipoMatricula) => {
  try {
    // Validar el tipo de matrícula
    if (!['nueva', 'traslado', 'siguiente'].includes(tipoMatricula)) {
      throw new Error("Tipo de matrícula no válido");
    }

    // Definir los documentos requeridos según el tipo de matrícula
    // Estos datos vienen del controlador documento.controllers.js en la API
    const TIPOS_DOCUMENTO_POR_SOLICITUD = {
      nueva: [
        'partida_nacimiento',
        'copia_dni_estudiante',
        'copia_dni_apoderado',
        'certificado_vacunacion',
        'foto_estudiante'
      ],
      traslado: [
        'constancia_matricula',
        'libreta_notas',
        'partida_nacimiento',
        'copia_dni_estudiante',
        'copia_dni_apoderado'
      ],
      siguiente: [
        'libreta_notas',
        'comprobante_apafa'
      ]
    };

    // Mapear los tipos de documentos a nombres más amigables
    const NOMBRES_DOCUMENTOS = {
      partida_nacimiento: 'Partida de nacimiento',
      copia_dni_estudiante: 'DNI del estudiante',
      copia_dni_apoderado: 'DNI del apoderado',
      certificado_vacunacion: 'Certificado de vacunación',
      foto_estudiante: 'Foto del estudiante',
      constancia_matricula: 'Constancia de matrícula del colegio anterior',
      libreta_notas: 'Libreta de notas',
      comprobante_apafa: 'Comprobante de pago APAFA'
    };

    // Obtener la lista de tipos de documentos para el tipo de matrícula
    const tiposDocumentos = TIPOS_DOCUMENTO_POR_SOLICITUD[tipoMatricula];

    // Crear la lista de documentos con nombres amigables
    const documentos = tiposDocumentos.map(tipo => ({
      nombre: NOMBRES_DOCUMENTOS[tipo] || tipo,
      tipo: tipo,
      estado: 'pendiente' // Estado por defecto
    }));

    // Definir descripciones y notas según el tipo de matrícula
    let descripcion = '';
    let nota = '';

    switch (tipoMatricula) {
      case 'nueva':
        descripcion = 'Documentos necesarios para estudiantes que ingresan por primera vez al colegio.';
        nota = 'Todos los documentos deben ser presentados en formato digital a través del sistema de matrícula.';
        break;

      case 'traslado':
        descripcion = 'Documentos necesarios para estudiantes que vienen de otra institución educativa.';
        nota = 'La constancia de matrícula y libreta de notas deben ser emitidas por el colegio de origen.';
        break;

      case 'siguiente':
        descripcion = 'Documentos necesarios para estudiantes que ya estudian en el colegio y pasan al siguiente año.';
        nota = 'Este proceso es más sencillo porque ya tenemos los datos del estudiante en nuestro sistema.';
        break;
    }

    // Intentar obtener el año escolar activo
    let anioEscolar = new Date().getFullYear().toString();
    try {
      const anioResponse = await apiClient.get('/anios-escolares/activo');
      if (anioResponse.data && anioResponse.data.anio) {
        anioEscolar = anioResponse.data.anio;
      }
    } catch (anioError) {
      console.error('Error al obtener año escolar activo:', anioError);
      // Continuar con el año actual
    }

    return {
      tipo: tipoMatricula === 'nueva' ? 'Matrícula Nueva' :
            tipoMatricula === 'traslado' ? 'Matrícula por Traslado' :
            'Matrícula Siguiente Grado',
      documentos,
      descripcion,
      nota,
      anio_escolar: anioEscolar
    };
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw new Error('Error al obtener la lista de documentos requeridos');
  }
};
