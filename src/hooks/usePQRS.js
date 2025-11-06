import { useState, useEffect } from 'react';
import { pqrsAPI } from '../lib/supabase';

export const usePQRS = () => {
  const [pqrsData, setPqrsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar PQRS desde Supabase
  const loadPQRS = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Intentando cargar PQRS desde Supabase...');

      const data = await pqrsAPI.getAll();
      console.log('✅ Datos PQRS cargados:', data);

      if (data && data.length > 0) {
        setPqrsData(data);
        console.log(`📊 Se cargaron ${data.length} registros PQRS reales`);
      } else {
        console.log('⚠️ No hay datos PQRS en la base de datos, usando datos de ejemplo');
        setPqrsData([
          {
            id: 'demo-1',
            created_at: '2024-11-01T10:00:00Z',
            nombre: 'María González',
            correo: 'maria@email.com',
            tipo: 'Sugerencia',
            descripcion: 'Me gustaría que tuvieran más variedad de yogures sin azúcar.',
            estado: 'Pendiente'
          },
          {
            id: 'demo-2',
            created_at: '2024-10-30T15:30:00Z',
            nombre: 'Carlos Rodríguez',
            correo: 'carlos@email.com',
            tipo: 'Queja',
            descripcion: 'El producto llegó con fecha de vencimiento muy próxima.',
            estado: 'En proceso'
          },
          {
            id: 'demo-3',
            created_at: '2024-10-28T09:15:00Z',
            nombre: 'Ana Martínez',
            correo: 'ana@email.com',
            tipo: 'Petición',
            descripcion: 'Solicito información sobre productos sin lactosa.',
            estado: 'Resuelto'
          }
        ]);
      }
    } catch (err) {
      console.error('❌ Error cargando PQRS desde Supabase:', err);
      setError(`Error de conexión: ${err.message}`);

      // Usar datos simulados como fallback
      console.log('🔄 Usando datos simulados como respaldo...');
      setPqrsData([
        {
          id: 'fallback-1',
          created_at: '2024-11-01T10:00:00Z',
          nombre: 'María González (Demo)',
          correo: 'maria@email.com',
          tipo: 'Sugerencia',
          descripcion: 'Me gustaría que tuvieran más variedad de yogures sin azúcar.',
          estado: 'Pendiente'
        },
        {
          id: 'fallback-2',
          created_at: '2024-10-30T15:30:00Z',
          nombre: 'Carlos Rodríguez (Demo)',
          correo: 'carlos@email.com',
          tipo: 'Queja',
          descripcion: 'El producto llegó con fecha de vencimiento muy próxima.',
          estado: 'En proceso'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo PQRS
  const createPQRS = async (pqrsData) => {
    try {
      setLoading(true);
      const newPQRS = await pqrsAPI.create(pqrsData);
      setPqrsData(prev => [newPQRS, ...prev]);
      return newPQRS;
    } catch (err) {
      console.error('Error creando PQRS:', err);
      setError('Error enviando PQRS');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar estado de PQRS
  const updatePQRSStatus = async (id, estado, respuesta = null) => {
    try {
      setLoading(true);
      const updatedPQRS = await pqrsAPI.updateStatus(id, estado, respuesta);
      setPqrsData(prev =>
        prev.map(item =>
          item.id === id ? updatedPQRS : item
        )
      );
      return updatedPQRS;
    } catch (err) {
      console.error('Error actualizando PQRS:', err);
      setError('Error actualizando PQRS');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Estadísticas de PQRS
  const getStats = () => {
    return {
      total: pqrsData.length,
      pendientes: pqrsData.filter(p => p.estado === 'Pendiente').length,
      enProceso: pqrsData.filter(p => p.estado === 'En proceso').length,
      resueltos: pqrsData.filter(p => p.estado === 'Resuelto').length
    };
  };

  useEffect(() => {
    // Intentar cargar datos reales de Supabase
    loadPQRS();
  }, []);

  return {
    pqrsData,
    loading,
    error,
    loadPQRS,
    createPQRS,
    updatePQRSStatus,
    getStats
  };
};