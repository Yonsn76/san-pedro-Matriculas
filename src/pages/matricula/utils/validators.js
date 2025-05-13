/**
 * Utilidades de validación para formularios de matrícula
 */
import { MATRICULA_TYPES, FILE_CONFIG } from './constants';

/**
 * Valida un DNI peruano (8 dígitos numéricos)
 * @param {string} dni - DNI a validar
 * @returns {Object} Resultado de la validación
 */
export const validateDNI = (dni) => {
  if (!dni) {
    return { 
      isValid: false, 
      error: 'El DNI es obligatorio' 
    };
  }
  
  if (dni.length !== 8) {
    return { 
      isValid: false, 
      error: 'El DNI debe tener 8 dígitos' 
    };
  }
  
  if (!/^\d+$/.test(dni)) {
    return { 
      isValid: false, 
      error: 'El DNI debe contener solo números' 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida un correo electrónico
 * @param {string} email - Correo electrónico a validar
 * @param {boolean} required - Indica si el campo es obligatorio
 * @returns {Object} Resultado de la validación
 */
export const validateEmail = (email, required = false) => {
  if (!email) {
    return { 
      isValid: !required, 
      error: required ? 'El correo electrónico es obligatorio' : null 
    };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { 
      isValid: false, 
      error: 'El formato del correo electrónico no es válido' 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida un número de teléfono peruano (9 dígitos)
 * @param {string} phone - Teléfono a validar
 * @returns {Object} Resultado de la validación
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { 
      isValid: false, 
      error: 'El teléfono es obligatorio' 
    };
  }
  
  if (!/^\d{9}$/.test(phone)) {
    return { 
      isValid: false, 
      error: 'El teléfono debe tener 9 dígitos numéricos' 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida una fecha en formato YYYY-MM-DD
 * @param {string} date - Fecha a validar
 * @returns {Object} Resultado de la validación
 */
export const validateDate = (date) => {
  if (!date) {
    return { 
      isValid: false, 
      error: 'La fecha es obligatoria' 
    };
  }
  
  // Verificar formato YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return { 
      isValid: false, 
      error: 'El formato de fecha debe ser YYYY-MM-DD' 
    };
  }
  
  // Verificar que sea una fecha válida
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return { 
      isValid: false, 
      error: 'La fecha no es válida' 
    };
  }
  
  // Verificar que no sea una fecha futura
  const today = new Date();
  if (dateObj > today) {
    return { 
      isValid: false, 
      error: 'La fecha no puede ser futura' 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida un archivo
 * @param {File} file - Archivo a validar
 * @param {boolean} required - Indica si el archivo es obligatorio
 * @returns {Object} Resultado de la validación
 */
export const validateFile = (file, required = true) => {
  if (!file) {
    return { 
      isValid: !required, 
      error: required ? 'El archivo es obligatorio' : null 
    };
  }
  
  // Validar tipo de archivo
  if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: FILE_CONFIG.ERROR_MESSAGES.INVALID_TYPE 
    };
  }
  
  // Validar tamaño de archivo
  if (file.size > FILE_CONFIG.MAX_SIZE) {
    return { 
      isValid: false, 
      error: FILE_CONFIG.ERROR_MESSAGES.TOO_LARGE 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida un campo de texto genérico
 * @param {string} value - Valor a validar
 * @param {string} fieldName - Nombre del campo para el mensaje de error
 * @param {boolean} required - Indica si el campo es obligatorio
 * @param {number} minLength - Longitud mínima del campo
 * @param {number} maxLength - Longitud máxima del campo
 * @returns {Object} Resultado de la validación
 */
export const validateTextField = (value, fieldName, required = true, minLength = 0, maxLength = 255) => {
  if (!value && required) {
    return { 
      isValid: false, 
      error: `El campo ${fieldName} es obligatorio` 
    };
  }
  
  if (value && minLength > 0 && value.length < minLength) {
    return { 
      isValid: false, 
      error: `El campo ${fieldName} debe tener al menos ${minLength} caracteres` 
    };
  }
  
  if (value && maxLength > 0 && value.length > maxLength) {
    return { 
      isValid: false, 
      error: `El campo ${fieldName} no puede exceder los ${maxLength} caracteres` 
    };
  }
  
  return { isValid: true };
};

/**
 * Valida un formulario completo de matrícula
 * @param {Object} formData - Datos del formulario
 * @param {string} tipoMatricula - Tipo de matrícula
 * @returns {Object} Resultado de la validación
 */
export const validateMatriculaForm = (formData, tipoMatricula) => {
  const errors = {};
  
  // Validaciones comunes para todos los tipos de matrícula
  if (!formData.anioEscolar) {
    errors.anioEscolar = 'El año escolar es obligatorio';
  }
  
  // Validaciones específicas por tipo de matrícula
  if (tipoMatricula === MATRICULA_TYPES.NUEVA || tipoMatricula === MATRICULA_TYPES.TRASLADO) {
    // Validar datos del estudiante
    const nombreEstudianteValidation = validateTextField(formData.nombreEstudiante, 'Nombre del estudiante');
    if (!nombreEstudianteValidation.isValid) {
      errors.nombreEstudiante = nombreEstudianteValidation.error;
    }
    
    const dniEstudianteValidation = validateDNI(formData.dniEstudiante);
    if (!dniEstudianteValidation.isValid) {
      errors.dniEstudiante = dniEstudianteValidation.error;
    }
    
    const fechaNacimientoValidation = validateDate(formData.fechaNacimiento);
    if (!fechaNacimientoValidation.isValid) {
      errors.fechaNacimiento = fechaNacimientoValidation.error;
    }
    
    if (!formData.genero) {
      errors.genero = 'El género es obligatorio';
    }
    
    const direccionValidation = validateTextField(formData.direccion, 'Dirección');
    if (!direccionValidation.isValid) {
      errors.direccion = direccionValidation.error;
    }
    
    if (!formData.gradoSolicitado) {
      errors.gradoSolicitado = 'El grado solicitado es obligatorio';
    }
    
    // Validar datos del apoderado
    const nombreApoderadoValidation = validateTextField(formData.nombreApoderado, 'Nombre del apoderado');
    if (!nombreApoderadoValidation.isValid) {
      errors.nombreApoderado = nombreApoderadoValidation.error;
    }
    
    const dniApoderadoValidation = validateDNI(formData.dniApoderado);
    if (!dniApoderadoValidation.isValid) {
      errors.dniApoderado = dniApoderadoValidation.error;
    }
    
    if (!formData.parentesco) {
      errors.parentesco = 'El parentesco es obligatorio';
    }
    
    const ocupacionValidation = validateTextField(formData.ocupacion, 'Ocupación');
    if (!ocupacionValidation.isValid) {
      errors.ocupacion = ocupacionValidation.error;
    }
    
    if (!formData.gradoInstruccion) {
      errors.gradoInstruccion = 'El grado de instrucción es obligatorio';
    }
    
    const telefonoValidation = validatePhone(formData.telefono);
    if (!telefonoValidation.isValid) {
      errors.telefono = telefonoValidation.error;
    }
    
    if (formData.email) {
      const emailValidation = validateEmail(formData.email, false);
      if (!emailValidation.isValid) {
        errors.email = emailValidation.error;
      }
    }
    
    const direccionApoderadoValidation = validateTextField(formData.direccionApoderado, 'Dirección del apoderado');
    if (!direccionApoderadoValidation.isValid) {
      errors.direccionApoderado = direccionApoderadoValidation.error;
    }
    
    // Validaciones específicas para traslado
    if (tipoMatricula === MATRICULA_TYPES.TRASLADO) {
      const colegioAnteriorValidation = validateTextField(formData.colegioAnterior, 'Colegio anterior');
      if (!colegioAnteriorValidation.isValid) {
        errors.colegioAnterior = colegioAnteriorValidation.error;
      }
    }
  } else if (tipoMatricula === MATRICULA_TYPES.SIGUIENTE_GRADO) {
    // Validaciones para matrícula de siguiente grado
    if (!formData.estudianteId) {
      errors.estudianteId = 'El ID del estudiante es obligatorio';
    }
    
    if (!formData.gradoActual) {
      errors.gradoActual = 'El grado actual es obligatorio';
    }
    
    if (!formData.gradoSiguiente) {
      errors.gradoSiguiente = 'El grado siguiente es obligatorio';
    }
    
    if (!formData.anioEscolarActual) {
      errors.anioEscolarActual = 'El año escolar actual es obligatorio';
    }
    
    if (!formData.anioEscolarSiguiente) {
      errors.anioEscolarSiguiente = 'El año escolar siguiente es obligatorio';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
