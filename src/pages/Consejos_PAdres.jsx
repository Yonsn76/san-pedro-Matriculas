import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, BookOpen, Users, School } from 'lucide-react';

function ConsejosPadres() {
  const [activeSection, setActiveSection] = useState(null);

  const consejos = [
    {
      id: 'matricula',
      title: 'Consejos para la Matrícula',
      icon: <School className="w-6 h-6 text-blue-500" />,
      items: [
        'Lee cuidadosamente los requisitos de matrícula.',
        'Prepara toda la documentación necesaria con anticipación.',
        'Mantente atento a las fechas límite importantes.',
        'Verifica que toda la información proporcionada sea correcta y esté actualizada.',
        'Guarda una copia de todos los documentos entregados.'
      ]
    },
    {
      id: 'apoyo',
      title: 'Consejos para el apoyo al Alumno/a',
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      items: [
        'Revise ocasionalmente los cuadernos para no tener problemas de tareas no realizadas.',
        'Ayude con las tareas o deberes del alumno/a.',
        'Establezca un horario regular de estudio en casa.',
        'Proporcione un espacio tranquilo y adecuado para estudiar.',
        'Mantenga comunicación constante con su hijo/a sobre su progreso escolar.'
      ]
    },
    {
      id: 'docente',
      title: 'Consejos para con el Docente',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      items: [
        'No olvide asistir en caso sea requerido por el docente.',
        'Participe activamente en las reuniones de padres de familia.',
        'Mantenga una comunicación respetuosa y abierta con los profesores.',
        'Informe al docente sobre cualquier situación que pueda afectar el rendimiento de su hijo/a.',
        'Colabore con las actividades escolares cuando sea posible.'
      ]
    }
  ];

  const handleClick = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4 relative inline-block">
            Consejos para Padres
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 dark:bg-blue-400 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Aquí encontrarás información y consejos útiles para el apoyo a tus hijos y la armonía con la Institución Educativa.
          </p>
        </div>

        <div className="space-y-8">
          {consejos.map((consejo) => (
            <div
              key={consejo.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out
                ${activeSection === consejo.id ? 'transform scale-105 shadow-xl ring-2 ring-blue-500' : 'hover:shadow-lg hover:scale-102 cursor-pointer'}`}
            >
              <div
                className="p-6"
                onClick={() => handleClick(consejo.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {consejo.icon}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{consejo.title}</h2>
                  </div>
                  <div className="text-blue-500">
                    {activeSection === consejo.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeSection === consejo.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <ul className="space-y-3 list-disc pl-5">
                      {consejo.items.map((item, idx) => (
                        <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
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

export default ConsejosPadres;