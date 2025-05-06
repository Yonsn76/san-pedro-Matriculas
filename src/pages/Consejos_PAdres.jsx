import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ConsejosPadres() {
  const [activeSection, setActiveSection] = useState(null);

  const consejos = [
    {
      id: 'matricula',
      title: 'Consejos para la Matrícula',
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Consejos para Padres</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Aquí encontrarás información y consejos útiles para el apoyo a tus hijos y la armonía con la Institución Educativa.
        </p>
      </div>

      <div className="space-y-6">
        {consejos.map((consejo) => (
          <div
            key={consejo.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out
              ${activeSection === consejo.id ? 'transform scale-105 shadow-xl ring-2 ring-blue-500' : 'hover:shadow-lg cursor-pointer'}`}
          >
            <div
              className="p-6"
              onClick={() => handleClick(consejo.id)}
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{consejo.title}</h2>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeSection === consejo.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <ul className="mt-4 space-y-2 list-disc pl-5">
                  {consejo.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700 dark:text-gray-300">{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-2 text-blue-500 font-medium">
                {activeSection === consejo.id ? 'Haz clic para cerrar' : 'Haz clic para ver más'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
}

export default ConsejosPadres;