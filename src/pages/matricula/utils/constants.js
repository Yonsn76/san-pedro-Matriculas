/**
 * Constantes para la sección de matrícula
 */

// Tipos de matrícula
export const MATRICULA_TYPES = {
  NUEVA: 'nueva',
  TRASLADO: 'traslado',
  SIGUIENTE_GRADO: 'siguiente'
};

// Colores por tipo de matrícula
export const THEME_COLORS = {
  [MATRICULA_TYPES.NUEVA]: {
    primary: '#4f46e5', // indigo-600
    secondary: '#818cf8', // indigo-400
    light: '#eef2ff', // indigo-50
    dark: '#3730a3', // indigo-800
    gradient: 'from-indigo-600 to-blue-500',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-700',
    focus: 'focus:ring-indigo-500',
    text: 'text-indigo-600',
    textDark: 'text-indigo-800',
    bgLight: 'bg-indigo-50',
    bgDark: 'bg-indigo-900'
  },
  [MATRICULA_TYPES.TRASLADO]: {
    primary: '#0d9488', // teal-600
    secondary: '#2dd4bf', // teal-400
    light: '#f0fdfa', // teal-50
    dark: '#115e59', // teal-800
    gradient: 'from-teal-600 to-emerald-500',
    border: 'border-teal-200',
    hover: 'hover:bg-teal-700',
    focus: 'focus:ring-teal-500',
    text: 'text-teal-600',
    textDark: 'text-teal-800',
    bgLight: 'bg-teal-50',
    bgDark: 'bg-teal-900'
  },
  [MATRICULA_TYPES.SIGUIENTE_GRADO]: {
    primary: '#d97706', // amber-600
    secondary: '#fbbf24', // amber-400
    light: '#fffbeb', // amber-50
    dark: '#92400e', // amber-800
    gradient: 'from-amber-500 to-orange-400',
    border: 'border-amber-200',
    hover: 'hover:bg-amber-700',
    focus: 'focus:ring-amber-500',
    text: 'text-amber-600',
    textDark: 'text-amber-800',
    bgLight: 'bg-amber-50',
    bgDark: 'bg-amber-900'
  }
};

// Documentos requeridos por tipo de matrícula
export const REQUIRED_DOCUMENTS = {
  [MATRICULA_TYPES.NUEVA]: [
    { 
      id: 'partida_nacimiento', 
      name: 'Partida de nacimiento', 
      description: 'Documento oficial que certifica el nacimiento del estudiante',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'dni_estudiante', 
      name: 'DNI del estudiante', 
      description: 'Documento Nacional de Identidad del estudiante',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'dni_apoderado', 
      name: 'DNI del apoderado', 
      description: 'Documento Nacional de Identidad del apoderado',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'certificado_vacunacion', 
      name: 'Certificado de vacunación', 
      description: 'Certificado que acredita las vacunas recibidas por el estudiante',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'foto_estudiante', 
      name: 'Fotografía del estudiante', 
      description: 'Fotografía reciente tamaño carnet con fondo blanco',
      required: true,
      acceptedFormats: '.jpg,.jpeg,.png'
    }
  ],
  [MATRICULA_TYPES.TRASLADO]: [
    { 
      id: 'constancia_matricula', 
      name: 'Constancia de matrícula', 
      description: 'Documento que certifica la matrícula en la institución anterior',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'libreta_notas', 
      name: 'Libreta de notas', 
      description: 'Libreta de notas del año escolar anterior',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'partida_nacimiento', 
      name: 'Partida de nacimiento', 
      description: 'Documento oficial que certifica el nacimiento del estudiante',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'dni_estudiante', 
      name: 'DNI del estudiante', 
      description: 'Documento Nacional de Identidad del estudiante',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'dni_apoderado', 
      name: 'DNI del apoderado', 
      description: 'Documento Nacional de Identidad del apoderado',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    }
  ],
  [MATRICULA_TYPES.SIGUIENTE_GRADO]: [
    { 
      id: 'libreta_notas', 
      name: 'Libreta de notas del año escolar actual', 
      description: 'Libreta de notas del año escolar que está cursando',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    },
    { 
      id: 'comprobante_apafa', 
      name: 'Comprobante de pago APAFA', 
      description: 'Comprobante de pago de la Asociación de Padres de Familia',
      required: true,
      acceptedFormats: '.pdf,.jpg,.jpeg,.png'
    }
  ]
};

// Opciones para los selectores
export const SELECT_OPTIONS = {
  GENERO: [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Femenino', label: 'Femenino' }
  ],
  GRADO: [
    { value: '1', label: '1° Grado' },
    { value: '2', label: '2° Grado' },
    { value: '3', label: '3° Grado' },
    { value: '4', label: '4° Grado' },
    { value: '5', label: '5° Grado' },
    { value: '6', label: '6° Grado' }
  ],
  PARENTESCO: [
    { value: 'Padre', label: 'Padre' },
    { value: 'Madre', label: 'Madre' },
    { value: 'Abuelo/a', label: 'Abuelo/a' },
    { value: 'Tío/a', label: 'Tío/a' },
    { value: 'Hermano/a', label: 'Hermano/a' },
    { value: 'Tutor legal', label: 'Tutor legal' },
    { value: 'Otro', label: 'Otro' }
  ],
  GRADO_INSTRUCCION: [
    { value: 'Primaria', label: 'Primaria' },
    { value: 'Secundaria', label: 'Secundaria' },
    { value: 'Técnico', label: 'Técnico' },
    { value: 'Universitario', label: 'Universitario' },
    { value: 'Postgrado', label: 'Postgrado' },
    { value: 'Otro', label: 'Otro' }
  ]
};

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    MATRICULA: '/matriculas',
    NUEVA: '/matriculas/nueva',
    TRASLADO: '/matriculas/traslado',
    SIGUIENTE: '/matriculas/siguiente',
    DOCUMENTOS: '/documentos',
    CONSULTA: '/matriculas/consulta'
  },
  TIMEOUT: 30000 // 30 segundos
};

// Configuración de archivos
export const FILE_CONFIG = {
  ALLOWED_TYPES: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ERROR_MESSAGES: {
    INVALID_TYPE: 'Tipo de archivo no válido. Solo se permiten archivos PDF, JPG, JPEG y PNG',
    TOO_LARGE: 'El archivo es demasiado grande. El tamaño máximo permitido es 5MB'
  }
};
