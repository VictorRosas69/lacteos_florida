import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SimpleCaptcha = ({ onVerify, isValid, onReset }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Generar texto CAPTCHA aleatorio
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Inicializar CAPTCHA
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  // Reset cuando se solicite
  useEffect(() => {
    if (onReset) {
      setCaptchaText(generateCaptcha());
      setUserInput('');
      setIsVerified(false);
    }
  }, [onReset]);

  // Verificar CAPTCHA
  const handleVerify = () => {
    const isCorrect = userInput.toUpperCase() === captchaText.toUpperCase();
    setIsVerified(isCorrect);
    onVerify(isCorrect);
  };

  // Regenerar CAPTCHA
  const handleRefresh = () => {
    setCaptchaText(generateCaptcha());
    setUserInput('');
    setIsVerified(false);
    onVerify(false);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Verificación de Seguridad *
      </label>
      
      {/* CAPTCHA Display */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div 
            className="bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg p-4 font-mono text-2xl font-bold text-gray-800 tracking-widest select-none"
            style={{
              background: `linear-gradient(45deg, #f3f4f6 25%, transparent 25%), 
                          linear-gradient(-45deg, #f3f4f6 25%, transparent 25%), 
                          linear-gradient(45deg, transparent 75%, #f3f4f6 75%), 
                          linear-gradient(-45deg, transparent 75%, #f3f4f6 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          >
            {captchaText}
          </div>
          
          {/* Líneas de ruido */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 200 80"
          >
            <line x1="10" y1="20" x2="190" y2="60" stroke="#6b7280" strokeWidth="1" opacity="0.3"/>
            <line x1="20" y1="60" x2="180" y2="20" stroke="#6b7280" strokeWidth="1" opacity="0.3"/>
            <line x1="50" y1="10" x2="150" y2="70" stroke="#6b7280" strokeWidth="1" opacity="0.2"/>
          </svg>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={handleRefresh}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          title="Generar nuevo código"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      </div>

      {/* Input Field */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            placeholder="Ingresa el código mostrado"
            className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
              isVerified 
                ? 'border-green-300 bg-green-50 focus:ring-green-500' 
                : isValid === false 
                ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            maxLength={6}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleVerify}
            disabled={userInput.length !== 6}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              userInput.length === 6
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Verificar
          </motion.button>
        </div>

        {/* Status Messages */}
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-green-600 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Verificación exitosa</span>
          </motion.div>
        )}

        {isValid === false && !isVerified && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-600 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Código incorrecto. Inténtalo de nuevo.</span>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Ingresa el código de 6 caracteres mostrado arriba para verificar que no eres un robot.
      </p>
    </div>
  );
};

export default SimpleCaptcha;