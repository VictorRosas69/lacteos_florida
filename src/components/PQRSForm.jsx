import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePQRS } from '../hooks/usePQRS';
import SimpleCaptcha from './SimpleCaptcha';

const PQRSForm = () => {
  const { createPQRS, loading } = usePQRS();
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo: 'Peticion',
    descripcion: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(null);
  const [resetCaptcha, setResetCaptcha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCaptchaVerify = (isValid) => {
    setCaptchaVerified(isValid);
    setCaptchaValid(isValid);
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      tipo: 'Peticion',
      descripcion: ''
    });
    setCaptchaVerified(false);
    setCaptchaValid(null);
    setResetCaptcha(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar CAPTCHA antes de enviar
    if (!captchaVerified) {
      setError('Por favor, completa la verificación de seguridad.');
      setCaptchaValid(false);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Crear PQRS en Supabase
      await createPQRS({
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono || null,
        tipo: formData.tipo,
        descripcion: formData.descripcion
      });

      // Mostrar confirmación y resetear formulario
      setShowConfirmation(true);
      resetForm();
      
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);

    } catch (err) {
      console.error('Error enviando PQRS:', err);
      setError('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pqrs" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden w-full">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card-premium p-10 w-full max-w-5xl"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6"
            >
              <span className="text-blue-600 font-semibold text-sm">📝 Sistema PQRS</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-playfair">
              Tu Voz Importa
            </h2>
            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Comparte tus peticiones, quejas, reclamos y sugerencias. Tu opinión nos ayuda a seguir 
              brindando la mejor calidad y servicio todos los días 💙
            </p>
          </div>

          {/* Mensaje de confirmación */}
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ¡Tu solicitud ha sido enviada con éxito!
              </div>
              <p className="text-sm">Recibirás una respuesta en tu correo electrónico pronto.</p>
            </motion.div>
          )}

          {/* Mensaje de error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Nombre completo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <label className="block text-slate-700 text-sm font-bold mb-3" htmlFor="nombre">
                👤 Nombre completo *
              </label>
              <div className="relative">
                <input
                  className="w-full py-4 px-6 pl-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-300"
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>

            {/* Correo electrónico */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <label className="block text-slate-700 text-sm font-bold mb-3" htmlFor="correo">
                ✉️ Correo electrónico *
              </label>
              <div className="relative">
                <input
                  className="w-full py-4 px-6 pl-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-300"
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.com"
                  required
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            {/* Teléfono */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <label className="block text-slate-700 text-sm font-bold mb-3" htmlFor="telefono">
                📞 Teléfono (opcional)
              </label>
              <div className="relative">
                <input
                  className="w-full py-4 px-6 pl-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-300"
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="3001234567"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </motion.div>

            {/* Tipo de solicitud */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <label className="block text-slate-700 text-sm font-bold mb-3" htmlFor="tipo">
                📋 Tipo de solicitud *
              </label>
              <div className="relative">
                <select
                  className="w-full py-4 px-6 pl-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-300 appearance-none"
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="Peticion">📝 Petición</option>
                  <option value="Queja">😟 Queja</option>
                  <option value="Reclamo">⚠️ Reclamo</option>
                  <option value="Sugerencia">💡 Sugerencia</option>
                </select>
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>



            {/* Descripción */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 relative group"
            >
              <label className="block text-slate-700 text-sm font-bold mb-3" htmlFor="descripcion">
                📝 Descripción detallada *
              </label>
              <div className="relative">
                <textarea
                  className="w-full py-4 px-6 pl-12 bg-white border-2 border-slate-200 rounded-2xl text-slate-700 leading-tight focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-300 resize-none"
                  id="descripcion"
                  name="descripcion"
                  rows="5"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe tu solicitud de manera detallada..."
                  required
                />
                <svg className="absolute left-4 top-6 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
            </motion.div>

            {/* CAPTCHA de Seguridad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="col-span-1 md:col-span-2"
            >
              <SimpleCaptcha
                onVerify={handleCaptchaVerify}
                isValid={captchaValid}
                onReset={resetCaptcha}
              />
            </motion.div>

            {/* Botón de envío */}
            <div className="col-span-1 md:col-span-2 flex justify-center">
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className={`${
                  isSubmitting || !captchaVerified
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
                } text-white font-bold py-4 px-8 rounded-full focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center shadow-lg transition-all duration-300`}
                type="submit"
                disabled={isSubmitting || !captchaVerified}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar solicitud
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <footer className="mt-8 text-center text-gray-500 text-sm">
            <p className="mb-2">Lácteos la Florida – Calidad y frescura desde nuestra granja hasta tu mesa.</p>
            <p className="text-xs">
              Los campos marcados con * son obligatorios. 
              Responderemos a tu solicitud en un plazo máximo de 5 días hábiles.
            </p>
          </footer>
        </motion.div>
      </div>
    </section>
  );
};

export default PQRSForm;