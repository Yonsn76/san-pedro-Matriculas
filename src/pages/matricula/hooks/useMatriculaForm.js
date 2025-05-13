/**
 * Hook personalizado para gestionar formularios de matrícula
 */
import { useState, useEffect } from 'react';
import { MATRICULA_TYPES, REQUIRED_DOCUMENTS } from '../utils/constants';
import { validateMatriculaForm, validateFile } from '../utils/validators';
import matriculaService from '../services/matriculaService';

/**
 * Hook para gestionar formularios de matrícula
 * @param {string} tipoMatricula - Tipo de matrícula
 * @returns {Object} Estado y funciones para gestionar el formulario
 */
const useMatriculaForm = (tipoMatricula) => {
  // Estado inicial del formulario
  const initialFormState = {
    // Datos del estudiante
    nombreEstudiante: '',
    dniEstudiante: '',
    fechaNacimiento: '',
    genero: '',
    direccion: '',

    // Datos del apoderado
    nombreApoderado: '',
    dniApoderado: '',
    parentesco: '',
    ocupacion: '',
    gradoInstruccion: '',
    telefono: '',
    email: '',
    direccionApoderado: '',

    // Datos de la matrícula
    anioEscolar: new Date().getFullYear().toString(),
    gradoSolicitado: '',
    comentarios: '',

    // Datos específicos para traslado
    colegioAnterior: '',
    motivoTraslado: '',

    // Datos específicos para siguiente grado
    estudianteId: '',
    gradoActual: '',
    gradoSiguiente: '',
    anioEscolarActual: new Date().getFullYear().toString(),
    anioEscolarSiguiente: (new Date().getFullYear() + 1).toString(),

    // Documentos
    documentos: []
  };

  // Estados del formulario
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [solicitudId, setSolicitudId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultResult, setConsultResult] = useState(null);

  // Reiniciar el formulario cuando cambia el tipo de matrícula
  useEffect(() => {
    resetForm();
  }, [tipoMatricula]);

  // Actualizar grado siguiente automáticamente
  useEffect(() => {
    if (tipoMatricula === MATRICULA_TYPES.SIGUIENTE_GRADO && formData.gradoActual) {
      const gradoActual = parseInt(formData.gradoActual);
      if (!isNaN(gradoActual) && gradoActual < 6) {
        setFormData(prev => ({
          ...prev,
          gradoSiguiente: (gradoActual + 1).toString()
        }));
      }
    }
  }, [tipoMatricula, formData.gradoActual]);

  /**
   * Maneja cambios en los campos del formulario
   * @param {string} field - Nombre del campo
   * @param {any} value - Valor del campo
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Marcar el campo como tocado
    if (!touchedFields[field]) {
      setTouchedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Maneja cambios en los archivos
   * @param {File} file - Archivo seleccionado
   * @param {string} documentType - Tipo de documento
   */
  const handleFileChange = (file, documentType) => {
    if (!file) return;

    // Validar archivo
    const validation = validateFile(file);
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        [documentType]: validation.error
      }));
      return;
    }

    // Inicializar progreso
    setUploadProgress(prev => ({
      ...prev,
      [documentType]: 0
    }));

    // Agregar el documento a la lista
    setFormData(prev => {
      const newDocumentos = prev.documentos.filter(doc => doc.tipo !== documentType);
      newDocumentos.push({
        tipo: documentType,
        nombre: file.name,
        archivo: file
      });

      return {
        ...prev,
        documentos: newDocumentos
      };
    });

    // Si ya tenemos un ID de solicitud, subir el documento inmediatamente
    if (solicitudId) {
      uploadDocument(file, documentType, solicitudId);
    } else {
      // Simular progreso para la interfaz
      simulateProgress(documentType);
    }

    // Limpiar error del campo
    if (errors[documentType]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[documentType];
        return newErrors;
      });
    }
  };

  /**
   * Simula el progreso de carga de un archivo
   * @param {string} documentType - Tipo de documento
   */
  const simulateProgress = (documentType) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [documentType]: progress
      }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  /**
   * Sube un documento a la API
   * @param {File} file - Archivo a subir
   * @param {string} documentType - Tipo de documento
   * @param {string} solicitudId - ID de la solicitud
   * @returns {Promise<Object>} Resultado de la operación
   */
  const uploadDocument = async (file, documentType, solicitudId) => {
    try {
      // Configuración común para todos los métodos de subida
      const metadata = {
        solicitudId,
        onProgress: (progress) => {
          setUploadProgress(prev => ({
            ...prev,
            [documentType]: progress
          }));
        }
      };

      // Seleccionar el método de subida según el tipo de matrícula
      let result;
      switch (tipoMatricula) {
        case MATRICULA_TYPES.NUEVA:
          result = await matriculaService.subirDocumentoNueva(file, documentType, metadata);
          break;
        case MATRICULA_TYPES.TRASLADO:
          result = await matriculaService.subirDocumentoTraslado(file, documentType, metadata);
          break;
        case MATRICULA_TYPES.SIGUIENTE_GRADO:
          result = await matriculaService.subirDocumentoSiguiente(file, documentType, metadata);
          break;
        default:
          // Si no hay un tipo de matrícula definido, usar el método general
          console.warn(`Tipo de matrícula no definido. Usando método general para subir documento ${documentType}`);
          result = await matriculaService.subirDocumento(file, documentType, metadata);
      }

      if (!result.success) {
        setErrors(prev => ({
          ...prev,
          [documentType]: result.message
        }));
      }

      return result;
    } catch (error) {
      console.error('Error al subir documento:', error);
      setErrors(prev => ({
        ...prev,
        [documentType]: error.message || 'Error al subir el documento'
      }));
      return { success: false };
    }
  };

  /**
   * Elimina un archivo
   * @param {string} documentType - Tipo de documento
   */
  const removeFile = (documentType) => {
    setFormData(prev => ({
      ...prev,
      documentos: prev.documentos.filter(doc => doc.tipo !== documentType)
    }));

    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[documentType];
      return newProgress;
    });

    // Limpiar error del campo
    if (errors[documentType]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[documentType];
        return newErrors;
      });
    }
  };

  /**
   * Valida el formulario completo
   * @returns {boolean} Indica si el formulario es válido
   */
  const validateForm = () => {
    // Validar todos los campos
    const validation = validateMatriculaForm(formData, tipoMatricula);

    // Validar documentos requeridos
    const requiredDocs = REQUIRED_DOCUMENTS[tipoMatricula] || [];
    const documentErrors = {};

    requiredDocs.forEach(doc => {
      if (doc.required && !formData.documentos.some(d => d.tipo === doc.id)) {
        documentErrors[doc.id] = `El documento "${doc.name}" es obligatorio`;
      }
    });

    // Combinar errores
    const allErrors = {
      ...validation.errors,
      ...documentErrors
    };

    setErrors(allErrors);
    setTouchedFields(Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return Object.keys(allErrors).length === 0;
  };

  /**
   * Envía el formulario a la API
   * @returns {Promise<boolean>} Indica si el envío fue exitoso
   */
  const submitForm = async () => {
    if (isSubmitting) return false;

    // Validar formulario
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      let response;

      // Enviar según tipo de matrícula
      switch (tipoMatricula) {
        case MATRICULA_TYPES.NUEVA:
          response = await matriculaService.registrarNuevaMatricula(formData);
          break;
        case MATRICULA_TYPES.TRASLADO:
          response = await matriculaService.registrarMatriculaTraslado(formData);
          break;
        case MATRICULA_TYPES.SIGUIENTE_GRADO:
          response = await matriculaService.registrarMatriculaSiguienteGrado(formData);
          break;
        default:
          throw new Error('Tipo de matrícula no válido');
      }

      if (response.success) {
        // Guardar ID de solicitud
        setSolicitudId(response.data.id);

        // Subir documentos
        if (formData.documentos.length > 0) {
          for (const doc of formData.documentos) {
            await uploadDocument(doc.archivo, doc.tipo, response.data.id);
          }
        }

        setSubmitSuccess(true);
        setIsSubmitted(true);
        return true;
      } else {
        setSubmitError(response.message || 'Error al registrar la matrícula');
        return false;
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitError(error.message || 'Error al procesar la solicitud');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Consulta una matrícula por DNI
   * @param {string} dni - DNI del estudiante
   * @param {string} anioEscolar - Año escolar
   * @returns {Promise<Object>} Resultado de la consulta
   */
  const consultarMatricula = async (dni, anioEscolar) => {
    if (isConsulting) return;

    setIsConsulting(true);
    setConsultResult(null);

    try {
      const result = await matriculaService.consultarMatricula(dni, anioEscolar);
      setConsultResult(result);
      return result;
    } catch (error) {
      console.error('Error al consultar matrícula:', error);
      setConsultResult({
        success: false,
        message: error.message || 'Error al consultar la matrícula'
      });
      return { success: false };
    } finally {
      setIsConsulting(false);
    }
  };

  /**
   * Reinicia el formulario
   */
  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouchedFields({});
    setIsSubmitting(false);
    setIsSubmitted(false);
    setSubmitSuccess(false);
    setSubmitError(null);
    setSolicitudId(null);
    setUploadProgress({});
    setConsultResult(null);
  };

  return {
    formData,
    errors,
    touchedFields,
    isSubmitting,
    isSubmitted,
    submitSuccess,
    submitError,
    solicitudId,
    uploadProgress,
    isConsulting,
    consultResult,
    handleInputChange,
    handleFileChange,
    removeFile,
    submitForm,
    consultarMatricula,
    resetForm,
    validateForm
  };
};

export default useMatriculaForm;

