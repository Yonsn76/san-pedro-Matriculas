import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Palette, Globe, Bike, Waves, Music } from 'lucide-react';

function CursosVacacionales() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const cursos = [
    {
      id: 'matematicas',
      title: 'Matemáticas Intensivo',
      icon: <Calculator className="w-8 h-8 text-blue-500" />,
      description: 'Refuerza los conceptos matemáticos fundamentales a través de ejercicios prácticos y dinámicos.',
      duration: '4 semanas',
      age: '7-12 años',
      schedule: 'Lunes y miércoles, 9:00 - 11:00 AM'
    },
    {
      id: 'arte',
      title: 'Arte y Creatividad',
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      description: 'Desarrolla habilidades artísticas y creativas mediante diversas técnicas y materiales.',
      duration: '6 semanas',
      age: '5-15 años',
      schedule: 'Martes y jueves, 10:00 AM - 12:00 PM'
    },
    {
      id: 'ingles',
      title: 'Inglés Conversacional',
      icon: <Globe className="w-8 h-8 text-green-500" />,
      description: 'Practica y mejora tus habilidades de comunicación en inglés a través de actividades interactivas.',
      duration: '8 semanas',
      age: '8-16 años',
      schedule: 'Lunes, miércoles y viernes, 2:00 - 3:30 PM'
    },
    {
      id: 'bicicletas',
      title: 'Manejo de Bicicletas',
      icon: <Bike className="w-8 h-8 text-red-500" />,
      description: 'Aprende técnicas de manejo seguro de bicicletas y disfruta de paseos guiados.',
      duration: '3 semanas',
      age: '6-12 años',
      schedule: 'Sábados, 9:00 - 11:00 AM'
    },
    {
      id: 'natacion',
      title: 'Natación',
      icon: <Waves className="w-8 h-8 text-cyan-500" />,
      description: 'Aprende a nadar o perfecciona tu técnica con instructores certificados.',
      duration: '6 semanas',
      age: '5-15 años',
      schedule: 'Martes y jueves, 3:00 - 4:30 PM'
    },
    {
      id: 'musica',
      title: 'Música',
      icon: <Music className="w-8 h-8 text-yellow-500" />,
      description: 'Descubre el mundo de la música a través de instrumentos, canto y teoría musical básica.',
      duration: '8 semanas',
      age: '7-16 años',
      schedule: 'Miércoles y viernes, 4:00 - 5:30 PM'
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Cursos Vacacionales
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre nuestra variedad de cursos vacacionales diseñados para complementar el aprendizaje de tus hijos de manera divertida y educativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300
                ${selectedCourse === curso.id
                  ? 'ring-2 ring-blue-500 transform scale-105 shadow-xl'
                  : 'hover:shadow-lg hover:scale-102 cursor-pointer'}`}
              onClick={() => setSelectedCourse(selectedCourse === curso.id ? null : curso.id)}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {curso.icon}
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{curso.title}</h2>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{curso.description}</p>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  selectedCourse === curso.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Duración</p>
                        <p className="font-medium text-gray-800 dark:text-white">{curso.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Edad</p>
                        <p className="font-medium text-gray-800 dark:text-white">{curso.age}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500 dark:text-gray-400">Horario</p>
                        <p className="font-medium text-gray-800 dark:text-white">{curso.schedule}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-blue-500 font-medium text-sm">
                  {selectedCourse === curso.id ? 'Haz clic para cerrar' : 'Haz clic para más detalles'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            ¿Interesado en alguno de nuestros cursos? Contáctanos para más información sobre fechas de inicio y proceso de inscripción.
          </p>
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

export default CursosVacacionales;