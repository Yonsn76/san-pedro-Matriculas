const getHoverShadowClass = (idx) => {
  const shadows = [
    "hover:shadow-[0_4px_20px_rgba(34,197,94,2.6)]",   // Verde
    "hover:shadow-[0_4px_20px_rgba(168,85,247,2.6)]",  // Morado
    "hover:shadow-[0_4px_20px_rgba(59,130,246,2.6)]",  // Azul
  ];
  return shadows[idx % shadows.length];
};

const blog = [
  {
    title: "Cómo elegir el curso ideal",
    author: "Prof. Teresa",
    likes: 34,
    img: "Nivelacion.jpg",
    link: "/nivelacion",
    description: "Guía completa para seleccionar el programa de nivelación más adecuado para tu hijo."
  },
  {
    title: "Actividades extracurriculares",
    author: "Coordinación Académica",
    likes: 22,
    img: "Vacaciones.jpg",
    link: "/cursos-vacacionales",
    description: "Descubre los beneficios de nuestros cursos vacacionales para el desarrollo integral."
  },
  {
    title: "Consejos para padres",
    author: "Psicóloga Escolar",
    likes: 18,
    img: "Padres.jpg",
    link: "/consejos-padres",
    description: "Recomendaciones prácticas para apoyar el proceso educativo de tus hijos."
  },
];

const Blog = () => {
  return (
    <section id="articulos" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10
        transition-transform duration-300 transform hover:scale-110"
          style={{ fontFamily: "'Dancing Script', cursive" }}>
          Últimos Artículos
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blog.map((post, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md cursor-pointer
                transition-all duration-300 ease-in-out transform hover:scale-105
                border border-gray-200 dark:border-gray-700 ${getHoverShadowClass(idx)}`}
              onClick={() => window.location.href = post.link}
            >
              <div className="relative">
                <img
                  src={`/${post.img}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/800x400?text=${post.title.replace(/\s+/g, '+')}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Por {post.author}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{post.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      {post.likes} likes
                    </span>
                  </p>
                  <span className={`inline-flex items-center text-xs px-3 py-1.5 rounded-full transition-all duration-300
                    ${post.title === "Consejos para padres"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : post.title === "Cómo elegir el curso ideal"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                    }`}
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                    Haz clic para ver más
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
