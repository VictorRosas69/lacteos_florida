import { useState, useEffect } from 'react';
import { productosAPI } from '../lib/supabase';

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los productos
  const loadProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productosAPI.getAll();
      setProductos(data || []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto
  const addProducto = async (productoData) => {
    try {
      const nuevoProducto = await productosAPI.create({
        ...productoData,
        activo: true,
        created_at: new Date().toISOString()
      });
      
      setProductos(prev => [nuevoProducto, ...prev]);
      return { success: true, producto: nuevoProducto };
    } catch (err) {
      console.error('Error agregando producto:', err);
      setError('Error al agregar producto');
      return { success: false, error: err.message };
    }
  };

  // Actualizar producto
  const updateProducto = async (id, updates) => {
    try {
      const productoActualizado = await productosAPI.update(id, updates);
      
      setProductos(prev => 
        prev.map(p => p.id === id ? productoActualizado : p)
      );
      return { success: true, producto: productoActualizado };
    } catch (err) {
      console.error('Error actualizando producto:', err);
      setError('Error al actualizar producto');
      return { success: false, error: err.message };
    }
  };

  // Eliminar producto (soft delete)
  const deleteProducto = async (id) => {
    try {
      await productosAPI.delete(id);
      setProductos(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error eliminando producto:', err);
      setError('Error al eliminar producto');
      return { success: false, error: err.message };
    }
  };

  // Obtener estadísticas de productos
  const getStats = () => {
    return {
      total: productos.length,
      disponibles: productos.filter(p => p.disponible).length,
      destacados: productos.filter(p => p.destacado).length,
      categorias: new Set(productos.map(p => p.categoria)).size,
      porCategoria: productos.reduce((acc, p) => {
        acc[p.categoria] = (acc[p.categoria] || 0) + 1;
        return acc;
      }, {})
    };
  };

  // Filtrar productos
  const filterProductos = (filtros) => {
    return productos.filter(producto => {
      if (filtros.categoria && producto.categoria !== filtros.categoria) return false;
      if (filtros.disponible !== undefined && producto.disponible !== filtros.disponible) return false;
      if (filtros.destacado !== undefined && producto.destacado !== filtros.destacado) return false;
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        return producto.nombre.toLowerCase().includes(busqueda) ||
               producto.descripcion.toLowerCase().includes(busqueda);
      }
      return true;
    });
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProductos();
  }, []);

  return {
    productos,
    loading,
    error,
    loadProductos,
    addProducto,
    updateProducto,
    deleteProducto,
    getStats,
    filterProductos,
    setError
  };
};