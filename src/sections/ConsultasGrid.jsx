const consultas = [
    { title: '¿Quiénes somos?', desc: 'Conoce nuestra historia y misión educativa.' },
    { title: 'Consulta de matrícula', desc: 'Revisa el estado de tu matrícula en tiempo real.' },
    { title: 'Año académico', desc: 'Información importante sobre el calendario escolar.' },
  ]
  
  const ConsultasGrid = () => {
    return (
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {consultas.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default ConsultasGrid
  