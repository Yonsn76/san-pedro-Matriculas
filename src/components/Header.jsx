import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">Colegio San Pedro</div>
        <nav className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-100">
          {['Inicio', 'Nosotros', 'Matricula', 'Consultas', 'Contacto'].map(item => (
            <a href={`#${item.toLowerCase()}`} key={item} className="hover:text-blue-500">{item}</a>
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
          {['Inicio', 'Nosotros', 'Matricula', 'Consultas', 'Contacto'].map(item => (
            <a href={`#${item.toLowerCase()}`} key={item} className="block text-gray-700 dark:text-gray-100">{item}</a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
