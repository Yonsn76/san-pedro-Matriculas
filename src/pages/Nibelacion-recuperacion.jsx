import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, Award, AlertCircle } from 'lucide-react';

function NibelacionRecuperacion() {
  const [activeTab, setActiveTab] = useState('info');

  const programInfo = {
    description: 'Nuestro programa de nivelación y recuperación está diseñado para ayudar a los estudiantes a reforzar sus conocimientos y habilidades en áreas específicas donde puedan estar experimentando dificultades.',
    benefits: [
      'Atención personalizada según las necesidades del estudiante',
      'Metodología adaptada al ritmo de aprendizaje individual',
      'Evaluación continua del progreso',
      'Materiales didácticos especializados',
      'Profesores altamente calificados'
    ],
    schedule: 'Las sesiones se programan después del horario escolar regular, con opciones flexibles según la disponibilidad del estudiante.',
    notice: 'Por el momento no contamos con cursos disponibles. Las inscripciones para el próximo periodo se anunciarán próximamente.'
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Programa de Nivelación y Recuperación
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Apoyo académico personalizado para estudiantes que necesitan reforzar sus conocimientos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative
              ${activeTab === 'info'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Información General</span>
            </div>
            {activeTab === 'info' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative
              ${activeTab === 'benefits'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
          >
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Beneficios</span>
            </div>
            {activeTab === 'benefits' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative
              ${activeTab === 'schedule'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'}`}
          >
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Horarios</span>
            </div>
            {activeTab === 'schedule' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
          {activeTab === 'info' && (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {programInfo.description}
              </p>
              <div className="bg-yellow-50 dark:bg-gray-700 p-4 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  {programInfo.notice}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Beneficios del Programa</h3>
              <ul className="space-y-3">
                {programInfo.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Horarios</h3>
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 dark:text-gray-300">
                  {programInfo.schedule}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  Las fechas específicas y la disponibilidad de horarios se anunciarán cuando se abran las inscripciones.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NibelacionRecuperacion;