const getHoverShadowClass = (idx) => {
  const shadows = [
    "hover:shadow-[0_4px_20px_rgba(34,197,94,2.6)]",   // Verde
    "hover:shadow-[0_4px_20px_rgba(168,85,247,2.6)]",  // Morado
    "hover:shadow-[0_4px_20px_rgba(59,130,246,2.6)]",  // Azul
  ];
  return shadows[idx % shadows.length];
};

const testimonios = [
  {
    nombre: "María G.",
    frase: "Estoy encantada con la educación y el trato recibido. ¡Un colegio de primera!",
    imagen: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    nombre: "Juan P.",
    frase: "Mis hijos han mejorado notablemente en todas las materias. Muy recomendados.",
    imagen: "https://randomuser.me/api/portraits/men/35.jpg"
  },
  {
    nombre: "Luisa F.",
    frase: "Instalaciones modernas y excelente atención a los alumnos.",
    imagen: "https://randomuser.me/api/portraits/women/65.jpg"
  },
];

const Testimonios = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-10
        transition-transform duration-300 transform hover:scale-110"
          style={{ fontFamily: "'Dancing Script', cursive" }}>
          Testimonios de Padres
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((t, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-gray-800 p-6 rounded-xl overflow-hidden shadow-md border 
                border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform 
                hover:scale-105 cursor-pointer ${getHoverShadowClass(idx)}`}
            >
              <img
                src={t.imagen}
                alt={t.nombre}
                className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/150x150?text=${t.nombre.replace(/\s+/g, '+')}`;
                }}
              />
              <p className="text-gray-700 dark:text-gray-300 italic mb-2">"{t.frase}"</p>
              <h4 className="text-blue-600 dark:text-blue-400 font-semibold">{t.nombre}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
