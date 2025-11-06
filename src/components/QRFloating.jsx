import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QRFloating = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 left-6 z-30">
      {/* Botón principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-yellow-600 to-green-600 hover:from-yellow-700 hover:to-green-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        title="Ver Menú Digital"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        <span className="hidden lg:block text-sm font-medium">QR</span>
      </motion.button>

      {/* Modal del QR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
              className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl p-5 border border-blue-200 z-50 w-64"
            >
              <div className="text-center">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    <span className="mr-2">📱</span>
                    Menú Digital
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">Escanea para ver nuestros productos</p>
                
                {/* QR Code */}
                <div className="bg-gradient-to-br from-stone-50 to-yellow-50 p-4 rounded-xl border-2 border-stone-200 mb-4">
                  <img 
                    src="/menu-qr.png" 
                    alt="Código QR del Menú - Lácteos la Florida"
                    className="w-28 h-28 mx-auto"
                  />
                </div>
                
                <p className="text-xs text-slate-500 mb-3">
                  Apunta tu cámara al código QR
                </p>
                
                {/* Action Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-gradient-to-r from-yellow-600 to-green-600 hover:from-yellow-700 hover:to-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRFloating;