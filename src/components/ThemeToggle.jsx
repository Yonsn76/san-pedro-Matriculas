import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
    </button>
  )
}

export default ThemeToggle
