import { motion } from 'framer-motion';

const HeroCommercial = () => {
  const contactMethods = [

    {
      icon: "📱",
      title: "WhatsApp",
      info: "3234692505",
      action: "https://wa.me/573234692505",
      color: "from-green-600 to-green-700"
    },
    {
      icon: "✉️",
      title: "Email",
      info: "lacsuroccidenteltda@gmail.com",
      action: "mailto:lacsuroccidenteltda@gmail.com",
      color: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 via-stone-700 to-stone-800">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2065&q=80)'
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-stone-700/60 to-stone-800/80" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [Math.random() * 100, Math.random() * 100 - 200],
              x: [Math.random() * 50, Math.random() * 50],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '110%',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 glass-effect rounded-full px-6 py-3 mb-8"
            >
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm tracking-wide">
                💼 CONTÁCTANOS
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight font-playfair"
            >
              <span className="block">Estamos aquí</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-400 bg-clip-text text-transparent">
                para ti
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-2xl text-stone-100 font-light mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Conecta con nosotros a través de cualquiera de nuestros canales de comunicación.
              Estamos listos para atenderte y resolver todas tus dudas.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mb-10"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-stone-200 text-sm">Atención disponible</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white mb-1">&lt;2h</div>
                <div className="text-stone-200 text-sm">Tiempo de respuesta</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group block p-6 card-premium hover:shadow-2xl transition-all duration-300 border-l-4 border-transparent hover:border-gradient-to-b ${method.color}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-slate-600 font-medium">{method.info}</p>
                    <p className="text-sm text-slate-500 mt-1">Haz clic para contactar</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* QR Code Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="card-premium p-6 text-center bg-gradient-to-br from-stone-50 to-yellow-50 border-2 border-stone-200"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-r from-yellow-600 to-green-600 rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">📱 Menú Digital</h4>
                  <p className="text-slate-600 mb-4">Escanea el código QR para ver nuestro menú completo</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-gray-100">
                  <img
                    src="/menu-qr.png"
                    alt="Código QR del Menú - Lácteos la Florida"
                    className="w-32 h-32 mx-auto"
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-slate-500 mb-2">
                    Apunta tu cámara al código QR
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-yellow-600">
                    <span>📱</span>
                    <span>Acceso rápido y fácil</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="card-premium p-6 text-center"
            >
              <h4 className="text-lg font-bold text-slate-800 mb-2">🕒 Horarios de Atención en Maridiaz - Pasto</h4>
              <p className="text-slate-600 mb-1">Lunes a Viernes: 8:00 AM - 4:00 PM</p>
              <p className="text-slate-600 mb-1">Sábados: 8:00 AM - 4:00 PM</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="card-premium p-6 text-center"
            >
              <h4 className="text-lg font-bold text-slate-800 mb-2">🕒 Horarios de Atención - La Florida</h4>
              <p className="text-slate-600 mb-1">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-slate-600 mb-1">Sábados y Domingos: 8:00 AM - 6:00 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border border-white/20 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/40 rounded-full animate-ping hidden lg:block" />
      <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-white/40 rounded-full animate-ping hidden lg:block" />
    </section>
  );
};

export default HeroCommercial;
