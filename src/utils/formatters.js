// Utilidades para formatear datos

/**
 * Formatea un precio en pesos colombianos
 * @param {number|string} precio - El precio a formatear
 * @returns {string} - Precio formateado en COP
 */
export const formatearPrecio = (precio) => {
  // Si ya viene formateado, devolverlo tal como está
  if (typeof precio === 'string' && precio.includes('COP')) {
    return precio;
  }
  
  // Convertir a número si es string
  const precioNumerico = typeof precio === 'string' 
    ? parseFloat(precio.replace(/[^0-9.-]+/g, "")) 
    : precio;
  
  // Verificar que el precio sea válido
  if (isNaN(precioNumerico) || precioNumerico <= 0) {
    return '$0 COP';
  }
  
  // Formatear con separadores de miles usando formato colombiano
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(precioNumerico);
  
  return `$${precioFormateado} COP`;
};

/**
 * Extrae el valor numérico de un precio formateado
 * @param {string} precioFormateado - Precio con formato
 * @returns {number} - Valor numérico del precio
 */
export const extraerValorPrecio = (precioFormateado) => {
  return parseFloat(precioFormateado.replace(/[^0-9.-]+/g, ""));
};

/**
 * Formatea números grandes con separadores de miles
 * @param {number} numero - Número a formatear
 * @returns {string} - Número formateado
 */
export const formatearNumero = (numero) => {
  return numero.toLocaleString('es-CO');
};



/**
 * Formatea una fecha en formato colombiano
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return 'Fecha no disponible';
  
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  
  // Verificar si la fecha es válida
  if (isNaN(fechaObj.getTime())) {
    return 'Fecha inválida';
  }
  
  return fechaObj.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};