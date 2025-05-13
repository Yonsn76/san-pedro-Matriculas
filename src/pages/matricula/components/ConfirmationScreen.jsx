import React, { useEffect } from 'react';
import { MATRICULA_TYPES } from '../utils/constants';
import { RefreshCw, Home, MessageSquare } from 'lucide-react';
import TargetaConfirmacion from './TargetaConfirmacion';
import confetti from 'canvas-confetti';

const ConfirmationScreen = ({ tipoMatricula, solicitudId, dniEstudiante, dniApoderado, onReset }) => {
  
  // Lanzar confeti cuando se muestra la pantalla de confirmación
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };
    
    // Función para crear confeti
    const createConfetti = () => {
      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
        colors: ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
        zIndex: 1000,
      });
    };
    
    // Lanzar confeti cada 250ms
    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }
      createConfetti();
    }, 250);
    
    // Lanzar confeti inicial
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      zIndex: 1000,
    });
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="py-12 flex flex-col items-center justify-center">
      {/* Tarjeta de confirmación */}
      <TargetaConfirmacion 
        tipoMatricula={tipoMatricula}
        solicitudId={solicitudId}
        dniEstudiante={dniEstudiante}
        dniApoderado={dniApoderado}
      />
      
      {/* Mensaje informativo */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-xl text-center">
        <p className="text-gray-700 mb-2">
          <strong>Nos estaremos comunicando con usted</strong> o en caso contrario puede usar el asistente virtual para consultar el estado de su solicitud ingresando el DNI de su hijo y tipo de solicitud.
        </p>
        <div className="flex items-center justify-center mt-2 text-blue-600">
          <MessageSquare size={18} className="mr-1" />
          <span className="font-medium">Asistente Virtual disponible 24/7</span>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          <span>Nueva solicitud</span>
        </button>
        
        <a
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Home size={18} />
          <span>Ir al inicio</span>
        </a>
      </div>
    </div>
  );
};

export default ConfirmationScreen;

