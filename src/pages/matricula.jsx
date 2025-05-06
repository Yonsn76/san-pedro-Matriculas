import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, FileText, School, UserCheck, Calendar, FileCheck, Building, User, Mail, Phone } from 'lucide-react';

const Form = () => {
  const [tipoMatricula, setTipoMatricula] = useState('');

  const handleTipoMatriculaChange = (e) => {
    setTipoMatricula(e.target.value);
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

            <form className="p-6 space-y-6">
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

                {/* Documentos requeridos según tipo de matrícula */}
                {tipoMatricula && (
                  <div className={`mt-6 p-4 ${styles.docsBg} rounded-lg`}>
                    <div className="flex items-center mb-3">
                      <FileText className={styles.iconColor} size={18} />
                      <h4 className={`font-medium ${styles.docsText} ml-2`}>Documentos requeridos:</h4>
                    </div>
                    <ul className="list-disc pl-8 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {tipoMatricula === 'nuevo' && (
                        <>
                          <li>Partida de nacimiento</li>
                          <li>DNI del estudiante y apoderado</li>
                          <li>Comprobante de pago de APAFA</li>
                          <li>Ficha de matrícula</li>
                          <li>2 fotografías tamaño carnet</li>
                        </>
                      )}

                      {tipoMatricula === 'traslado' && (
                        <>
                          <li>Libreta de notas de la institución anterior</li>
                          <li>Constancia de traslado</li>
                          <li>Certificado de estudios</li>
                          <li>Comprobante de pago de APAFA</li>
                          <li>Documentos de la institución anterior</li>
                          <li>2 fotografías tamaño carnet</li>
                        </>
                      )}

                      {tipoMatricula === 'siguiente' && (
                        <>
                          <li>Libreta de notas del año anterior</li>
                          <li>Comprobante de pago de APAFA</li>
                          <li>Constancia de no adeudo</li>
                          <li>1 fotografía tamaño carnet</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Datos del Estudiante - Solo se muestra si se ha seleccionado un tipo de matrícula */}
              {tipoMatricula && (
                <div className="border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-4">
                    <User className={`mr-2 ${styles.iconColor}`} size={20} />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Estudiante</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="nombre"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="nombre"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Nombres y Apellidos
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="dni"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="dni"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        DNI
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        id="fechaNacimiento"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                      <label
                        htmlFor="fechaNacimiento"
                        className="text-xs text-gray-500 dark:text-gray-400 block mb-1"
                      >
                        Fecha de Nacimiento
                      </label>
                    </div>

                    <div className="relative">
                      <select
                        id="grado"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                      <label htmlFor="grado" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Grado a cursar</label>
                    </div>
                  </div>

                  {/* Campos adicionales según tipo de matrícula */}
                  {tipoMatricula === 'traslado' && (
                    <div className="mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-gray-700">
                      <h4 className="font-medium text-green-800 dark:text-green-300 mb-3">Información de la institución anterior</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            type="text"
                            id="institucionAnterior"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="institucionAnterior"
                            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600 dark:peer-focus:text-green-400 left-1"
                          >
                            Institución Educativa Anterior
                          </label>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            id="codigoModular"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                            placeholder=" "
                          />
                          <label
                            htmlFor="codigoModular"
                            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-green-600 dark:peer-focus:text-green-400 left-1"
                          >
                            Código Modular (opcional)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {tipoMatricula === 'siguiente' && (
                    <div className="mt-6 p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-gray-700">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-3">Información del grado anterior</h4>
                      <div className="relative">
                        <select
                          id="gradoAnterior"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          required
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1° Grado</option>
                          <option value="2">2° Grado</option>
                          <option value="3">3° Grado</option>
                          <option value="4">4° Grado</option>
                          <option value="5">5° Grado</option>
                        </select>
                        <label htmlFor="gradoAnterior" className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Grado anterior</label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Datos del Apoderado - Solo se muestra si se ha seleccionado un tipo de matrícula */}
              {tipoMatricula && (
                <div className="border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center mb-4">
                    <UserCheck className={`mr-2 ${styles.iconColor}`} size={20} />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Datos del Apoderado</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        type="text"
                        id="nombreApoderado"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="nombreApoderado"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Nombres y Apellidos
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        id="dniApoderado"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="dniApoderado"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        DNI
                      </label>
                    </div>

                    <div className="relative">
                      <div className="flex items-center">
                        <Mail className={`absolute left-3 ${styles.iconColor}`} size={16} />
                        <input
                          type="email"
                          id="email"
                          className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
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

                    <div className="relative">
                      <div className="flex items-center">
                        <Phone className={`absolute left-3 ${styles.iconColor}`} size={16} />
                        <input
                          type="tel"
                          id="telefono"
                          className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white peer"
                          placeholder=" "
                          required
                        />
                      </div>
                      <label
                        htmlFor="telefono"
                        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-700 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 left-1"
                      >
                        Teléfono
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
