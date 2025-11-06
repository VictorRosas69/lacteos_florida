import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { usePQRS } from '../hooks/usePQRS';
import { useProductos } from '../hooks/useProductos';
import { useInventarioForzado as useInventario } from '../hooks/useInventarioForzado';
import { formatearPrecio, formatearFecha } from '../utils/formatters';

const AdminDashboard = () => {
    const { logout, toggleDashboard } = useAdmin();
    const { pqrsData, updatePQRSStatus, getStats, loading: pqrsLoading } = usePQRS();
    
    // Debug: Verificar datos PQRS
    console.log('🔍 AdminDashboard - PQRS Data:', pqrsData);
    console.log('🔍 AdminDashboard - Loading:', pqrsLoading);
    console.log('🔍 AdminDashboard - Stats:', getStats());
    
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

    const {
        inventario,
        loading: loadingInventario,
        getStats: getInventarioStats,
        updateInventario,
        deleteInventario,
        error: inventarioError
    } = useInventario();

    // Debug: Verificar datos del inventario
    console.log('🔍 AdminDashboard - Inventario Data:', inventario);
    console.log('🔍 AdminDashboard - Loading Inventario:', loadingInventario);
    console.log('🔍 AdminDashboard - Inventario Error:', inventarioError);

    // Estados para el inventario
    const [activeTab, setActiveTab] = useState('pqrs');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingInventario, setEditingInventario] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [stockItem, setStockItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
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
    const inventarioStats = getInventarioStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
            {/* Header Profesional */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        {/* Logo y Título */}
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

                        {/* Botones de Acción */}
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
                </div>
                
                {/* Barra de Navegación Integrada */}
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
                                                <div className="text-2xl font-bold text-white">{inventarioStats.total}</div>
                                                <div className="text-xs text-blue-200">Total Productos</div>
                                            </div>
                                            <div className="w-px h-8 bg-white/20"></div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-300">{inventarioStats.disponibles}</div>
                                                <div className="text-xs text-blue-200">Disponibles</div>
                                            </div>
                                            <div className="w-px h-8 bg-white/20"></div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-yellow-300">{inventarioStats.destacados}</div>
                                                <div className="text-xs text-blue-200">Destacados</div>
                                            </div>
                                            <div className="w-px h-8 bg-white/20"></div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-red-300">{inventarioStats.stockBajo}</div>
                                                <div className="text-xs text-blue-200">Stock Bajo</div>
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
                    {/* Sección PQRS */}
                    {activeTab === 'pqrs' && (
                        <>
                            {/* Estadísticas PQRS Profesionales */}
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
                                            <p className="text-xs text-gray-500 mt-1">Solicitudes registradas</p>
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
                                            <p className="text-xs text-gray-500 mt-1">Requieren atención</p>
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
                                            <p className="text-xs text-gray-500 mt-1">Casos en gestión</p>
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
                                            <p className="text-xs text-gray-500 mt-1">Casos completados</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Tabla de PQRS Profesional */}
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
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {activeTab === 'pqrs' ? `${pqrsData.length} Registros` : `${inventario.length} Productos`}
                                                    </span>
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
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                                                                className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
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
                                            <div className="p-12 text-center">
                                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay solicitudes PQRS</h3>
                                                <p className="text-gray-500 max-w-sm mx-auto">
                                                    Cuando los clientes envíen solicitudes, aparecerán aquí para su gestión.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Sección Inventario */}
                    {activeTab === 'inventario' && (
                        <>
                            {/* Estadísticas de Inventario Profesionales */}
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-gray-900">{inventarioStats.total}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Productos</h3>
                                            <p className="text-xs text-gray-500 mt-1">Productos en catálogo</p>
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
                                                <div className="text-3xl font-bold text-gray-900">{inventarioStats.disponibles}</div>
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
                                                <div className="text-3xl font-bold text-gray-900">{inventarioStats.destacados}</div>
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
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-full -mr-10 -mt-10"></div>
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-3 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-gray-900">{inventarioStats.stockBajo}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Stock Bajo</h3>
                                            <p className="text-xs text-gray-500 mt-1">Requieren reposición</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Panel de Inventario Profesional */}
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                                <div className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 px-8 py-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-3 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">Gestión de Inventario</h3>
                                                <p className="text-gray-600 mt-1">Administración completa del catálogo de productos</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowAddProduct(true)}
                                            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>Agregar Producto</span>
                                        </motion.button>
                                    </div>
                                </div>
                                
                                {loadingInventario ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        <p className="mt-2 text-gray-500">Cargando inventario...</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Producto
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Stock
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Precio Ref.
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Estado
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Ubicación
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {inventario.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-12 w-12">
                                                                    {(() => {
                                                                        const categoria = item.productos?.categoria?.toLowerCase() || '';
                                                                        const nombre = item.productos?.nombre?.toLowerCase() || '';
                                                                        
                                                                        // Determinar el icono y color basado en el producto
                                                                        let iconColor = 'from-blue-100 to-blue-200';
                                                                        let textColor = 'text-blue-600';
                                                                        let icon = null;
                                                                        
                                                                        if (categoria.includes('queso') || nombre.includes('queso')) {
                                                                            iconColor = 'from-amber-100 via-yellow-100 to-orange-100';
                                                                            textColor = 'text-amber-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M12 2L2 7v10c0 5.55 3.84 7.74 9 9 5.16-1.26 9-3.45 9-9V7l-10-5z"/>
                                                                                    <circle cx="7" cy="10" r="1"/>
                                                                                    <circle cx="17" cy="10" r="1"/>
                                                                                    <circle cx="12" cy="8" r="1"/>
                                                                                    <circle cx="9" cy="14" r="1"/>
                                                                                    <circle cx="15" cy="14" r="1"/>
                                                                                    <circle cx="12" cy="16" r="1"/>
                                                                                    <circle cx="7" cy="16" r="0.8"/>
                                                                                    <circle cx="17" cy="16" r="0.8"/>
                                                                                </svg>
                                                                            );
                                                                        } else if (nombre.includes('mantequilla')) {
                                                                            iconColor = 'from-yellow-200 via-yellow-100 to-amber-100';
                                                                            textColor = 'text-yellow-700';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <rect x="6" y="8" width="12" height="8" rx="2"/>
                                                                                    <path d="M8 8V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2"/>
                                                                                    <rect x="7" y="10" width="10" height="1" opacity="0.3"/>
                                                                                    <rect x="7" y="12" width="10" height="1" opacity="0.3"/>
                                                                                    <rect x="7" y="14" width="10" height="1" opacity="0.3"/>
                                                                                </svg>
                                                                            );
                                                                        } else if (categoria.includes('lácteo') || nombre.includes('leche') || nombre.includes('crema')) {
                                                                            iconColor = 'from-blue-50 via-white to-blue-100';
                                                                            textColor = 'text-blue-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M7 3v2h10V3c0-.55-.45-1-1-1H8c-.55 0-1 .45-1 1z"/>
                                                                                    <path d="M6 6v13c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H6z"/>
                                                                                    <path d="M8 8h8v2H8z" opacity="0.7"/>
                                                                                    <path d="M8 11h8v1H8z" opacity="0.5"/>
                                                                                    <path d="M8 13h8v1H8z" opacity="0.3"/>
                                                                                    <circle cx="12" cy="4" r="0.5" fill="white"/>
                                                                                </svg>
                                                                            );
                                                                        } else if (nombre.includes('yogurt')) {
                                                                            iconColor = 'from-pink-100 via-rose-50 to-pink-100';
                                                                            textColor = 'text-pink-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M8 2h8c1.1 0 2 .9 2 2v1H6V4c0-1.1.9-2 2-2z"/>
                                                                                    <path d="M6 6h12v13c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V6z"/>
                                                                                    <circle cx="10" cy="10" r="1" opacity="0.6"/>
                                                                                    <circle cx="14" cy="12" r="1" opacity="0.6"/>
                                                                                    <circle cx="12" cy="15" r="1" opacity="0.6"/>
                                                                                    <path d="M8 8h8v1H8z" opacity="0.3"/>
                                                                                </svg>
                                                                            );
                                                                        } else if (categoria.includes('bebida') || nombre.includes('kumis')) {
                                                                            iconColor = 'from-purple-100 via-indigo-50 to-purple-100';
                                                                            textColor = 'text-purple-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M7 2h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                                                                                    <path d="M6 5h12l-1 14c-.1 1-.9 2-2 2H9c-1.1 0-1.9-1-2-2L6 5z"/>
                                                                                    <circle cx="10" cy="9" r="0.8" fill="white" opacity="0.7"/>
                                                                                    <circle cx="14" cy="11" r="0.8" fill="white" opacity="0.7"/>
                                                                                    <circle cx="12" cy="13" r="0.8" fill="white" opacity="0.7"/>
                                                                                    <circle cx="9" cy="15" r="0.6" fill="white" opacity="0.5"/>
                                                                                    <circle cx="15" cy="15" r="0.6" fill="white" opacity="0.5"/>
                                                                                </svg>
                                                                            );
                                                                        } else if (nombre.includes('suero')) {
                                                                            iconColor = 'from-cyan-100 via-blue-50 to-cyan-100';
                                                                            textColor = 'text-cyan-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                                                                    <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.8"/>
                                                                                    <path d="M10 7c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" fill="white" opacity="0.6"/>
                                                                                </svg>
                                                                            );
                                                                        } else {
                                                                            // Icono genérico más bonito
                                                                            iconColor = 'from-emerald-100 via-green-50 to-emerald-100';
                                                                            textColor = 'text-emerald-600';
                                                                            icon = (
                                                                                <svg className={`w-7 h-7 ${textColor}`} fill="currentColor" viewBox="0 0 24 24">
                                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                                                    <circle cx="12" cy="10" r="2" fill="white" opacity="0.7"/>
                                                                                </svg>
                                                                            );
                                                                        }
                                                                        
                                                                        return (
                                                                            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${iconColor} flex items-center justify-center border border-gray-200 shadow-sm`}>
                                                                                {icon}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {item.productos?.nombre || `Producto #${item.producto_id}`}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {item.productos?.categoria || `ID: ${item.producto_id}`}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                <span className={`font-semibold ${
                                                                    item.cantidad_disponible <= item.cantidad_minima 
                                                                        ? 'text-red-600' 
                                                                        : 'text-green-600'
                                                                }`}>
                                                                    {item.cantidad_disponible}
                                                                </span>
                                                                <span className="text-gray-500 ml-1">unidades</span>
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Mín: {item.cantidad_minima}
                                                            </div>
                                                            {item.cantidad_disponible <= item.cantidad_minima && (
                                                                <div className="text-xs text-red-600 font-medium">
                                                                    ⚠️ Stock bajo
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {item.precio_referencia ? 
                                                                formatearPrecio(item.precio_referencia) : 
                                                                <span className="text-gray-400">No definido</span>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                                item.cantidad_disponible > 0
                                                                    ? 'bg-green-100 text-green-800' 
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {item.cantidad_disponible > 0 ? 'Disponible' : 'Agotado'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item.ubicacion || 'No especificada'}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <div className="flex space-x-2">
                                                                <button 
                                                                    onClick={() => {
                                                                        setEditingInventario(item);
                                                                        setShowEditModal(true);
                                                                    }}
                                                                    className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium"
                                                                >
                                                                    Editar
                                                                </button>
                                                                <button 
                                                                    onClick={() => {
                                                                        setStockItem(item);
                                                                        setShowStockModal(true);
                                                                    }}
                                                                    className="text-green-600 hover:text-green-900 transition-colors font-medium"
                                                                >
                                                                    Stock
                                                                </button>
                                                                <button 
                                                                    onClick={() => {
                                                                        setDeleteItem(item);
                                                                        setShowDeleteModal(true);
                                                                    }}
                                                                    className="text-red-600 hover:text-red-900 transition-colors font-medium"
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {inventario.length === 0 && (
                                            <div className="p-12 text-center">
                                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos en inventario</h3>
                                                <p className="text-gray-500 max-w-sm mx-auto">
                                                    Agrega productos al catálogo para comenzar a gestionar el inventario.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Modal para eliminar */}
            <AnimatePresence>
                {showDeleteModal && deleteItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-3 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Eliminar del Inventario</h3>
                                            <p className="text-sm text-gray-500">{deleteItem.productos?.nombre || `Producto #${deleteItem.producto_id}`}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setDeleteItem(null);
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 mb-6 border border-red-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-red-800">¿Estás seguro?</h4>
                                            <p className="text-sm text-red-700">Esta acción no se puede deshacer. El producto será eliminado permanentemente del inventario.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                    <h5 className="font-medium text-gray-900 mb-2">Información del producto:</h5>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Producto:</span>
                                            <span className="font-medium">{deleteItem.productos?.nombre || `#${deleteItem.producto_id}`}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Categoría:</span>
                                            <span className="font-medium">{deleteItem.productos?.categoria || 'No definida'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Stock Actual:</span>
                                            <span className="font-medium">{deleteItem.cantidad_disponible} unidades</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Ubicación:</span>
                                            <span className="font-medium">{deleteItem.ubicacion}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Precio Ref.:</span>
                                            <span className="font-medium">{deleteItem.precio_referencia ? formatearPrecio(deleteItem.precio_referencia) : 'No definido'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-3">
                                    <button
                                        onClick={async () => {
                                            const result = await deleteInventario(deleteItem.producto_id);
                                            if (result.success) {
                                                setShowDeleteModal(false);
                                                setDeleteItem(null);
                                                // Notificación elegante de éxito
                                                const notification = document.createElement('div');
                                                notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
                                                notification.innerHTML = `
                                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                    <span>Producto eliminado del inventario</span>
                                                `;
                                                document.body.appendChild(notification);
                                                setTimeout(() => notification.remove(), 3000);
                                            } else {
                                                alert('❌ Error al eliminar: ' + result.error);
                                            }
                                        }}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                                    >
                                        Sí, Eliminar
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setDeleteItem(null);
                                        }}
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal para cambiar stock */}
            <AnimatePresence>
                {showStockModal && stockItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Actualizar Stock</h3>
                                            <p className="text-sm text-gray-500">{stockItem.productos?.nombre || `Producto #${stockItem.producto_id}`}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowStockModal(false);
                                            setStockItem(null);
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Stock Actual</p>
                                            <p className="text-3xl font-bold text-blue-600">{stockItem.cantidad_disponible}</p>
                                            <p className="text-xs text-gray-500">unidades disponibles</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-700">Stock Mínimo</p>
                                            <p className="text-lg font-semibold text-gray-600">{stockItem.cantidad_minima}</p>
                                            {stockItem.cantidad_disponible <= stockItem.cantidad_minima && (
                                                <p className="text-xs text-red-600 font-medium">⚠️ Stock bajo</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const newStock = parseInt(formData.get('nuevo_stock'));
                                    
                                    if (isNaN(newStock) || newStock < 0) {
                                        alert('Por favor ingresa un número válido mayor o igual a 0');
                                        return;
                                    }
                                    
                                    const result = await updateInventario(stockItem.producto_id, { 
                                        cantidad_disponible: newStock 
                                    });
                                    
                                    if (result.success) {
                                        setShowStockModal(false);
                                        setStockItem(null);
                                        // Mostrar notificación de éxito más elegante
                                        const notification = document.createElement('div');
                                        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
                                        notification.innerHTML = `
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>Stock actualizado correctamente</span>
                                        `;
                                        document.body.appendChild(notification);
                                        setTimeout(() => notification.remove(), 3000);
                                    } else {
                                        alert('❌ Error al actualizar stock: ' + result.error);
                                    }
                                }} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nueva Cantidad
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                name="nuevo_stock"
                                                min="0"
                                                defaultValue={stockItem.cantidad_disponible}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-semibold text-center"
                                                required
                                                autoFocus
                                            />
                                            <div className="absolute right-3 top-3 text-gray-400 text-sm">
                                                unidades
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            Actualizar Stock
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowStockModal(false);
                                                setStockItem(null);
                                            }}
                                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal para editar inventario */}
            <AnimatePresence>
                {showEditModal && editingInventario && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Editar Inventario</h3>
                                            <p className="text-sm text-gray-500">{editingInventario.productos?.nombre || `Producto #${editingInventario.producto_id}`}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setEditingInventario(null);
                                        }}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const updates = {
                                        cantidad_disponible: parseInt(formData.get('cantidad_disponible')),
                                        cantidad_minima: parseInt(formData.get('cantidad_minima')),
                                        precio_referencia: parseFloat(formData.get('precio_referencia')),
                                        ubicacion: formData.get('ubicacion')
                                    };
                                    
                                    const result = await updateInventario(editingInventario.producto_id, updates);
                                    if (result.success) {
                                        setShowEditModal(false);
                                        setEditingInventario(null);
                                        // Notificación elegante de éxito
                                        const notification = document.createElement('div');
                                        notification.className = 'fixed top-4 right-4 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
                                        notification.innerHTML = `
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>Inventario actualizado correctamente</span>
                                        `;
                                        document.body.appendChild(notification);
                                        setTimeout(() => notification.remove(), 3000);
                                    } else {
                                        alert('Error al actualizar: ' + result.error);
                                    }
                                }} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad Disponible
                                        </label>
                                        <input
                                            type="number"
                                            name="cantidad_disponible"
                                            defaultValue={editingInventario.cantidad_disponible}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Cantidad Mínima
                                        </label>
                                        <input
                                            type="number"
                                            name="cantidad_minima"
                                            defaultValue={editingInventario.cantidad_minima}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Precio de Referencia
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="precio_referencia"
                                            defaultValue={editingInventario.precio_referencia}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ubicación
                                        </label>
                                        <select
                                            name="ubicacion"
                                            defaultValue={editingInventario.ubicacion}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="Bodega Pasto">Bodega Pasto</option>
                                            <option value="Bodega La Florida">Bodega La Florida</option>
                                        </select>
                                    </div>
                                    
                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                                        >
                                            Guardar Cambios
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowEditModal(false);
                                                setEditingInventario(null);
                                            }}
                                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal para agregar producto */}
            <AnimatePresence>
                {showAddProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Agregar Nuevo Producto</h3>
                                    <button
                                        onClick={() => setShowAddProduct(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <form onSubmit={handleAddProduct} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Producto</label>
                                        <input
                                            type="text"
                                            value={newProduct.nombre}
                                            onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Ej: Leche Entera 1L"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                        <textarea
                                            value={newProduct.descripcion}
                                            onChange={(e) => setNewProduct({...newProduct, descripcion: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            rows="3"
                                            placeholder="Descripción detallada del producto..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio (COP)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={newProduct.precio}
                                            onChange={(e) => setNewProduct({...newProduct, precio: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                                        <select
                                            value={newProduct.categoria}
                                            onChange={(e) => setNewProduct({...newProduct, categoria: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required
                                        >
                                            <option value="">Seleccionar categoría</option>
                                            <option value="Leches">Leches</option>
                                            <option value="Yogures">Yogures</option>
                                            <option value="Quesos">Quesos</option>
                                            <option value="Mantequillas">Mantequillas</option>
                                            <option value="Cremas">Cremas</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                                        <input
                                            type="url"
                                            value={newProduct.imagen}
                                            onChange={(e) => setNewProduct({...newProduct, imagen: e.target.value})}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-6 pt-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newProduct.disponible}
                                                onChange={(e) => setNewProduct({...newProduct, disponible: e.target.checked})}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Disponible</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={newProduct.destacado}
                                                onChange={(e) => setNewProduct({...newProduct, destacado: e.target.checked})}
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Destacado</span>
                                        </label>
                                    </div>
                                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddProduct(false)}
                                            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all shadow-lg"
                                        >
                                            Agregar Producto
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;