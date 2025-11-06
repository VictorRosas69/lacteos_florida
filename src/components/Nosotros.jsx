import React from 'react';
import { motion } from 'framer-motion';

const Nosotros = () => {
  const stats = [
    { number: "25+", label: "Años de Experiencia", icon: "🏆" },
    { number: "10K+", label: "Clientes Satisfechos", icon: "😊" },
    { number: "100%", label: "Productos Naturales", icon: "🌱" },
    { number: "24/7", label: "Atención al Cliente", icon: "📞" }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagen - Lado Izquierdo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
            <div className="relative card-premium p-8">
              <img 
                src="https://i.imgur.com/QWhhFUv.jpeg" 
                alt="Lácteos La Florida - Nuestra Historia" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🥛</span>
                </div>
              </div>
              
              {/* Badge flotante */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
              >
                ✨ Tradición Familiar
              </motion.div>
            </div>
          </motion.div>

          {/* Contenido - Lado Derecho */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Título */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4"
              >
                <span className="text-blue-600 font-semibold text-sm">🏢 Nuestra Historia</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight font-playfair">
                Sobre{" "}
                <span className="gradient-text">Lácteos La Florida</span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>

            {/* Párrafos de Presentación */}
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-slate-700 leading-relaxed font-light"
              >
                Somos una empresa familiar con más de <strong className="text-blue-600">25 años de experiencia</strong> en el mercado lácteo, 
                dedicada a ofrecer productos artesanales de la más alta calidad. 
                Nuestra pasión por la excelencia nos ha posicionado como líderes 
                en la región.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 leading-relaxed"
              >
                Trabajamos día a día para superar las expectativas de nuestros 
                clientes, innovando constantemente y manteniendo los más altos 
                estándares de calidad en cada producto que elaboramos con amor y dedicación.
              </motion.p>
            </div>

            {/* Lista de Puntos Clave */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Lo que nos hace únicos:</h3>
              <div className="grid gap-4">
                {[
                  { icon: "🏆", title: "Tradición Familiar", desc: "Recetas transmitidas de generación en generación" },
                  { icon: "🌟", title: "Calidad Premium", desc: "Productos elaborados con los mejores ingredientes" },
                  { icon: "❤️", title: "Compromiso Total", desc: "Dedicación completa a la satisfacción del cliente" },
                  { icon: "🌱", title: "100% Natural", desc: "Sin conservantes artificiales ni aditivos químicos" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 group p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Estadísticas */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="card-premium p-6 group-hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Nosotros;
