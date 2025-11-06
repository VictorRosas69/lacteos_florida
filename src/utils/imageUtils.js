// Utilidades para manejo de imágenes

/**
 * Verifica si una URL de imagen es válida
 * @param {string} url - URL de la imagen
 * @returns {Promise<boolean>} - True si la imagen es válida
 */
export const verificarImagen = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

/**
 * Obtiene una imagen de fallback según la categoría
 * @param {string} categoria - Categoría del producto
 * @returns {string} - URL de imagen de fallback
 */
export const obtenerImagenFallback = (categoria) => {
  const imagenesFallback = {
    queso: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    yogurt: 'https://images.unsplash.com/photo-1571212515416-cd2c2c9c4e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    postres: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    otros: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  };
  
  return imagenesFallback[categoria] || imagenesFallback.otros;
};

/**
 * Valida y corrige URLs de imágenes
 * @param {string} url - URL original
 * @param {string} categoria - Categoría para fallback
 * @returns {Promise<string>} - URL válida
 */
export const validarYCorregirImagen = async (url, categoria = 'otros') => {
  if (!url) {
    return obtenerImagenFallback(categoria);
  }
  
  const esValida = await verificarImagen(url);
  return esValida ? url : obtenerImagenFallback(categoria);
};