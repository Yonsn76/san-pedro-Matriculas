import React, { useEffect, useRef, useState } from 'react';
import { MATRICULA_TYPES } from '../utils/constants';
import gsap from 'gsap';

const TargetaConfirmacion = ({ tipoMatricula = MATRICULA_TYPES.NUEVA, solicitudId, dniEstudiante, dniApoderado }) => {
  const animationContainerRef = useRef(null);
  const coverRef = useRef(null);
  const schoolShieldRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Obtener imagen de fondo según tipo de matrícula
  const getBackgroundImage = () => {
    switch(tipoMatricula) {
      case MATRICULA_TYPES.NUEVA:
        return "url(./tapa_azul.png)";
      case MATRICULA_TYPES.TRASLADO:
        return "url(./tapa_verde.png)";
      case MATRICULA_TYPES.SIGUIENTE_GRADO:
        return "url(./tapa_morado.png)";
      default:
        return "url(./tapa_azul.png)";
    }
  };

  // Obtener título según tipo de matrícula
  const getTipoMatriculaTitle = () => {
    switch(tipoMatricula) {
      case MATRICULA_TYPES.NUEVA:
        return "Alumno Nuevo";
      case MATRICULA_TYPES.TRASLADO:
        return "Alumno Traslado";
      case MATRICULA_TYPES.SIGUIENTE_GRADO:
        return "Siguiente Grado";
      default:
        return "Alumno Nuevo";
    }
  };

  useEffect(() => {
    createParticles();
    const interval = setInterval(createParticles, 10000);
    
    // Abrir el libro automáticamente después de 3 segundos
    setTimeout(openBook, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const createParticles = () => {
    if (!animationContainerRef.current) return;
    
    animationContainerRef.current.innerHTML = '';
    for (let i = 0; i < 15; i++) createParticle();
    for (let i = 0; i < 3; i++) createWave();
    for (let i = 0; i < 8; i++) createStar();
  };

  const createParticle = () => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 5 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    animationContainerRef.current.appendChild(particle);
    
    gsap.to(particle, { opacity: 0.8, duration: 0.5, delay, yoyo: true, repeat: -1, ease: "power1.inOut" });
    gsap.to(particle, {
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  };

  const createWave = () => {
    const wave = document.createElement('div');
    wave.classList.add('wave');
    const x = 30 + Math.random() * 40;
    const y = 30 + Math.random() * 40;
    const delay = Math.random() * 3;
    
    wave.style.left = `${x}%`;
    wave.style.top = `${y}%`;
    
    animationContainerRef.current.appendChild(wave);
    
    gsap.to(wave, {
      width: "150px", height: "150px", opacity: 0, scale: 1.5,
      duration: 2, delay, repeat: -1, ease: "power1.out", transformOrigin: "center"
    });
  };

  const createStar = () => {
    const star = document.createElement('div');
    star.classList.add('star');
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    
    animationContainerRef.current.appendChild(star);
    
    gsap.to(star, {
      opacity: 0.9, scale: 1.2, duration: 0.8, delay,
      yoyo: true, repeat: -1, ease: "power1.inOut"
    });
  };

  const openBook = () => {
    if (coverRef.current) {
      coverRef.current.classList.add('rotate-y-120');
    }
    if (schoolShieldRef.current) {
      schoolShieldRef.current.classList.remove('hidden');
    }
    setIsOpen(true);
  };

  const closeBook = () => {
    if (coverRef.current) {
      coverRef.current.classList.remove('rotate-y-120');
    }
    if (schoolShieldRef.current) {
      schoolShieldRef.current.classList.add('hidden');
    }
    setIsOpen(false);
  };

  return (
    <>
      <style jsx>{`
        .rotate-y-120 { transform: rotateY(-120deg); }
        .book-cover {
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        .preserve-3d { transform-style: preserve-3d; }
        .book-container:hover .book-cover { transform: rotateY(-120deg); }

        .text-shadow { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); }
        .gradient-text {
          background: linear-gradient(45deg, #1076c9, #42a5f5);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, white, rgba(255, 255, 255, 0));
          pointer-events: none;
          opacity: 0;
        }

        .wave {
          position: absolute;
          border: 2px solid rgba(66, 165, 245, 0.5);
          border-radius: 50%;
          transform: scale(0);
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 15px;
          height: 15px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231076c9'%3E%3Cpath d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'/%3E%3C/svg%3E");
          background-size: contain;
          opacity: 0;
          pointer-events: none;
        }

        .school-badge {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(16,118,201,0.9) 0%, rgba(25,25,112,0.9) 100%);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 2px solid rgba(255,255,255,0.4);
        }

        .school-shield {
          width: 140px;
          height: 140px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.5));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div 
        className="book-container relative w-[400px] h-[500px] flex items-center justify-center"
        onMouseEnter={() => !isOpen && openBook()}
        onMouseLeave={() => setTimeout(() => !document.querySelector('.book-container:hover') && closeBook(), 300)}
      >
        <div className="relative w-[350px] h-[450px] rounded-[10px] bg-[#effffe] shadow-lg preserve-3d flex items-center justify-center text-black text-center" style={{ perspective: "2000px" }}>
          <div 
            ref={coverRef}
            className="book-cover absolute top-0 w-full h-full bg-cover rounded-[10px] flex flex-col items-center justify-around cursor-pointer shadow-lg overflow-hidden" 
            style={{ backgroundImage: getBackgroundImage() }}
          >
            <div ref={animationContainerRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
            <div className="absolute z-10" style={{ top: "220px", width: "120px", height: "120px", backgroundColor: "rgba(144, 238, 144, 0.9)", backdropFilter: "blur(5px)" }}></div>
            <h2 className="font-playfair text-shadow text-white tracking-wide z-10 mt-8">
              Matricula <br /><span className="gradient-text text-[40px] font-bold">Registrado</span>
            </h2>
            <div className="school-badge px-8 py-6 rounded-lg z-10 flex flex-col items-center space-y-2 w-4/5 mb-6">
              <div className="flex items-center justify-center mb-1">
                <span className="font-raleway uppercase text-[22px] tracking-[0.15em] font-bold text-white">ESCUELA</span>
              </div>
              <span className="font-playfair text-[30px] tracking-wide font-bold text-white">SAN PEDRO</span>
              <div className="w-full h-[2px] bg-white/60 my-2"></div>
              <span className="font-raleway text-[18px] tracking-wider text-white">Excelencia Académica</span>
            </div>
          </div>
          <div className="content p-8 font-montserrat flex flex-col items-center justify-center">
            <h1 className="text-3xl font-playfair font-bold mb-6 gradient-text">{getTipoMatriculaTitle()}</h1>
            <img 
              ref={schoolShieldRef} 
              src="./escudo.png" 
              alt="Escudo Escolar" 
              className="school-shield mb-6 hidden"
            />
            <div className="space-y-4 text-left w-full">
              <p className="flex justify-between border-b border-gray-200 pb-2 text-lg">
                <span className="font-medium">ID:</span>
                <span className="text-[#1076c9]">{solicitudId || "23"}</span>
              </p>
              <p className="flex justify-between border-b border-gray-200 pb-2 text-lg">
                <span className="font-medium">DNI:</span>
                <span className="text-[#1076c9]">{dniEstudiante || "32456789"}</span>
              </p>
              <p className="flex justify-between border-b border-gray-200 pb-2 text-lg">
                <span className="font-medium">DNI APODERADO:</span>
                <span className="text-[#1076c9]">{dniApoderado || "65423456"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetaConfirmacion;
