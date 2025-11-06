import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, logout, toggleDashboard, showDashboard } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', to: '#hero', icon: '🏠' },
    { name: 'Nosotros', to: '#nosotros', icon: '👥' },
    { name: 'Productos', to: '#productos', icon: '🥛' },
    { name: 'Contacto', to: '#contacto', icon: '📞' },
    { name: 'PQRS', to: '#pqrs', icon: '📝' }
  ];


  const handleScroll = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full fixed top-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-slate-200/50' 
          : 'bg-white/90 backdrop-blur-xl shadow-xl'
      }`}
    >
      {/* Franja superior premium mejorada */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-gradient-to-r from-slate-700 via-slate-600 to-yellow-600 text-white relative overflow-hidden"
      >
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 via-yellow-500/20 to-green-600/30 animate-pulse"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
          </div>
          {/* Líneas decorativas */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        </div>
        
        <div className="relative flex items-center justify-center py-3 px-4">
          <div className="flex items-center space-x-4 max-w-6xl mx-auto">
            {/* Indicador animado mejorado */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="relative"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg"></div>
              <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 animate-ping opacity-30"></div>
            </motion.div>
            
            {/* Texto mejorado con mejor tipografía */}
            <div className="flex items-center space-x-2 text-sm font-medium">
              <span className="hidden sm:inline">✨</span>
              <span className="font-semibold">Productos frescos diarios</span>
              <span className="hidden md:inline text-yellow-200">•</span>
              <span className="hidden md:inline">Calidad garantizada</span>
              <span className="hidden lg:inline text-green-200">•</span>
              <span className="hidden lg:inline">Envío gratuito en pedidos +$50.000</span>
            </div>
            
            {/* Indicador de estado mejorado */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center space-x-1"
            >
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm"></div>
              <span className="hidden sm:inline text-xs text-green-200 font-medium">En línea</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Navbar principal */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo profesional mejorado */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex-shrink-0 relative group cursor-pointer"
            >
              {/* Efecto de resplandor de fondo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-slate-500/20 via-yellow-500/20 to-green-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Contenedor principal del logo */}
              <div className="relative flex items-center space-x-4 bg-gradient-to-br from-white via-slate-50 to-yellow-50/50 rounded-2xl px-5 py-3 border border-slate-200/50 shadow-lg backdrop-blur-sm group-hover:shadow-xl transition-all duration-300">
                {/* Logo con marco mejorado */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-yellow-200 rounded-xl blur-sm opacity-50"></div>
                  <img
                    src="./Logo.jpg"
                    alt="Lácteos la Florida Logo"
                    className="relative h-12 w-auto rounded-xl shadow-md border-2 border-white"
                  />
                </div>
                
                {/* Texto del logo mejorado */}
                <div className="hidden sm:block">
                  <h1 className="font-playfair font-bold text-xl bg-gradient-to-r from-slate-700 via-slate-600 to-yellow-600 bg-clip-text text-transparent">
                    Lácteos
                  </h1>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-slate-600 font-semibold">La Florida</p>
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Indicador de calidad */}
                <div className="hidden md:flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-700 font-medium">Premium</span>
                </div>
              </div>
            </motion.div>

            {/* Enlaces de navegación profesionales - Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-1 bg-slate-50/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-200/50 shadow-lg">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleScroll(item.to)}
                    className="group relative px-5 py-3 text-sm font-semibold text-slate-700 hover:text-slate-800 transition-all duration-300 rounded-xl overflow-hidden"
                  >
                    {/* Fondo animado mejorado */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 to-green-100/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                    
                    {/* Contenido del botón */}
                    <div className="relative flex items-center space-x-2">
                      <motion.span 
                        className="text-lg"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    
                    {/* Indicador inferior mejorado */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-slate-600 via-yellow-500 to-green-500 group-hover:w-4/5 transition-all duration-400 rounded-full"></div>
                    
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Botones de acción profesionales */}
            <div className="flex items-center space-x-3">
              {/* Panel de administrador mejorado */}
              {isAdmin ? (
                <div className="hidden lg:flex items-center space-x-3">
                  {/* Estado de administrador */}
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200 shadow-sm">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
                    </div>
                    <span className="text-sm text-green-700 font-semibold">Admin Activo</span>
                  </div>
                  
                  {/* Botón Dashboard */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleDashboard}
                    className="relative px-5 py-2.5 bg-gradient-to-r from-slate-600 via-slate-700 to-yellow-600 hover:from-slate-700 hover:via-slate-800 hover:to-yellow-700 text-white rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center space-x-2">
                      <span>{showDashboard ? '🌐' : '📊'}</span>
                      <span>{showDashboard ? 'Ver Sitio' : 'Dashboard'}</span>
                    </span>
                  </motion.button>
                  
                  {/* Botón Salir */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    className="relative px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 text-sm shadow-lg overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center space-x-2">
                      <span>🚪</span>
                      <span>Salir</span>
                    </span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAdminLogin(true)}
                  className="hidden lg:flex items-center px-5 py-2.5 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-900 hover:to-black text-white rounded-xl font-semibold transition-all duration-300 text-sm shadow-xl overflow-hidden group relative"
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Contenido del botón */}
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Admin</span>
                  </div>
                  
                  {/* Borde inferior animado */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              )}

              {/* Botón de menú móvil profesional */}
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-3 bg-gradient-to-br from-slate-50 via-white to-yellow-50 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-800 focus:outline-none transition-all duration-300 shadow-lg overflow-hidden group"
              >
                {/* Efecto de fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icono animado mejorado */}
                <motion.div
                  animate={{ 
                    rotate: isMobileMenuOpen ? 180 : 0,
                    scale: isMobileMenuOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )}
                </motion.div>
                
                {/* Indicador de estado */}
                <div className={`absolute top-1 right-1 w-2 h-2 rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'bg-red-400' : 'bg-green-400'
                }`}></div>
              </motion.button>
            </div>
          </div>

          {/* Menú móvil profesional mejorado */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="lg:hidden overflow-hidden"
              >
                <div className="mx-4 mb-4 p-6 bg-gradient-to-br from-white via-slate-50/80 to-yellow-50/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/50 relative overflow-hidden">
                  {/* Efectos decorativos de fondo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-100/30 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/30 to-transparent rounded-full -ml-12 -mb-12"></div>
                  
                  {/* Navegación móvil */}
                  <div className="relative space-y-1">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          handleScroll(item.to);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-4 px-5 py-4 text-left font-semibold text-slate-700 hover:text-slate-800 hover:bg-gradient-to-r hover:from-slate-50 hover:via-white hover:to-yellow-50 rounded-xl transition-all duration-300 group relative overflow-hidden"
                      >
                        {/* Fondo animado del botón */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        
                        {/* Contenido del botón */}
                        <div className="relative flex items-center space-x-4 w-full">
                          <motion.span 
                            className="text-xl"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.icon}
                          </motion.span>
                          <span className="flex-1">{item.name}</span>
                          <motion.div 
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                            whileHover={{ x: 3 }}
                          >
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Indicador lateral */}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-8 bg-gradient-to-b from-slate-600 to-yellow-600 group-hover:w-1 transition-all duration-300 rounded-r-full"></div>
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Panel de administrador móvil mejorado */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1 + 0.2 }}
                    className="relative border-t border-slate-200/50 pt-5 mt-5"
                  >
                    {/* Línea decorativa */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-slate-300 to-yellow-300 rounded-full"></div>
                    
                    {isAdmin ? (
                      <div className="space-y-4">
                        {/* Estado de administrador */}
                        <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-200 shadow-sm">
                          <div className="relative">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
                          </div>
                          <span className="text-sm text-green-700 font-semibold">Administrador Activo</span>
                        </div>
                        
                        {/* Botones de acción */}
                        <div className="grid grid-cols-2 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              toggleDashboard();
                              setIsMobileMenuOpen(false);
                            }}
                            className="relative px-4 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-xl font-semibold text-sm shadow-lg overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center space-x-1">
                              <span>{showDashboard ? '🌐' : '📊'}</span>
                              <span>{showDashboard ? 'Sitio' : 'Panel'}</span>
                            </span>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              logout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="relative px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold text-sm shadow-lg overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center space-x-1">
                              <span>🚪</span>
                              <span>Salir</span>
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setShowAdminLogin(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full relative px-5 py-4 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-800 hover:via-slate-900 hover:to-black text-white rounded-xl font-semibold transition-all duration-300 shadow-xl overflow-hidden group"
                      >
                        {/* Efecto de brillo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Contenido */}
                        <div className="relative flex items-center justify-center space-x-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span>Acceso Administrador</span>
                        </div>
                        
                        {/* Borde inferior animado */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-green-400 group-hover:w-full transition-all duration-300 rounded-full"></div>
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal de login de administrador */}
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </motion.nav>
  );
};

export default Navbar;
