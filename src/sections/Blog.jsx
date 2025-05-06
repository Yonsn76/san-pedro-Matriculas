const blog = [
    { title: "Cómo elegir el curso ideal", author: "Prof. Teresa", likes: 34, img: "Nivelacion.jpg", link: "/nivelacion" },
    { title: "Actividades extracurriculares", author: "Coordinación Académica", likes: 22, img: "Vacaciones.jpg", link: "/cursos-vacacionales" },
    { title: "Consejos para padres", author: "Psicóloga Escolar", likes: 18, img: "Padres.jpg", link: "/consejos-padres" },
  ]

  const Blog = () => {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Últimos Artículos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blog.map((post, idx) => (
              <div
                key={idx}
                className={`bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow cursor-pointer
                  transition-all duration-300 ease-in-out transform
                  ${post.title === "Consejos para padres"
                    ? "hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    : "hover:scale-102 hover:shadow-md"}`}
                onClick={() => window.location.href = post.link}
              >
                <img
                  src={`/${post.img}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/800x400?text=${post.title.replace(/\s+/g, '+')}`;
                  }}
                />
                <div className="p-4">
                  <h3 className={`text-xl font-semibold ${post.title === "Consejos para padres" ? "text-blue-700" : "text-blue-600"}`}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">Por {post.author}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">👍 {post.likes} likes</p>
                  {post.title === "Consejos para padres" && (
                    <div className="mt-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-100">
                        Haz clic para ver más
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  export default Blog
