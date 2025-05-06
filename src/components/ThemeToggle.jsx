import { Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ?
        <Sun className="text-yellow-400 hover:text-yellow-500" size={20} /> :
        <Moon className="text-gray-700 dark:text-gray-300 hover:text-blue-500" size={20} />
      }
    </button>
  )
}

export default ThemeToggle
