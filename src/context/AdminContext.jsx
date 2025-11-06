import { createContext, useContext, useState, useEffect } from 'react';
import { productosAPI, pqrsAPI, authAPI } from '../lib/supabase';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin debe ser usado dentro de AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Productos iniciales con datos de ventas simulados
  const productosIniciales = [
    {
      id: 1,
      nombre: "Quesos Campesinos 500g",
      imagen: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "9000",
      categoria: "queso",
      descripcion: "Queso fresco artesanal de sabor suave y textura cremosa, perfecto para acompañar con pan o frutas.",
      badge: "Bestseller",
      ventasUltimoMes: 245,
      ingresosTotales: 2205000
    },
    {
      id: 2,
      nombre: "Quesos Campesinos 320g",
      imagen: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "7000",
      categoria: "queso",
      descripcion: "Queso fresco artesanal de sabor suave y textura cremosa, perfecto para acompañar con pan o frutas.",
      badge: "Popular",
      ventasUltimoMes: 189,
      ingresosTotales: 1323000
    },
    {
      id: 3,
      nombre: "Queso Doble Crema 2400g",
      imagen: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "45000",
      categoria: "queso",
      descripcion: "Queso cremoso y untable con alto contenido graso, ideal para untar en tostadas o preparar salsas.",
      badge: "Premium",
      ventasUltimoMes: 67,
      ingresosTotales: 3015000
    },
    {
      id: 4,
      nombre: "Queso Doble Crema 900g",
      imagen: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "19000",
      categoria: "queso",
      descripcion: "Queso cremoso y untable con alto contenido graso, ideal para untar en tostadas o preparar salsas.",
      badge: "Gourmet",
      ventasUltimoMes: 134,
      ingresosTotales: 2546000
    },
    {
      id: 5,
      nombre: "Queso Doble Crema 400g",
      imagen: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "11000",
      categoria: "queso",
      descripcion: "Queso cremoso y untable con alto contenido graso, ideal para untar en tostadas o preparar salsas.",
      badge: "Favorito",
      ventasUltimoMes: 156,
      ingresosTotales: 1716000
    },
    {
      id: 6,
      nombre: "Yogurt Natural 1750ml",
      imagen: "https://images.unsplash.com/photo-1571212515416-cd2c2c9c4e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "12000",
      categoria: "yogurt",
      descripcion: "Yogurt casero cremoso y natural, rico en probióticos, perfecto solo o con frutas y miel.",
      badge: "Orgánico",
      ventasUltimoMes: 198,
      ingresosTotales: 2376000
    },
    {
      id: 7,
      nombre: "Yogurt Natural 1000ml",
      imagen: "https://images.unsplash.com/photo-1571212515416-cd2c2c9c4e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "8500",
      categoria: "yogurt",
      descripcion: "Yogurt casero cremoso y natural, rico en probióticos, perfecto solo o con frutas y miel.",
      badge: "Bestseller",
      ventasUltimoMes: 289,
      ingresosTotales: 2456500
    },
    {
      id: 8,
      nombre: "Yogurt Natural 150ml",
      imagen: "https://images.unsplash.com/photo-1571212515416-cd2c2c9c4e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "2000",
      categoria: "yogurt",
      descripcion: "Yogurt casero cremoso y natural, rico en probióticos, perfecto solo o con frutas y miel.",
      badge: "Individual",
      ventasUltimoMes: 423,
      ingresosTotales: 846000
    },
    {
      id: 9,
      nombre: "Quesadillas 100g",
      imagen: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "2500",
      categoria: "otros",
      descripcion: "Deliciosas quesadillas caseras crujientes, perfectas como snack o acompañamiento.",
      badge: "Crujiente",
      ventasUltimoMes: 167,
      ingresosTotales: 417500
    },
    {
      id: 10,
      nombre: "Quesadillas 50g",
      imagen: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "1000",
      categoria: "otros",
      descripcion: "Deliciosas quesadillas caseras crujientes, perfectas como snack o acompañamiento.",
      badge: "Mini",
      ventasUltimoMes: 234,
      ingresosTotales: 234000
    },
    {
      id: 11,
      nombre: "Crema de Leche 1 Litro",
      imagen: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "14000",
      categoria: "otros",
      descripcion: "Crema fresca y espesa, ideal para preparaciones culinarias, postres y café.",
      badge: "Premium",
      ventasUltimoMes: 89,
      ingresosTotales: 1246000
    },
    {
      id: 12,
      nombre: "Arequipe Casero 50g",
      imagen: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "2000",
      categoria: "postres",
      descripcion: "Dulce de leche artesanal cremoso y suave, perfecto para postres o untar.",
      badge: "Artesanal",
      ventasUltimoMes: 312,
      ingresosTotales: 624000
    },
    {
      id: 13,
      nombre: "Arequipe Casero 250g",
      imagen: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "8000",
      categoria: "postres",
      descripcion: "Dulce de leche artesanal cremoso y suave, perfecto para postres o untar.",
      badge: "Bestseller",
      ventasUltimoMes: 178,
      ingresosTotales: 1424000
    },
    {
      id: 14,
      nombre: "Dulce de Calabaza 50g",
      imagen: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "2000",
      categoria: "postres",
      descripcion: "Conserva dulce tradicional de calabaza, con textura suave y sabor casero auténtico.",
      badge: "Tradicional",
      ventasUltimoMes: 145,
      ingresosTotales: 290000
    },
    {
      id: 15,
      nombre: "Dulce de Calabaza 250g",
      imagen: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "8000",
      categoria: "postres",
      descripcion: "Conserva dulce tradicional de calabaza, con textura suave y sabor casero auténtico.",
      badge: "Casero",
      ventasUltimoMes: 98,
      ingresosTotales: 784000
    },
    {
      id: 16,
      nombre: "Torta Casera",
      imagen: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "17000",
      categoria: "postres",
      descripcion: "Torta tradicional esponjosa y húmeda, preparada con ingredientes frescos y receta familiar.",
      badge: "Especial",
      ventasUltimoMes: 67,
      ingresosTotales: 1139000
    },
    {
      id: 17,
      nombre: "Torta de Queso",
      imagen: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "22000",
      categoria: "postres",
      descripcion: "Cheesecake cremoso con base de galleta, suave textura y sabor equilibrado.",
      badge: "Gourmet",
      ventasUltimoMes: 45,
      ingresosTotales: 990000
    },
    {
      id: 18,
      nombre: "Fresas con Crema",
      imagen: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "3500",
      categoria: "postres",
      descripcion: "Fresas frescas acompañadas de crema batida, postre refrescante y natural.",
      badge: "Fresco",
      ventasUltimoMes: 223,
      ingresosTotales: 780500
    },
    {
      id: 19,
      nombre: "Postre Arcoíris",
      imagen: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      precio: "3500",
      categoria: "postres",
      descripcion: "Postre colorido en capas con diferentes sabores y texturas, visualmente atractivo y delicioso.",
      badge: "Colorido",
      ventasUltimoMes: 189,
      ingresosTotales: 661500
    }
  ];

  // Cargar productos desde Supabase
  const loadProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await productosAPI.getAll();
      
      if (data && data.length > 0) {
        // Formatear precios y asegurar que las imágenes tengan URLs válidas
        const productosFormateados = data.map(producto => {
          const imagenUrl = producto.imagen_url || producto.imagen;
          return {
            ...producto,
            precio: typeof producto.precio === 'number' 
              ? `$${producto.precio.toLocaleString('es-CO')} COP`
              : producto.precio,
            imagen: imagenUrl || 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          };
        });
        console.log('Productos cargados desde Supabase:', productosFormateados);
        setProductos(productosFormateados);
      } else {
        // Si no hay productos en la BD, usar los iniciales y subirlos
        setProductos(productosIniciales);
        await seedInitialData();
      }
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError('Error cargando productos');
      // Fallback a localStorage
      const productosGuardados = localStorage.getItem('productos');
      if (productosGuardados) {
        setProductos(JSON.parse(productosGuardados));
      } else {
        setProductos(productosIniciales);
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para poblar datos iniciales
  const seedInitialData = async () => {
    try {
      for (const producto of productosIniciales) {
        // Extraer el precio numérico y asegurar que esté en pesos colombianos
        const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ""));
        
        await productosAPI.create({
          nombre: producto.nombre,
          precio: precioNumerico, // Ya está en pesos colombianos (ej: 9000, 7000, etc.)
          categoria: producto.categoria,
          descripcion: producto.descripcion,
          imagen_url: producto.imagen,
          badge: producto.badge,
          ventas_ultimo_mes: producto.ventasUltimoMes,
          ingresos_totales: producto.ingresosTotales
        });
      }
      console.log('Datos iniciales cargados en Supabase');
    } catch (err) {
      console.error('Error cargando datos iniciales:', err);
    }
  };

  useEffect(() => {
    // Intentar cargar desde Supabase, pero usar fallback si falla
    const initializeData = async () => {
      try {
        await loadProductos();
      } catch (error) {
        console.log('Usando datos locales como fallback');
        // Usar datos del localStorage o iniciales
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
          setProductos(JSON.parse(productosGuardados));
        } else {
          setProductos(productosIniciales);
          localStorage.setItem('productos', JSON.stringify(productosIniciales));
        }
      }
    };

    initializeData();

    // Verificar si hay sesión de admin activa
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession);
        if (sessionData.isActive && sessionData.user) {
          setIsAdmin(true);
          setAdminUser(sessionData.user);
          
          // Verificar si la sesión no es muy antigua (24 horas)
          const loginTime = new Date(sessionData.loginTime);
          const now = new Date();
          const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
          
          if (hoursDiff > 24) {
            logout();
          }
        }
      } catch (error) {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Intentar primero con la función simplificada
      let result = await authAPI.loginSimple(email, password);
      
      // Si falla, intentar con la función completa
      if (!result.success) {
        result = await authAPI.login(email, password);
      }
      
      if (result.success) {
        setIsAdmin(true);
        setShowDashboard(true);
        setAdminUser(result.user);
        
        // Guardar sesión en localStorage
        const sessionData = {
          isActive: true,
          user: result.user,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Error de conexión. Inténtalo de nuevo.' 
      };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    setShowDashboard(false);
    setAdminUser(null);
    localStorage.removeItem('adminSession');
  };

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  const actualizarProducto = async (productoActualizado) => {
    try {
      setLoading(true);
      const updatedProduct = await productosAPI.update(productoActualizado.id, {
        nombre: productoActualizado.nombre,
        precio: parseFloat(productoActualizado.precio.toString().replace(/[^0-9.-]+/g, "")),
        categoria: productoActualizado.categoria,
        descripcion: productoActualizado.descripcion,
        imagen_url: productoActualizado.imagen,
        badge: productoActualizado.badge,
        ventas_ultimo_mes: productoActualizado.ventasUltimoMes,
        ingresos_totales: productoActualizado.ingresosTotales
      });
      
      const nuevosProductos = productos.map(p => 
        p.id === productoActualizado.id ? updatedProduct : p
      );
      setProductos(nuevosProductos);
    } catch (err) {
      console.error('Error actualizando producto:', err);
      setError('Error actualizando producto');
    } finally {
      setLoading(false);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      setLoading(true);
      await productosAPI.delete(id);
      const nuevosProductos = productos.filter(p => p.id !== id);
      setProductos(nuevosProductos);
    } catch (err) {
      console.error('Error eliminando producto:', err);
      setError('Error eliminando producto');
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async (nuevoProducto) => {
    try {
      setLoading(true);
      
      // Intentar crear en Supabase primero
      try {
        const productoCreado = await productosAPI.create({
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio.toString().replace(/[^0-9.-]+/g, "")),
          categoria: nuevoProducto.categoria,
          descripcion: nuevoProducto.descripcion,
          imagen_url: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          badge: nuevoProducto.badge,
          ventas_ultimo_mes: parseInt(nuevoProducto.ventasUltimoMes) || 0,
          ingresos_totales: parseInt(nuevoProducto.ingresosTotales) || 0
        });
        
        // Formatear el precio para mostrar y asegurar que la imagen esté disponible
        productoCreado.precio = `$${productoCreado.precio.toLocaleString('es-CO')} COP`;
        productoCreado.imagen = productoCreado.imagen_url || productoCreado.imagen || 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
        
        setProductos([...productos, productoCreado]);
      } catch (supabaseError) {
        console.log('Error con Supabase, usando localStorage como fallback');
        
        // Fallback: usar localStorage
        const id = Math.max(...productos.map(p => p.id), 0) + 1;
        const productoLocal = {
          ...nuevoProducto,
          id,
          precio: `$${parseFloat(nuevoProducto.precio.toString().replace(/[^0-9.-]+/g, "")).toLocaleString('es-CO')} COP`,
          imagen: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          ventasUltimoMes: parseInt(nuevoProducto.ventasUltimoMes) || 0,
          ingresosTotales: parseInt(nuevoProducto.ingresosTotales) || 0
        };
        
        const nuevosProductos = [...productos, productoLocal];
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
      }
    } catch (err) {
      console.error('Error agregando producto:', err);
      setError('Error agregando producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAdmin,
    showDashboard,
    productos,
    loading,
    error,
    adminUser,
    login,
    logout,
    toggleDashboard,
    actualizarProducto,
    eliminarProducto,
    agregarProducto,
    loadProductos
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};