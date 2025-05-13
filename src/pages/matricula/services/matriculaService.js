/**
 * Servicio para la gestión de matrículas
 */
import axios from 'axios';
import { API_CONFIG, REQUIRED_DOCUMENTS } from '../utils/constants';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Maneja los errores de las peticiones a la API
 * @param {Error} error - Error de axios
 * @returns {Object} Objeto con información del error
 */
const handleApiError = (error) => {
  console.error('Error en petición API:', error);

  if (error.response) {
    // El servidor respondió con un código de estado fuera del rango 2xx
    console.error('Respuesta de error:', error.response.status, error.response.data);

    return {
      success: false,
      status: error.response.status,
      code: error.response.data?.code || 'ERROR',
      message: error.response.data?.message || 'Error en la petición al servidor',
      data: error.response.data
    };
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error('No se recibió respuesta del servidor');

    return {
      success: false,
      code: 'NO_RESPONSE',
      message: 'No se recibió respuesta del servidor. Verifique su conexión a internet.'
    };
  } else {
    // Ocurrió un error al configurar la petición
    console.error('Error al configurar la petición:', error.message);

    return {
      success: false,
      code: 'REQUEST_ERROR',
      message: error.message || 'Error al realizar la petición'
    };
  }
};

/**
 * Servicio para la gestión de matrículas
 */
export const matriculaService = {
  /**
   * Registra una matrícula nueva
   * @param {Object} formData - Datos del formulario
   * @returns {Promise<Object>} Resultado de la operación
   */
  registrarNuevaMatricula: async (formData) => {
    try {
      const payload = {
        nombre_estudiante: formData.nombreEstudiante,
        dni_estudiante: formData.dniEstudiante,
        fecha_nacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        grado_solicitado: parseInt(formData.gradoSolicitado),
        direccion: formData.direccion,
        nombre_apoderado: formData.nombreApoderado,
        dni_apoderado: formData.dniApoderado,
        parentesco: formData.parentesco,
        ocupacion: formData.ocupacion,
        grado_instruccion: formData.gradoInstruccion,
        telefono: formData.telefono,
        email: formData.email || null,
        direccion_apoderado: formData.direccionApoderado,
        anio_escolar: formData.anioEscolar,
        fecha_solicitud: new Date().toISOString().split('T')[0],
        comentarios: formData.comentarios || null
      };

      console.log('Enviando solicitud de matrícula nueva:', payload);

      const response = await api.post(API_CONFIG.ENDPOINTS.NUEVA, payload);

      return {
        success: true,
        data: response.data,
        message: 'Matrícula registrada con éxito'
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Registra una matrícula por traslado
   * @param {Object} formData - Datos del formulario
   * @returns {Promise<Object>} Resultado de la operación
   */
  registrarMatriculaTraslado: async (formData) => {
    try {
      const payload = {
        nombre_estudiante: formData.nombreEstudiante,
        dni_estudiante: formData.dniEstudiante,
        fecha_nacimiento: formData.fechaNacimiento,
        genero: formData.genero,
        grado_solicitado: parseInt(formData.gradoSolicitado),
        direccion: formData.direccion,
        nombre_apoderado: formData.nombreApoderado,
        dni_apoderado: formData.dniApoderado,
        parentesco: formData.parentesco,
        ocupacion: formData.ocupacion,
        grado_instruccion: formData.gradoInstruccion,
        telefono: formData.telefono,
        email: formData.email || null,
        direccion_apoderado: formData.direccionApoderado,
        colegio_anterior: formData.colegioAnterior,
        motivo_traslado: formData.motivoTraslado || '',
        anio_escolar: formData.anioEscolar,
        fecha_solicitud: new Date().toISOString().split('T')[0],
        comentarios: formData.comentarios || null
      };

      console.log('Enviando solicitud de matrícula por traslado:', payload);

      const response = await api.post(API_CONFIG.ENDPOINTS.TRASLADO, payload);

      return {
        success: true,
        data: response.data,
        message: 'Matrícula por traslado registrada con éxito'
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Registra una matrícula para siguiente grado
   * @param {Object} formData - Datos del formulario
   * @returns {Promise<Object>} Resultado de la operación
   */
  registrarMatriculaSiguienteGrado: async (formData) => {
    try {
      const payload = {
        estudiante_id: formData.estudianteId,
        grado_actual: parseInt(formData.gradoActual),
        grado_siguiente: parseInt(formData.gradoSiguiente),
        anio_escolar_actual: formData.anioEscolarActual,
        anio_escolar_siguiente: formData.anioEscolarSiguiente,
        fecha_solicitud: new Date().toISOString().split('T')[0],
        comentarios: formData.comentarios || null
      };

      console.log('Enviando solicitud de matrícula para siguiente grado:', payload);

      const response = await api.post(API_CONFIG.ENDPOINTS.SIGUIENTE, payload);

      return {
        success: true,
        data: response.data,
        message: 'Matrícula para siguiente grado registrada con éxito'
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Función base para subir documentos
   * @private
   * @param {File} file - Archivo a subir
   * @param {string} tipoDocumento - Tipo de documento
   * @param {string} tipoSolicitud - Tipo de solicitud ('nueva', 'traslado', 'siguiente')
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Resultado de la operación
   */
  _subirDocumentoBase: async (file, tipoDocumento, tipoSolicitud, metadata) => {
    try {
      if (!file) {
        return {
          success: false,
          code: 'MISSING_FILE',
          message: 'No se ha proporcionado ningún archivo'
        };
      }

      if (!tipoDocumento) {
        return {
          success: false,
          code: 'MISSING_DOCUMENT_TYPE',
          message: 'No se ha especificado el tipo de documento'
        };
      }

      if (!tipoSolicitud) {
        return {
          success: false,
          code: 'MISSING_REQUEST_TYPE',
          message: 'No se ha especificado el tipo de solicitud'
        };
      }

      if (!metadata.solicitudId) {
        return {
          success: false,
          code: 'MISSING_REQUEST_ID',
          message: 'No se ha proporcionado el ID de la solicitud'
        };
      }

      const formData = new FormData();
      formData.append('documento', file);
      formData.append('solicitud_id', metadata.solicitudId);
      formData.append('tipo_documento', tipoDocumento);
      formData.append('tipo_solicitud', tipoSolicitud);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (metadata.onProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            metadata.onProgress(percentCompleted);
          }
        }
      };

      console.log('Subiendo documento:', {
        tipo_documento: tipoDocumento,
        tipo_solicitud: tipoSolicitud,
        solicitud_id: metadata.solicitudId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      const response = await api.post(API_CONFIG.ENDPOINTS.DOCUMENTOS, formData, config);

      return {
        success: true,
        data: response.data,
        message: 'Documento subido con éxito'
      };
    } catch (error) {
      console.error('Error al subir documento:', error);
      return handleApiError(error);
    }
  },

  /**
   * Sube un documento para matrícula nueva
   * @param {File} file - Archivo a subir
   * @param {string} tipoDocumento - Tipo de documento
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Resultado de la operación
   */
  subirDocumentoNueva: async (file, tipoDocumento, metadata) => {
    // Verificar que el tipo de documento sea válido para matrícula nueva
    if (REQUIRED_DOCUMENTS['nueva'] && !REQUIRED_DOCUMENTS['nueva'].some(doc => doc.id === tipoDocumento)) {
      console.warn(`El documento ${tipoDocumento} no está definido para matrícula nueva`);
    }

    return matriculaService._subirDocumentoBase(file, tipoDocumento, 'nueva', metadata);
  },

  /**
   * Sube un documento para matrícula por traslado
   * @param {File} file - Archivo a subir
   * @param {string} tipoDocumento - Tipo de documento
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Resultado de la operación
   */
  subirDocumentoTraslado: async (file, tipoDocumento, metadata) => {
    // Verificar que el tipo de documento sea válido para matrícula por traslado
    if (REQUIRED_DOCUMENTS['traslado'] && !REQUIRED_DOCUMENTS['traslado'].some(doc => doc.id === tipoDocumento)) {
      console.warn(`El documento ${tipoDocumento} no está definido para matrícula por traslado`);
    }

    return matriculaService._subirDocumentoBase(file, tipoDocumento, 'traslado', metadata);
  },

  /**
   * Sube un documento para matrícula de siguiente grado
   * @param {File} file - Archivo a subir
   * @param {string} tipoDocumento - Tipo de documento
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Resultado de la operación
   */
  subirDocumentoSiguiente: async (file, tipoDocumento, metadata) => {
    // Verificar que el tipo de documento sea válido para matrícula de siguiente grado
    if (REQUIRED_DOCUMENTS['siguiente'] && !REQUIRED_DOCUMENTS['siguiente'].some(doc => doc.id === tipoDocumento)) {
      console.warn(`El documento ${tipoDocumento} no está definido para matrícula de siguiente grado`);
    }

    return matriculaService._subirDocumentoBase(file, tipoDocumento, 'siguiente', metadata);
  },

  /**
   * Sube un documento asociado a una solicitud de matrícula (método general)
   * @param {File} file - Archivo a subir
   * @param {string} tipoDocumento - Tipo de documento
   * @param {Object} metadata - Metadatos del documento
   * @returns {Promise<Object>} Resultado de la operación
   */
  subirDocumento: async (file, tipoDocumento, metadata) => {
    try {
      if (!file) {
        return {
          success: false,
          code: 'MISSING_FILE',
          message: 'No se ha proporcionado ningún archivo'
        };
      }

      if (!tipoDocumento) {
        return {
          success: false,
          code: 'MISSING_DOCUMENT_TYPE',
          message: 'No se ha especificado el tipo de documento'
        };
      }

      if (!metadata.solicitudId) {
        return {
          success: false,
          code: 'MISSING_REQUEST_ID',
          message: 'No se ha proporcionado el ID de la solicitud'
        };
      }

      // Determinar el tipo de solicitud según el tipo de documento
      let tipoSolicitud = '';

      // Verificar en qué tipo de matrícula está incluido este documento
      if (REQUIRED_DOCUMENTS['nueva'] && REQUIRED_DOCUMENTS['nueva'].some(doc => doc.id === tipoDocumento)) {
        tipoSolicitud = 'nueva';
      } else if (REQUIRED_DOCUMENTS['traslado'] && REQUIRED_DOCUMENTS['traslado'].some(doc => doc.id === tipoDocumento)) {
        tipoSolicitud = 'traslado';
      } else if (REQUIRED_DOCUMENTS['siguiente'] && REQUIRED_DOCUMENTS['siguiente'].some(doc => doc.id === tipoDocumento)) {
        tipoSolicitud = 'siguiente';
      } else {
        // Si no se puede determinar, usar el tipo de solicitud por defecto
        console.warn(`No se pudo determinar el tipo de solicitud para el documento ${tipoDocumento}. Usando 'nueva' por defecto.`);
        tipoSolicitud = 'nueva';
      }

      console.log(`Tipo de solicitud determinado para ${tipoDocumento}: ${tipoSolicitud}`);

      // Usar el método específico según el tipo de solicitud
      switch (tipoSolicitud) {
        case 'nueva':
          return matriculaService.subirDocumentoNueva(file, tipoDocumento, metadata);
        case 'traslado':
          return matriculaService.subirDocumentoTraslado(file, tipoDocumento, metadata);
        case 'siguiente':
          return matriculaService.subirDocumentoSiguiente(file, tipoDocumento, metadata);
        default:
          return matriculaService.subirDocumentoNueva(file, tipoDocumento, metadata);
      }
    } catch (error) {
      console.error('Error al subir documento:', error);
      return handleApiError(error);
    }
  },

  /**
   * Consulta una matrícula por DNI del estudiante
   * @param {string} dni - DNI del estudiante
   * @param {string} anioEscolar - Año escolar
   * @returns {Promise<Object>} Resultado de la operación
   */
  consultarMatricula: async (dni, anioEscolar) => {
    try {
      if (!dni) {
        return {
          success: false,
          code: 'MISSING_DNI',
          message: 'No se ha proporcionado el DNI del estudiante'
        };
      }

      const params = {
        dni_estudiante: dni
      };

      if (anioEscolar) {
        params.anio_escolar = anioEscolar;
      }

      console.log('Consultando matrícula:', params);

      const response = await api.get(`${API_CONFIG.ENDPOINTS.CONSULTA}`, { params });

      if (response.data && response.data.length === 0) {
        return {
          success: true,
          found: false,
          message: 'No se encontraron matrículas para el DNI proporcionado',
          data: []
        };
      }

      return {
        success: true,
        found: true,
        data: response.data,
        message: 'Matrícula encontrada'
      };
    } catch (error) {
      return handleApiError(error);
    }
  },

  /**
   * Busca un apoderado por su DNI
   * @param {string} dni - DNI del apoderado
   * @returns {Promise<Object>} Resultado de la operación
   */
  buscarApoderadoPorDNI: async (dni) => {
    try {
      // Validar formato de DNI
      if (!dni) {
        return {
          success: false,
          code: 'MISSING_DNI',
          message: 'No se ha proporcionado el DNI del apoderado'
        };
      }

      if (dni.length !== 8 || !/^\d+$/.test(dni)) {
        return {
          success: false,
          code: 'INVALID_DNI',
          message: 'El DNI debe tener 8 dígitos numéricos'
        };
      }

      console.log('Buscando apoderado por DNI:', dni);

      // La ruta correcta es /api/buscar/:dni según apoderado.routes.js
      const response = await api.get(`/buscar/${dni}`);

      return {
        success: true,
        data: response.data,
        message: 'Apoderado encontrado'
      };
    } catch (error) {
      // Manejar el caso específico de 404 (no encontrado)
      if (error.response && error.response.status === 404) {
        return {
          success: false,
          code: 'NOT_FOUND',
          message: 'No se encontró ningún apoderado con el DNI proporcionado'
        };
      }

      console.error('Error al buscar apoderado:', error);
      return handleApiError(error);
    }
  },

  /**
   * Verifica si un estudiante puede ser promovido al siguiente grado
   * @param {string} dni - DNI del estudiante
   * @returns {Promise<Object>} Resultado de la verificación
   */
  verificarPromocionGrado: async (dni) => {
    try {
      // Validar formato de DNI
      if (!dni) {
        return {
          success: false,
          code: 'MISSING_DNI',
          message: 'No se ha proporcionado el DNI del estudiante'
        };
      }

      if (dni.length !== 8 || !/^\d+$/.test(dni)) {
        return {
          success: false,
          code: 'INVALID_DNI',
          message: 'El DNI debe tener 8 dígitos numéricos'
        };
      }

      console.log('Verificando promoción de estudiante con DNI:', dni);

      // Usar el endpoint de resumen que proporciona toda la información necesaria
      const response = await api.get('/estudiantes/resumen', {
        params: { dni },
        headers: { 'Cache-Control': 'no-cache' }
      });

      const { estudiante, apoderado, historial, promocion } = response.data;

      // Verificar si el estudiante puede ser promovido
      if (!promocion.puede_promocionar) {
        return {
          success: false,
          code: 'CANNOT_PROMOTE',
          message: promocion.mensaje || 'El estudiante no cumple con los requisitos para ser promovido'
        };
      }

      return {
        success: true,
        data: {
          estudiante,
          apoderado,
          historial,
          promocion
        },
        message: 'Estudiante encontrado y puede ser promovido'
      };
    } catch (error) {
      // Manejar el caso específico de 404 (no encontrado)
      if (error.response && error.response.status === 404) {
        return {
          success: false,
          code: 'NOT_FOUND',
          message: 'No se encontró ningún estudiante con el DNI proporcionado'
        };
      }

      console.error('Error al verificar promoción de grado:', error);
      return handleApiError(error);
    }
  }
};

export default matriculaService;
