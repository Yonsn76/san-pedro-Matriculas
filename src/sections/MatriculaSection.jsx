const MatriculaSection = () => {
    return (
      <section id="matricula" className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-4">
          <img
            src="https://images.unsplash.com/photo-1588072432836-e10032774350"
            alt="Matricula"
            className="w-full md:w-1/2 rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Consulta tu Matrícula</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Verifica si ya estás registrado en nuestra base de datos. Evita duplicados y asegura tu cupo.</p>
            <a href="#" className="text-blue-600 font-semibold underline">Haz tu consulta aquí</a>
          </div>
        </div>
      </section>
    )
  }
  
  export default MatriculaSection
  