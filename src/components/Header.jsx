import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [textVisible, setTextVisible] = useState(0);
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Si estamos scrolleando hacia abajo y el header es visible
      if (currentScrollY > lastScrollY && isVisible) {
        setIsVisible(false);
      }
      // Si estamos scrolleando hacia arriba y el header está oculto
      else if (currentScrollY < lastScrollY && !isVisible) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isVisible]);

  useEffect(() => {
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

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const fullText = "Escuela San Pedro";
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

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path.startsWith("#")) {
      navigate("/"); // Primero navega a la página principal
      setTimeout(() => {
        const sectionId = path.slice(1);
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Espera un poco para que el DOM cargue la sección
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { name: "Inicio", path: "#inicio" },
    { name: "Nosotros", path: "#nosotros" },
    { name: "Matrícula", path: "/matricula" },
    { name: "Consultas", path: "#consulta" },
    { name: "Artículos", path: "#articulos" },
    { name: "Contacto", path: "#contacto" },
  ];

  const isDarkMode = theme === 'dark';

  return (
    <header className={`bg-white ${isDarkMode ? 'dark:bg-gray-900' : ''} shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full px-4 py-3 flex items-center justify-between h-16">
        {/* Contenedor izquierdo (Logo y texto) */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/escudo.png"
              alt="Escudo Colegio San Pedro"
              className={`h-10 md:h-14 w-auto logo-image ${isDarkMode ? 'dark-logo' : ''}`}
            />
            <span className={`text-3xl md:text-4xl font-extrabold ${isDarkMode ? 'text-white' : 'text-blue-600'} cursive-text leading-none`}>
              {textVisible >= 0 ? "Escuela San Pedro".substring(0, Math.min(textVisible, 17)) : ""}
            </span>
          </Link>
        </div>

        {/* Contenedor derecho (Menú de navegación) */}
        <div className="hidden md:flex items-center space-x-4">
          <nav className={`${isDarkMode ? 'text-gray-100' : 'text-gray-700'} flex space-x-6`}>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="hover:text-blue-500 font-bold"
              >
                {item.name}
              </button>
            ))}
          </nav>
          <ThemeToggle />
        </div>
       
        {/* Botón de menú móvil */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setOpen(!open)} className={isDarkMode ? 'text-white' : 'text-gray-800'}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ThemeToggle />
        </div>
      </div>
      {open && (
        <div className={`md:hidden ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-700'} px-4 py-2 space-y-2`}>
          {navItems.map(item => (
            <Link to={item.path} key={item.name} className="block hover:text-blue-500 font-bold">
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;