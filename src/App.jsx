import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './sections/Hero'
import ConsultasGrid from './sections/ConsultasGrid'
import MatriculaSection from './sections/MatriculaSection'
import Testimonios from './sections/Testimonios'
import Blog from './sections/Blog'
import Footer from './components/Footer'
import Form from './pages/matricula'
import ConsejosPadres from './pages/Consejos_PAdres'
import NibelacionRecuperacion from './pages/Nibelacion-recuperacion'
import CursosVacacionales from './pages/Cursos-Vacacionales'

const App = () => {
  return (
    <Routes>
      <Route path="/matricula" element={<Form />} />
      <Route path="/consejos-padres" element={
        <>
          <Header />
          <ConsejosPadres />
          <Footer />
        </>
      } />
      <Route path="/nivelacion" element={
        <>
          <Header />
          <NibelacionRecuperacion />
          <Footer />
        </>
      } />
      <Route path="/cursos-vacacionales" element={
        <>
          <Header />
          <CursosVacacionales />
          <Footer />
        </>
      } />
      <Route path="/" element={
        <>
          <Header />
          <Hero />
          <ConsultasGrid />
          <MatriculaSection />
          <Testimonios />
          <Blog />
          <Footer />
        </>
      } />
    </Routes>
  )
}

export default App
