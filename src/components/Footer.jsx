import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      {/* Footer Principal */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800 text-white relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-stone-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative">
          {/* Header del Footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img src="./Logo.jpg" alt="Lácteos La Florida" className="h-14 w-auto rounded-xl shadow-lg" />
              <div>
                <h2 className="text-2xl font-bold font-playfair gradient-text">Lácteos La Florida</h2>
                <p className="text-stone-200 text-sm">Tradición y calidad desde 1998</p>
              </div>
            </div>
            <p className="text-lg text-stone-100 max-w-xl mx-auto">
              Conecta con nosotros y mantente al día con nuestros productos frescos
            </p>
          </motion.div>

          {/* Grid principal reorganizado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Columna 1: Redes Sociales y QR */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white font-playfair mb-4 flex items-center">
                <span className="mr-2">🌐</span>
                Síguenos
              </h3>
              
              {/* Iconos de Redes Sociales */}
              <div className="grid grid-cols-2 gap-3">
                
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.instagram.com/lacteoslaflorida?igsh=ODQxNjNwNm5kZGJs " 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-3 flex items-center space-x-2 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-sm font-medium">Instagram</span>
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/573234692505" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-3 flex items-center space-x-2 hover:from-green-500 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </motion.a>
              </div>
              
              {/* QR Code Menu */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h4 className="text-lg font-bold mb-2 text-white flex items-center">
                  <span className="mr-2">📱</span>
                  Menú Digital
                </h4>
                <p className="text-blue-200 text-sm mb-3">Escanea para ver nuestro catálogo</p>
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <img 
                      src="/menu-qr.png" 
                      alt="Código QR del Menú - Lácteos la Florida"
                      className="w-16 h-16"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200">
                      Apunta tu cámara
                    </p>
                    <p className="text-xs text-blue-300 font-medium">
                      Acceso rápido
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Columna 2: Contacto */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white font-playfair mb-4 flex items-center">
                <span className="mr-2">📞</span>
                Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">WhatsApp</p>
                    <a href="https://wa.me/573234692505" className="text-green-300 hover:text-green-200 transition-colors text-sm">
                      3234692505
                    </a>
                  </div>
                </div>

                

                <div className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <a href="mailto:lacsuroccidenteltda@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors text-xs break-all">
                      lacsuroccidenteltda@gmail.com
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white font-medium text-sm">Horario Sede la Florida</p>
                  </div>
                  <p className="text-blue-200 text-xs">Lunes a Viernes: 8:00am - 6:00pm</p>
                  <p className="text-blue-200 text-xs">Sábados y Domingos: 8:00am - 6:00pm</p>
                </div>

                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white font-medium text-sm">Horario Sede Barrio Maridiaz</p>
                  </div>
                  <p className="text-blue-200 text-xs">Lunes a Viernes: 8:00am - 4:00pm</p>
                  <p className="text-blue-200 text-xs">Sábados: 8:00am - 4:00pm</p>
                </div>
              </div>
            </motion.div>

            {/* Columna 3: Navegación y Ubicaciones */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-white font-playfair mb-4 flex items-center">
                <span className="mr-2">🗺️</span>
                Navegación
              </h3>
              
              <nav className="space-y-2">
                {[
                  { name: 'Inicio', href: '#hero', icon: '🏠' },
                  { name: 'Nosotros', href: '#nosotros', icon: '👥' },
                  { name: 'Productos', href: '#productos', icon: '🥛' },
                  { name: 'Contacto', href: '#contacto', icon: '📞' },
                  { name: 'PQRS', href: '#pqrs', icon: '📝' }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={item.href} 
                    className="flex items-center space-x-2 text-blue-200 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/20">
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <span className="mr-2">📍</span>
                  Ubicaciones
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                    <p className="text-yellow-300 font-medium text-sm">Planta Principal</p>
                    <p className="text-blue-200 text-xs">Km 23 via Circunvalar al Galeras</p>
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                    <p className="text-blue-300 font-medium text-sm">Tienda Pasto</p>
                    <p className="text-blue-200 text-xs">Calle 16A #32A-03, Barrio Maridiaz</p>
                  </div>
                </div>
              </div>

            
            </motion.div>
          </div>

          {/* Sección de políticas y enlaces legales */}
          <div className="border-t border-white/20 pt-8 mt-8">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="#privacidad" className="text-blue-200 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#terminos" className="text-blue-200 hover:text-white text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#cookies" className="text-blue-200 hover:text-white text-sm transition-colors">
                Política de Cookies
              </a>
              <a href="#datos" className="text-blue-200 hover:text-white text-sm transition-colors">
                Manejo de Datos
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-blue-200 text-sm">
                  © 2025 Lácteos La Florida. Todos los derechos reservados.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-blue-300 text-sm">Desarrollado con</span>
                <span className="text-red-400 animate-pulse">❤️</span>
                <span className="text-blue-300 text-sm">para la comunidad</span>
              </div>
            </div>
            
            <div className="text-center mt-4 pt-4 border-t border-white/10">
              <p className="text-blue-300 text-sm italic">
                "Calidad y frescura desde nuestra granja hasta tu mesa"
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/573234692505?text=Hola%2C%20necesito%20mayor%20información"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center space-x-2 animate-pulse hover:animate-none"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span className="hidden lg:block font-medium">Realiza tu pedido</span>
        </a>
      </div>
    </>
  );
};

export default Footer;
