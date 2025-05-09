import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, FileText, School, UserCheck, Calendar, FileCheck, Building, User, Mail, Phone, X, MapPin, GraduationCap, Heart, Baby, UserCircle, Pencil } from 'lucide-react';
import gsap from 'gsap';

const Form = () => {
  const [tipoMatricula, setTipoMatricula] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const formRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileChange({ target: { files } }, 'current_file_id');
  };

  const handleFileChange = (e, docId) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`El archivo ${file.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: [...(prev[docId] || []), ...validFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        }))]
      }));
    }
  };

  const removeFile = (docId, fileIndex) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docId]: prev[docId].filter((_, index) => index !== fileIndex)
    }));
  };

  const handleTipoMatriculaChange = (e) => {
    setTipoMatricula(e.target.value);
    setUploadedFiles({}); // Limpiar archivos al cambiar tipo
    
    // Animación GSAP
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        {
          filter: 'blur(10px)',
          opacity: 0,
        },
        {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  };

  // Componente para mostrar archivos subidos
  const FilePreview = ({ fieldId }) => {
    const files = uploadedFiles[fieldId] || [];
    if (files.length === 0) return null;

    return (
      <div className="mt-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md mt-1">
            <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[200px]">
              {file.name}
            </span>
            <button
              onClick={() => removeFile(fieldId, index)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Función para obtener las clases de estilo según el tipo de matrícula
  const getFormStyles = () => {
    switch (tipoMatricula) {
      case 'nuevo':
        return {
          headerBg: 'bg-gradient-to-r from-blue-500 to-blue-700',
          cardBg: 'bg-white dark:bg-gray-800',
          borderColor: 'border-blue-500',
          buttonBg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
          iconColor: 'text-blue-500 dark:text-blue-400',
          docsBg: 'bg-blue-50 dark:bg-gray-700',
          docsText: 'text-blue-800 dark:text-blue-300'
        };
      case 'traslado':
        return {
          headerBg: 'bg-gradient-to-r from-green-500 to-green-700',
          cardBg: 'bg-white dark:bg-gray-800',
          borderColor: 'border-green-500',
          buttonBg: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
          iconColor: 'text-green-500 dark:text-green-400',
          docsBg: 'bg-green-50 dark:bg-gray-700',
          docsText: 'text-green-800 dark:text-green-300'
        };
      case 'siguiente':
        return {
          headerBg: 'bg-gradient-to-r from-purple-500 to-purple-700',
          cardBg: 'bg-white dark:bg-gray-800',
          borderColor: 'border-purple-500',
          buttonBg: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600',
          iconColor: 'text-purple-500 dark:text-purple-400',
          docsBg: 'bg-purple-50 dark:bg-gray-700',
          docsText: 'text-purple-800 dark:text-purple-300'
        };
      default:
        return {
          headerBg: 'bg-gradient-to-r from-gray-500 to-gray-700',
          cardBg: 'bg-white dark:bg-gray-800',
          borderColor: 'border-gray-300',
          buttonBg: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
          iconColor: 'text-gray-500 dark:text-gray-400',
          docsBg: 'bg-gray-50 dark:bg-gray-700',
          docsText: 'text-gray-800 dark:text-gray-300'
        };
    }
  };

  const styles = getFormStyles();

  // Definir los documentos requeridos según el tipo de matrícula
  const getRequiredDocs = (tipo) => {
    switch (tipo) {
      case 'nuevo':
        return [
          { id: 'partida', name: 'Partida de nacimiento', multiple: false },
          { id: 'dni_docs', name: 'DNI estudiante y apoderado', multiple: true },
          { id: 'apafa', name: 'Comprobante APAFA', multiple: false },
          { id: 'fotos', name: 'Fotografías tamaño carnet', multiple: true }
        ];
      case 'traslado':
        return [
          { id: 'libreta', name: 'Libreta de notas anterior', multiple: false },
          { id: 'constancia_traslado', name: 'Constancia de traslado', multiple: false },
          { id: 'certificado', name: 'Certificado de estudios', multiple: false },
          { id: 'apafa_traslado', name: 'Comprobante APAFA', multiple: false },
          { id: 'fotos_traslado', name: 'Fotografías tamaño carnet', multiple: true }
        ];
      case 'siguiente':
        return [
          { id: 'libreta_siguiente', name: 'Libreta de notas del año anterior', multiple: false },
          { id: 'apafa_siguiente', name: 'Comprobante APAFA', multiple: false },
          { id: 'constancia_no_adeudo', name: 'Constancia de no adeudo', multiple: false },
          { id: 'foto_siguiente', name: 'Fotografía tamaño carnet', multiple: false }
        ];
      default:
        return [];
    }
  };

  // Modificar la sección de documentos requeridos
  const renderDocumentUploadSection = () => {
    const requiredDocs = getRequiredDocs(tipoMatricula);
    
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex items-start justify-between p-6">
          <div className="flex items-center">
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </span>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Documentos Requeridos</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sube los documentos necesarios para la matrícula</p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="space-y-4">
            {requiredDocs.map((doc) => (
              <div key={doc.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id={doc.id}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, doc.id)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple={doc.multiple}
                    />
                    <label
                      htmlFor={doc.id}
                      className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-md cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200"
                    >
                      Seleccionar archivo{doc.multiple ? 's' : ''}
                    </label>
                  </div>
                </div>

                {/* Preview de archivos */}
                <div className="space-y-2">
                  {uploadedFiles[doc.id]?.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(doc.id, index)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                      >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Mensaje de ayuda */}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {doc.multiple ? 'Puedes seleccionar múltiples archivos. ' : ''}
                  Formatos aceptados: PDF, JPG, JPEG, PNG. Máximo 5MB por archivo.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`w-full ${styles.cardBg} rounded-xl shadow-lg overflow-hidden`}>
            <div className={`${styles.headerBg} p-6 flex items-center justify-between`}>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Matrícula Escolar Primaria</h2>
                <p className="text-white text-opacity-90">Año Escolar 2025</p>
              </div>
              <div className="hidden md:block">
                <img src="/escudo.png" alt="Escudo del colegio" className="h-16" />
              </div>
            </div>

            <form className="p-6 space-y-6" ref={formRef}>
              {/* Tipo de Matrícula */}
              <div className="border-b dark:border-gray-700 pb-6">
                <div className="flex items-center mb-4">
                  <School className={`mr-2 ${styles.iconColor}`} size={20} />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tipo de Matrícula</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      tipoMatricula === 'nuevo'
                        ? `${styles.borderColor} bg-blue-50 dark:bg-gray-700`
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                    onClick={() => setTipoMatricula('nuevo')}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="tipoNuevo"
                        name="tipoMatricula"
                        value="nuevo"
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        required
                        onChange={handleTipoMatriculaChange}
                        checked={tipoMatricula === 'nuevo'}
                      />
                      <label htmlFor="tipoNuevo" className="ml-2 font-medium text-gray-800 dark:text-white">
                        Matrícula por primera vez
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">Para estudiantes que ingresan por primera vez a nuestra institución</p>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      tipoMatricula === 'traslado'
                        ? `${styles.borderColor} bg-green-50 dark:bg-gray-700`
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500'
                    }`}
                    onClick={() => setTipoMatricula('traslado')}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="tipoTraslado"
                        name="tipoMatricula"
                        value="traslado"
                        className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                        onChange={handleTipoMatriculaChange}
                        checked={tipoMatricula === 'traslado'}
                      />
                      <label htmlFor="tipoTraslado" className="ml-2 font-medium text-gray-800 dark:text-white">
                        Traslado
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">Para estudiantes que provienen de otra institución educativa</p>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                      tipoMatricula === 'siguiente'
                        ? `${styles.borderColor} bg-purple-50 dark:bg-gray-700`
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500'
                    }`}
                    onClick={() => setTipoMatricula('siguiente')}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        id="tipoSiguiente"
                        name="tipoMatricula"
                        value="siguiente"
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        onChange={handleTipoMatriculaChange}
                        checked={tipoMatricula === 'siguiente'}
                      />
                      <label htmlFor="tipoSiguiente" className="ml-2 font-medium text-gray-800 dark:text-white">
                        Paso al siguiente grado
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 ml-6">Para estudiantes que ya están matriculados y pasan al siguiente grado</p>
                  </div>
                </div>

                {/* Lista de documentos requeridos */}
                {tipoMatricula && (
                  <div className="border-b dark:border-gray-700 pb-6">
                    {renderDocumentUploadSection()}
                  </div>
                )}
              </div>

              {/* Datos del Estudiante */}
              {tipoMatricula && (
                <div className="border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-6">
                    <User className={`mr-2 ${styles.iconColor}`} size={20} />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Estudiante</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombres y Apellidos */}
                    <div className="relative col-span-2">
                      <div className="flex items-center">
                        <Pencil className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="nombre"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="nombre"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Nombres y Apellidos
                      </label>
                    </div>

                    {/* DNI */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Baby className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="dni"
                          maxLength="8"
                          pattern="[0-9]{8}"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="dni"
                        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'peer-focus:text-blue-600 dark:peer-focus:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'peer-focus:text-green-600 dark:peer-focus:text-green-400'
                            : 'peer-focus:text-purple-600 dark:peer-focus:text-purple-400'
                        }`}
                      >
                        DNI del Estudiante
                      </label>
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Calendar className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="date"
                          id="fechaNacimiento"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        />
                      </div>
                      <label
                        htmlFor="fechaNacimiento"
                        className={`text-sm font-medium block mb-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'text-blue-600 dark:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        Fecha de Nacimiento
                      </label>
                    </div>

                    {/* Dirección */}
                    <div className="relative col-span-2">
                      <div className="flex items-center">
                        <MapPin className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="direccion"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="direccion"
                        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'peer-focus:text-blue-600 dark:peer-focus:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'peer-focus:text-green-600 dark:peer-focus:text-green-400'
                            : 'peer-focus:text-purple-600 dark:peer-focus:text-purple-400'
                        }`}
                      >
                        Dirección Completa
                      </label>
                    </div>

                    {/* Género */}
                    <div className="relative">
                      <div className="flex items-center">
                        <User className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <select
                          id="genero"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="M">Masculino</option>
                          <option value="F">Femenino</option>
                        </select>
                      </div>
                      <label
                        htmlFor="genero"
                        className={`text-sm font-medium block mb-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'text-blue-600 dark:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        Género
                      </label>
                    </div>

                    {/* Grado a cursar */}
                    <div className="relative">
                      <div className="flex items-center">
                        <GraduationCap className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <select
                          id="grado"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1° Grado</option>
                          <option value="2">2° Grado</option>
                          <option value="3">3° Grado</option>
                          <option value="4">4° Grado</option>
                          <option value="5">5° Grado</option>
                          <option value="6">6° Grado</option>
                        </select>
                      </div>
                      <label
                        htmlFor="grado"
                        className={`text-sm font-medium block mb-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'text-blue-600 dark:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                      >
                        Grado a cursar
                      </label>
                    </div>

                    {/* Alergias */}
                    <div className="relative col-span-2">
                      <div className="flex items-center">
                        <Heart className={`absolute left-4 top-3 ${styles.iconColor}`} size={18} />
                        <textarea
                          id="alergias"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          rows="2"
                        />
                      </div>
                      <label
                        htmlFor="alergias"
                        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 left-1 ${
                          tipoMatricula === 'nuevo'
                            ? 'peer-focus:text-blue-600 dark:peer-focus:text-blue-400'
                            : tipoMatricula === 'traslado'
                            ? 'peer-focus:text-green-600 dark:peer-focus:text-green-400'
                            : 'peer-focus:text-purple-600 dark:peer-focus:text-purple-400'
                        }`}
                      >
                        Alergias o Condiciones Médicas (opcional)
                      </label>
                    </div>

                    {/* Colegio de Procedencia (para traslados) */}
                    {tipoMatricula === 'traslado' && (
                      <div className="relative col-span-2">
                        <div className="flex items-center">
                          <School className={`absolute left-4 ${styles.iconColor}`} size={18} />
                          <input
                            type="text"
                            id="colegioAnterior"
                            className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                              tipoMatricula === 'traslado'
                                ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                                : 'border-gray-200'
                            }`}
                            placeholder=" "
                            required
                          />
                        </div>
                        <label
                          htmlFor="colegioAnterior"
                          className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                        >
                          Colegio de Procedencia
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Datos del Apoderado */}
              {tipoMatricula && (
                <div className="border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-6">
                    <UserCheck className={`mr-2 ${styles.iconColor}`} size={20} />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Apoderado</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nombres y Apellidos del Apoderado */}
                    <div className="relative col-span-2">
                      <div className="flex items-center">
                        <UserCircle className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="nombreApoderado"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="nombreApoderado"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Nombres y Apellidos del Apoderado
                      </label>
                    </div>

                    {/* DNI del Apoderado */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Baby className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="dniApoderado"
                          maxLength="8"
                          pattern="[0-9]{8}"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="dniApoderado"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        DNI del Apoderado
                      </label>
                    </div>

                    {/* Parentesco */}
                    <div className="relative">
                      <div className="flex items-center">
                        <UserCheck className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <select
                          id="parentesco"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="padre">Padre</option>
                          <option value="madre">Madre</option>
                          <option value="abuelo">Abuelo/a</option>
                          <option value="tio">Tío/a</option>
                          <option value="hermano">Hermano/a</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <label htmlFor="parentesco" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        Parentesco
                      </label>
                    </div>

                    {/* Ocupación */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Building className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="ocupacion"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="ocupacion"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Ocupación
                      </label>
                    </div>

                    {/* Dirección del Apoderado */}
                    <div className="relative col-span-2">
                      <div className="flex items-center">
                        <MapPin className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="text"
                          id="direccionApoderado"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="direccionApoderado"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Dirección del Apoderado
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Mail className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="email"
                          id="email"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200"
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="email"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Correo Electrónico
                      </label>
                    </div>

                    {/* Teléfono Celular */}
                    <div className="relative">
                      <div className="flex items-center">
                        <Phone className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <input
                          type="tel"
                          id="telefono"
                          pattern="[0-9]{9}"
                          maxLength="9"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200"
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="telefono"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Teléfono Celular
                      </label>
                    </div>

                    {/* Estado Civil */}
                    <div className="relative">
                      <div className="flex items-center">
                        <User className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <select
                          id="estadoCivil"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="soltero">Soltero/a</option>
                          <option value="casado">Casado/a</option>
                          <option value="divorciado">Divorciado/a</option>
                          <option value="viudo">Viudo/a</option>
                          <option value="conviviente">Conviviente</option>
                        </select>
                      </div>
                      <label htmlFor="estadoCivil" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        Estado Civil
                      </label>
                    </div>

                    {/* Grado de Instrucción */}
                    <div className="relative">
                      <div className="flex items-center">
                        <GraduationCap className={`absolute left-4 ${styles.iconColor}`} size={18} />
                        <select
                          id="gradoInstruccion"
                          className={`w-full pl-12 pr-4 py-3 border-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200 ${
                            tipoMatricula === 'nuevo'
                              ? 'border-blue-200 focus:ring-blue-500 dark:focus:ring-blue-400'
                              : tipoMatricula === 'traslado'
                              ? 'border-green-200 focus:ring-green-500 dark:focus:ring-green-400'
                              : 'border-purple-200 focus:ring-purple-500 dark:focus:ring-purple-400'
                          }`}
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="primaria">Primaria</option>
                          <option value="secundaria">Secundaria</option>
                          <option value="tecnico">Técnico</option>
                          <option value="universitario">Universitario</option>
                          <option value="postgrado">Postgrado</option>
                        </select>
                      </div>
                      <label htmlFor="gradoInstruccion" className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                        Grado de Instrucción
                      </label>
                    </div>

                    {/* Contacto de Emergencia Alternativo */}
                    <div className="relative col-span-2">
                      <input
                        type="text"
                        id="contactoEmergencia"
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer transition-colors duration-200"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="contactoEmergencia"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Contacto de Emergencia Alternativo
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Términos y botón de envío - Solo se muestra si se ha seleccionado un tipo de matrícula */}
              {tipoMatricula && (
                <div>
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="terminos"
                      className="w-4 h-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                      required
                    />
                    <label htmlFor="terminos" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      Acepto los términos y condiciones de la matrícula y declaro que la información proporcionada es verídica.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full ${styles.buttonBg} text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md`}
                  >
                    Enviar Solicitud de Matrícula
                  </button>

                  <div className="text-center mt-6">
                    <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Volver a la página principal
                    </Link>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Form;
