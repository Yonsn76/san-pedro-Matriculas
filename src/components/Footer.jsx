import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
      <footer id="contacto" className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-3">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">Políticas</li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">Soporte</li>
            </ul>
          </div>

          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-3">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                <p>contacto@colegiosanpedro.edu</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-blue-600 dark:text-blue-400" />
                <p>+51 999 999 767</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-600 dark:text-blue-400" />
                <p>Jr. Ayancocha S/N-Cuadra 1</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-3">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/IE32004SanPedro" className="hover:scale-110 transition-transform" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform" aria-label="Instagram">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:scale-110 transition-transform" aria-label="YouTube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Colegio San Pedro. Todos los derechos reservados.
        </div>
      </footer>
    )
  }

  export default Footer
