/**
 * Formatea una marca de tiempo en un formato legible
 * @param {Date} timestamp - Marca de tiempo a formatear
 * @returns {string} Marca de tiempo formateada
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) return '';
  
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  // Si es hace menos de un minuto
  if (diffMin < 1) {
    return 'Ahora';
  }
  
  // Si es hace menos de una hora
  if (diffHour < 1) {
    return `Hace ${diffMin} min`;
  }
  
  // Si es hoy
  if (diffDay < 1) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  // Si es ayer
  if (diffDay === 1) {
    return `Ayer ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Si es esta semana
  if (diffDay < 7) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return `${days[date.getDay()]} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  // Si es este año
  const sameYear = date.getFullYear() === now.getFullYear();
  if (sameYear) {
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  }
  
  // Si es otro año
  return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });
};
