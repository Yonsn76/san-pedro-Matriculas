const blog = [
    { title: "Cómo elegir el curso ideal", author: "Prof. Teresa", likes: 34, img: "https://source.unsplash.com/random/800x400?education" },
    { title: "Actividades extracurriculares", author: "Coordinación Académica", likes: 22, img: "https://source.unsplash.com/random/800x401?school" },
    { title: "Consejos para padres", author: "Psicóloga Escolar", likes: 18, img: "https://source.unsplash.com/random/800x402?classroom" },
  ]
  
  const Blog = () => {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Últimos Artículos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blog.map((post, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow">
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-600">{post.title}</h3>
                  <p className="text-sm text-gray-500">Por {post.author}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">👍 {post.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Blog
  