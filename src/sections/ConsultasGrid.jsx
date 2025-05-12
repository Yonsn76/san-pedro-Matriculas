const consultas = [
  {
    title: "¿Quiénes somos?",
    author: "Dirección Académica",
    img: "foto.jpg",
    link: "/quienes-somos",
    description:
      "Con más de 80 años al servicio de la educación, somos una institución que forma ciudadanos con valores, pensamiento crítico y compromiso social.",
  },
  {
    title: "Servicios Educativos",
    author: "Coordinación General",
    img: "Padres.jpg",
    link: "/servicios",
    description:
      "Ofrecemos programas académicos complementados con actividades extracurriculares, talleres de arte, deporte y tecnología.",
  },
  {
    title: "Año académico",
    author: "Secretaría Escolar",
    img: "Vacaciones.jpg",
    link: "/ano-academico",
    description:
      "Consulta nuestro calendario escolar con fechas importantes: inicio de clases, evaluaciones, vacaciones y eventos institucionales.",
  },
];

// Función auxiliar para asignar sombra por índice
const getHoverShadowClass = (idx) => {
  const shadows = [
    "hover:shadow-[0_4px_20px_rgba(34,197,94,2.8)]",   // Verde (tailwind green-500)
    "hover:shadow-[0_4px_20px_rgba(168,85,247,2.8)]",  // Morado (tailwind purple-500)
    "hover:shadow-[0_4px_20px_rgba(59,130,246,2.8)]",  // Azul (tailwind blue-500)
  ];
  return shadows[idx % shadows.length];
};

const ConsultasGrid = () => {
  return (
    <section id="nosotros" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
          Nosotros
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {consultas.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer
                transition-all duration-300 ease-in-out transform hover:scale-105
                border border-gray-200 dark:border-gray-700 ${getHoverShadowClass(idx)}`}
            >
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default.jpg"; // Reemplaza con una imagen de respaldo en tu proyecto
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">Por {item.author}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultasGrid;
