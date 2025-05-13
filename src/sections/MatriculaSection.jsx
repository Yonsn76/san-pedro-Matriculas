import { Link } from 'react-router-dom'

const MatriculaSection = () => {
  return (
    <section id="consulta" className="bg-white dark:bg-gray-800 py-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-4">
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Matricula"
          className="w-full md:w-1/2 rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-5xl font-bold text-blue-600 mb-4
          transition-transform duration-300 transform hover:scale-110"
            style={{ fontFamily: "'Dancing Script', cursive" }}>
            Consulta tu Matrícula
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Verifica si ya estás registrado en nuestra base de datos. Evita duplicados y asegura tu cupo.</p>
          <button 
            onClick={() => document.querySelector('.chatbot2-toggle-button-fullsize')?.click()} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>Haz tu consulta aquí</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default MatriculaSection
