import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Form = () => {
  const [tipoMatricula, setTipoMatricula] = useState('');

  const handleTipoMatriculaChange = (e) => {
    setTipoMatricula(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center my-10 px-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Matrícula Escolar Primaria</h2>
          <form className="space-y-4">
            {/* Tipo de Matrícula */}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Tipo de Matrícula</h3>

              <div className="space-y-2">
                <div className="flex items-center">
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
                  <label htmlFor="tipoNuevo" className="ml-2 text-gray-700">
                    Matrícula por primera vez
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tipoTraslado"
                    name="tipoMatricula"
                    value="traslado"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    onChange={handleTipoMatriculaChange}
                    checked={tipoMatricula === 'traslado'}
                  />
                  <label htmlFor="tipoTraslado" className="ml-2 text-gray-700">
                    Traslado desde otra institución
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="tipoSiguiente"
                    name="tipoMatricula"
                    value="siguiente"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    onChange={handleTipoMatriculaChange}
                    checked={tipoMatricula === 'siguiente'}
                  />
                  <label htmlFor="tipoSiguiente" className="ml-2 text-gray-700">
                    Paso al siguiente grado
                  </label>
                </div>
              </div>

              {/* Documentos requeridos según tipo de matrícula */}
              {tipoMatricula && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Documentos requeridos:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {tipoMatricula === 'nuevo' && (
                      <>
                        <li>Partida de nacimiento</li>
                        <li>DNI del estudiante y apoderado</li>
                        <li>Comprobante de pago de APAFA</li>
                        <li>Ficha de matrícula</li>
                      </>
                    )}

                    {tipoMatricula === 'traslado' && (
                      <>
                        <li>Libreta de notas de la institución anterior</li>
                        <li>Constancia de traslado</li>
                        <li>Certificado de estudios</li>
                        <li>Comprobante de pago de APAFA</li>
                        <li>Documentos de la institución anterior</li>
                      </>
                    )}

                    {tipoMatricula === 'siguiente' && (
                      <>
                        <li>Libreta de notas del año anterior</li>
                        <li>Comprobante de pago de APAFA</li>
                        <li>Constancia de no adeudo</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Datos del Estudiante - Solo se muestra si se ha seleccionado un tipo de matrícula */}
            {tipoMatricula && (
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Datos del Estudiante</h3>

                <div className="relative mb-4">
                  <input
                    type="text"
                    id="nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="nombre"
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                  >
                    Nombres y Apellidos
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      id="fechaNacimiento"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                      required
                    />
                    <label
                      htmlFor="fechaNacimiento"
                      className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 left-1"
                    >
                      Fecha de Nacimiento
                    </label>
                  </div>
                  <div className="relative">
                    <select
                      id="grado"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label htmlFor="grado" className="text-xs text-gray-500">Grado a cursar</label>
                  </div>
                </div>

                {/* Campos adicionales según tipo de matrícula */}
                {tipoMatricula === 'traslado' && (
                  <div className="mt-4">
                    <div className="relative mb-4">
                      <input
                        type="text"
                        id="institucionAnterior"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="institucionAnterior"
                        className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                      >
                        Institución Educativa Anterior
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="codigoModular"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="codigoModular"
                        className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                      >
                        Código Modular (opcional)
                      </label>
                    </div>
                  </div>
                )}

                {tipoMatricula === 'siguiente' && (
                  <div className="mt-4">
                    <div className="relative">
                      <select
                        id="gradoAnterior"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">1° Grado</option>
                        <option value="2">2° Grado</option>
                        <option value="3">3° Grado</option>
                        <option value="4">4° Grado</option>
                        <option value="5">5° Grado</option>
                      </select>
                      <label htmlFor="gradoAnterior" className="text-xs text-gray-500">Grado anterior</label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Datos del Apoderado - Solo se muestra si se ha seleccionado un tipo de matrícula */}
            {tipoMatricula && (
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Datos del Apoderado</h3>

                <div className="relative mb-4">
                  <input
                    type="text"
                    id="nombreApoderado"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="nombreApoderado"
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                  >
                    Nombres y Apellidos
                  </label>
                </div>

                <div className="relative mb-4">
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                  >
                    Correo Electrónico
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    id="telefono"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="telefono"
                    className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1"
                  >
                    Teléfono
                  </label>
                </div>
              </div>
            )}

            {/* Términos y botón de envío - Solo se muestra si se ha seleccionado un tipo de matrícula */}
            {tipoMatricula && (
              <>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terminos"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terminos" className="ml-2 text-sm text-gray-600">
                    Acepto los términos y condiciones
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Enviar Matrícula
                </button>
              </>
            )}

            <div className="text-center mt-4">
              <Link to="/" className="text-blue-600 hover:underline">
                Volver a la página principal
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Form;
