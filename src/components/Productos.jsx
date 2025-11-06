import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import EditProductModal from './EditProductModal';
import { formatearPrecio } from '../utils/formatters';

const ProductCard = ({ producto, onEdit, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useAdmin();
  
  const { nombre, imagen, precio, categoria, descripcion, badge } = producto;

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 relative"
      >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
          {badge}
        </div>
      )}
      
      {/* Imagen con overlay */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src={imagen || 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'}
          alt={nombre}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.log('Error cargando imagen, usando fallback');
            e.target.src = 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
            setImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Categoría flotante */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700">
          {categoria}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {nombre}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {descripcion}
          </p>
        </div>

        {/* Precio */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {formatearPrecio(precio)}
          </span>
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Botones */}
        <div className="flex space-x-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Ver Producto
          </motion.button>
          
          {!isAdmin ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          ) : (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(producto)}
                className="bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-xl transition-colors duration-300"
                title="Editar producto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(producto.id)}
                className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-xl transition-colors duration-300"
                title="Eliminar producto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </motion.button>
            </div>
          )}
        </div>
      </div>
      </motion.div>
      {/* Modal de características */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo difuminado y animación */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-blue-700/60 backdrop-blur-sm animate-fadeIn"></div>
          <div className="relative z-10 max-w-md w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100"
            >
              <button
                className="absolute top-5 right-6 text-gray-400 hover:text-blue-600 text-3xl font-bold focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Cerrar"
              >
                &times;
              </button>
              <div className="flex flex-col items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg mb-4">
                  {/* Icono de vaso de leche */}
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10l-1.5 14a2 2 0 01-2 1.8h-3a2 2 0 01-2-1.8L7 4z" />
                    <rect x="9" y="8" width="6" height="6" rx="1" fill="#e0e7ff" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-blue-700 mb-2 tracking-tight">Características Nutricionales</h2>
                <span className="text-base text-gray-500 mb-2">Nuestros productos lácteos destacan por su calidad y beneficios para la salud.</span>
              </div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center gap-3 text-gray-700 text-lg">
                  <span className="bg-blue-100 text-blue-700 rounded-full p-2">
                    {/* Vaso de leche */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10l-1.5 14a2 2 0 01-2 1.8h-3a2 2 0 01-2-1.8L7 4z" />
                      <rect x="9" y="8" width="6" height="6" rx="1" fill="#e0e7ff" />
                    </svg>
                  </span>
                  Alto contenido de proteínas de alto valor biológico
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-lg">
                  <span className="bg-blue-100 text-blue-700 rounded-full p-2">
                    {/* Hueso para calcio */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 19a2 2 0 01-2-2c0-.55.22-1.05.59-1.41l8.83-8.83a2 2 0 012.83 0l1.41 1.41a2 2 0 010 2.83l-8.83 8.83A2 2 0 016 19z" />
                    </svg>
                  </span>
                  Rico en calcio
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-lg">
                  <span className="bg-blue-100 text-blue-700 rounded-full p-2">
                    {/* Pastilla/vitamina */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="8" height="8" rx="4" fill="#fde68a" />
                      <rect x="13" y="5" width="8" height="8" rx="4" fill="#bbf7d0" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 15l10-6" stroke="#a3e635" />
                    </svg>
                  </span>
                  Vitaminas esenciales
                </li>
              </ul>
              <div className="flex justify-end">
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

const Productos = () => {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [showEditModal, setShowEditModal] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const { productos, actualizarProducto, eliminarProducto, isAdmin } = useAdmin();

  const beneficios = [
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full p-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
      ),
      titulo: "Productos",
      descripcion: "Nuestros productos son de la mejor calidad y frescura",
      detalle: "Garantía de frescura"
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full p-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      ),
      titulo: "Calidad Certificada",
      descripcion: "Productos con certificación de calidad premium",
      detalle: "ISO 9001:2015"
    },
    {
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      ),
      titulo: "Compra Segura",
      descripcion: "Pago 100% seguro con garantía de satisfacción",
      detalle: "Devolución gratuita"
    }
  ];

  const filtros = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'postres', nombre: 'Postres' },
    { id: 'yogurt', nombre: 'Yogurt' },
    { id: 'queso', nombre: 'Quesos' },
    { id: 'otros', nombre: 'Otros' }
  ];

  const handleEditProduct = (producto) => {
    setProductoAEditar(producto);
    setShowEditModal(true);
  };

  const handleSaveProduct = (productoActualizado) => {
    actualizarProducto(productoActualizado);
    setShowEditModal(false);
    setProductoAEditar(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      eliminarProducto(id);
    }
  };

  const productosFiltrados = filtroActivo === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === filtroActivo);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Franja de beneficios mejorada */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-16 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir Lacteos la Florida?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprometidos con la excelencia en cada producto</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group bg-white/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/80 transition-all duration-300 border border-white/20"
              >
                <div className="flex justify-center mb-6">
                  {beneficio.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {beneficio.titulo}
                </h3>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  {beneficio.descripcion}
                </p>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  {beneficio.detalle}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de productos mejorada */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con filtros */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
              Nuestros Productos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra selecta gama de productos lácteos artesanales, elaborados con los más altos estándares de calidad
            </p>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {filtros.map((filtro) => (
              <button
                key={filtro.id}
                onClick={() => setFiltroActivo(filtro.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filtroActivo === filtro.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {filtro.nombre}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid de productos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {productosFiltrados.map((producto, index) => (
            <motion.div
              key={producto.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard
                producto={producto}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-xl mb-8 opacity-90">Contáctanos y te ayudaremos a encontrar el producto perfecto</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
          >
            Contactar Ahora
          </motion.button>
        </motion.div>
      </div>

      {/* Modal de edición */}
      {showEditModal && productoAEditar && (
        <EditProductModal
          producto={productoAEditar}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowEditModal(false);
            setProductoAEditar(null);
          }}
        />
      )}
    </div>
  );
};

export default Productos;
