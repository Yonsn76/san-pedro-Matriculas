const Footer = () => {
    return (
      <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-4">
          <div>
            <h4 className="text-blue-600 font-semibold mb-2">Enlaces Rápidos</h4>
            <ul>
              <li>Políticas</li>
              <li>Blog</li>
              <li>Soporte</li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-600 font-semibold mb-2">Síguenos</h4>
            <p>Facebook • Instagram • YouTube</p>
          </div>
          <div>
            <h4 className="text-blue-600 font-semibold mb-2">Contacto Legal</h4>
            <p>contacto@colegiosanpedro.edu</p>
          </div>
          <div>
            <h4 className="text-blue-600 font-semibold mb-2">Suscríbete</h4>
            <input type="email" placeholder="Tu correo" className="w-full p-2 rounded-md mb-2" />
            <button className="w-full bg-blue-600 text-white py-2 rounded-md">Suscribirse</button>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Colegio San Pedro. Todos los derechos reservados.
        </div>
      </footer>
    )
  }
  
  export default Footer
  