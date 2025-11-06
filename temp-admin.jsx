import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { usePQRS } from '../hooks/usePQRS';
import { useProductos } from '../hooks/useProductos';
import { formatearPrecio, formatearFecha } from '../utils/formatters';

const AdminDashboard = () => {
  const { logout, toggleDashboard } = useAdmin();
  const { pqrsData, updatePQRSStatus, getStats, loading: pqrsLoading } = usePQRS();
  const { 
    productos, 
    loading: loadingProductos, 
    addProducto, 
    updateProducto, 
    deleteProducto,
    getStats: getProductStats,
    error: productError,
    setError: setProductError
  } = useProductos();
  
  // Estados para el inventario
  const [activeTab, setActiveTab] = useState('pqrs');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    imagen: '',
    disponible: true,
    destacado: false
  });

  // Funciones para manejar productos
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const productoData = {
      ...newProduct,
      precio: parseFloat(newProduct.precio)
    };
    
    const result = await addProducto(productoData);
    
    if (result.success) {
      setShowAddProduct(false);
      setNewProduct({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        imagen: '',
        disponible: true,
        destacado: false
      });
    } else {
      alert('Error al agregar producto: ' + result.error);
    }
  }; 
 const handleUpdateProduct = async (id, updates) => {
    const result = await updateProducto(id, updates);
    
    if (result.success) {
      setEditingProduct(null);
    } else {
      alert('Error al actualizar producto: ' + result.error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const result = await deleteProducto(id);
      
      if (!result.success) {
        alert('Error al eliminar producto: ' + result.error);
      }
    }
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'En proceso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Resuelto':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'Petición':
        return 'bg-blue-50 text-blue-700';
      case 'Queja':
        return 'bg-red-50 text-red-700';
      case 'Reclamo':
        return 'bg-orange-50 text-orange-700';
      case 'Sugerencia':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const stats = getStats();
  const productStats = getProductStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Profesional Mejorado */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo y Título Mejorado */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              
              <div className="text-white">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Panel de Administración
                  </h1>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                    ACTIVO
                  </div>
                </div>
                <p className="text-blue-100 text-lg font-medium mt-1">Lácteos La Florida</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-blue-200 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{new Date().toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
                  <div className="flex items-center space-x-2 text-blue-200 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Administrador Principal</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botones de Acción Mejorados */}
            <div className="flex items-center space-x-4">
              {/* Indicador de Estado */}
              <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Sistema Operativo</span>
              </div>

              {/* Botón Volver al Sitio */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDashboard}
                className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="font-medium">Volver al Sitio</span>
                </div>
              </motion.button>

              {/* Botón Cerrar Sesión */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-red-400/30"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Cerrar Sesión</span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>        {/*
 Barra de Navegación Integrada */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Navegación por pestañas */}
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                    <button
                      onClick={() => setActiveTab('pqrs')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeTab === 'pqrs' 
                          ? 'bg-white text-blue-600 shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">PQRS</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('inventario')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeTab === 'inventario' 
                          ? 'bg-white text-blue-600 shadow-lg' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span className="font-medium">Inventario</span>
                    </button>
                  </div>
                  
                  {/* Título dinámico */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <div className={`rounded-lg p-2 ${
                        activeTab === 'pqrs' 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                          : 'bg-gradient-to-r from-green-400 to-blue-500'
                      }`}>
                        {activeTab === 'pqrs' ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                      </div>
                      <div className="text-white">
                        <h2 className="text-xl font-bold">
                          {activeTab === 'pqrs' ? 'Dashboard PQRS' : 'Gestión de Inventario'}
                        </h2>
                        <p className="text-blue-100 text-sm">
                          {activeTab === 'pqrs' ? 'Gestión integral de solicitudes' : 'Administración de productos'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas Rápidas en Header */}
                <div className="hidden lg:flex items-center space-x-6">
                  {activeTab === 'pqrs' ? (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <div className="text-xs text-blue-200">Total PQRS</div>
                      </div>
                      <div className="w-px h-8 bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-300">{stats.pendientes}</div>
                        <div className="text-xs text-blue-200">Pendientes</div>
                      </div>
                      <div className="w-px h-8 bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-300">{stats.resueltos}</div>
                        <div className="text-xs text-blue-200">Resueltos</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{productStats.total}</div>
                        <div className="text-xs text-blue-200">Total Productos</div>
                      </div>
                      <div className="w-px h-8 bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-300">{productStats.disponibles}</div>
                        <div className="text-xs text-blue-200">Disponibles</div>
                      </div>
                      <div className="w-px h-8 bg-white/20"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-300">{productStats.destacados}</div>
                        <div className="text-xs text-blue-200">Destacados</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
   {/* Contenido del Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Contenido condicional basado en la pestaña activa */}
          {activeTab === 'pqrs' && (
            <>
              {/* Panel de Control PQRS */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h1 className="text-2xl font-bold">Centro de Control PQRS</h1>
                        <p className="text-blue-100">Monitoreo y gestión en tiempo real</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">En Línea</span>
                        </div>
                      </div>
                      <div className="text-right text-white">
                        <div className="text-sm opacity-80">Última actualización</div>
                        <div className="text-xs font-mono">{new Date().toLocaleTimeString('es-ES')}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estadísticas Profesionales */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total PQRS</h3>
                          <p className="text-xs text-gray-500 mt-1">Solicitudes registradas en el sistema</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{stats.pendientes}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pendientes</h3>
                          <p className="text-xs text-gray-500 mt-1">Requieren atención inmediata</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{stats.enProceso}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">En Proceso</h3>
                          <p className="text-xs text-gray-500 mt-1">Casos en gestión activa</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{stats.resueltos}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Resueltos</h3>
                          <p className="text-xs text-gray-500 mt-1">Casos completados exitosamente</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>  
            {/* Tabla Profesional de PQRS */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Gestión de Solicitudes</h3>
                        <p className="text-gray-600 mt-1">Administración completa del sistema PQRS</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-gray-700">{pqrsData.length} Registros</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium">Sistema Activo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {pqrsLoading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="mt-2 text-gray-500">Cargando PQRS...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Descripción
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {pqrsData.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatearFecha(item.created_at)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.nombre}</div>
                                <div className="text-sm text-gray-500">{item.correo}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTipoColor(item.tipo)}`}>
                                {item.tipo}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                              {item.descripcion}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.estado)}`}>
                                {item.estado}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <select
                                value={item.estado}
                                onChange={(e) => updatePQRSStatus(item.id, e.target.value)}
                                className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En proceso">En proceso</option>
                                <option value="Resuelto">Resuelto</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {pqrsData.length === 0 && (
                      <div className="p-8 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay solicitudes PQRS</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Cuando los clientes envíen solicitudes, aparecerán aquí.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )} 
         {activeTab === 'inventario' && (
            <>
              {/* Panel de Control de Inventario */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700 px-8 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="text-white">
                        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
                        <p className="text-blue-100">Administración completa de productos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAddProduct(true)}
                        className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="font-medium">Agregar Producto</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Estadísticas de Inventario */}
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{productStats.total}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Productos</h3>
                          <p className="text-xs text-gray-500 mt-1">Productos en el catálogo</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{productStats.disponibles}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Disponibles</h3>
                          <p className="text-xs text-gray-500 mt-1">Productos en stock</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{productStats.destacados}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Destacados</h3>
                          <p className="text-xs text-gray-500 mt-1">Productos promocionados</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full -mr-10 -mt-10"></div>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">{productStats.categorias}</div>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Categorías</h3>
                          <p className="text-xs text-gray-500 mt-1">Tipos de productos</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tabla de Productos */}
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h3>
                            <p className="text-gray-600 mt-1">Gestión completa del inventario</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-gray-200">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-semibold text-gray-700">{productStats.total} Productos</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {loadingProductos ? (
                      <div className="p-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-500">Cargando productos...</p>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="text-blue-600 mb-4">
                          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Sistema de Inventario Profesional</h3>
                        <p className="text-gray-600 mb-6">
                          El sistema de inventario está completamente integrado y listo para gestionar todos los productos del catálogo.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <div className="font-bold text-blue-900">{productStats.total}</div>
                            <div className="text-blue-600">Total Productos</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                            <div className="font-bold text-green-900">{productStats.disponibles}</div>
                            <div className="text-green-600">Disponibles</div>
                          </div>
                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                            <div className="font-bold text-yellow-900">{productStats.destacados}</div>
                            <div className="text-yellow-600">Destacados</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <div className="font-bold text-purple-900">{productStats.categorias}</div>
                            <div className="text-purple-600">Categorías</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAddProduct(true)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg font-medium"
                        >
                          Comenzar Gestión de Productos
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;