import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [textVisible, setTextVisible] = useState(0)
  // Usamos el contexto de tema
  const { theme } = useTheme();

  // Agregar estilos al documento
  useEffect(() => {
    // Crear elemento de estilo
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

      .cursive-text {
        font-family: 'Dancing Script', cursive;
        letter-spacing: 0.5px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
      }

      .dark .cursive-text {
        color: white;
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ffdd00, 0 0 20px #ffdd00;
      }

      .logo-image {
        transition: transform 0.3s ease, filter 0.3s ease;
      }

      .logo-image:hover {
        transform: scale(1.1);
      }

      .dark .logo-image {
        filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 5px rgba(255, 221, 0, 0.5));
      }
    `;

    // Agregar al head
    document.head.appendChild(style);

    // Limpiar al desmontar
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Efecto de escritura al cargar la página
  useEffect(() => {
    const fullText = "Colegio San Pedro";

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTextVisible(currentIndex);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/#nosotros' },
    { name: 'Matricula', path: '/matricula' },
    { name: 'Consultas', path: '/#consultas' },
    { name: 'Contacto', path: '/#contacto' }
  ]

  // Usamos el tema para aplicar clases condicionales
  const isDarkMode = theme === 'dark';

  return (
    <header className={`bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''} shadow-md sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/escudo.png"
            alt="Escudo Colegio San Pedro"
            className={`h-10 md:h-14 w-auto logo-image ${isDarkMode ? 'dark-logo' : ''}`}
          />
          <div className="flex items-center">
            <span className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-blue-600'} cursive-text leading-none`}>
              {textVisible >= 0 ? "Colegio San Pedro".substring(0, Math.min(textVisible, 17)) : ""}
            </span>
          </div>
        </Link>
        <nav className={`hidden md:flex space-x-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
          {navItems.map(item => (
            <Link to={item.path} key={item.name} className="hover:text-blue-500">{item.name}</Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className={isDarkMode ? 'text-white' : 'text-gray-800'}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-700'} px-4 py-2 space-y-2`}>
          {navItems.map(item => (
            <Link to={item.path} key={item.name} className="block hover:text-blue-500">{item.name}</Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
