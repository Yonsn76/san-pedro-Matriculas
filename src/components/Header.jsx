import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import './Header.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [textVisible, setTextVisible] = useState(0)

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

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/escudo.png"
            alt="Escudo Colegio San Pedro"
            className="h-10 md:h-14 w-auto logo-image"
          />
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-white cursive-text leading-none">
              {textVisible >= 0 ? "Colegio San Pedro".substring(0, Math.min(textVisible, 17)) : ""}
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-100">
          {navItems.map(item => (
            <Link to={item.path} key={item.name} className="hover:text-blue-500">{item.name}</Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-2 space-y-2">
          {navItems.map(item => (
            <Link to={item.path} key={item.name} className="block text-gray-700 dark:text-gray-100">{item.name}</Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
