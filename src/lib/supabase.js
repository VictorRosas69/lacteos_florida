import { createClient } from '@supabase/supabase-js'

// Estas variables las obtienes de tu dashboard de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wclcwmcwgfscisckvgiv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XseCIwU7TcWORpUZF_WkUg_NKakVW1D'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funciones helper para productos
export const productosAPI = {
    // Obtener todos los productos
    async getAll() {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('activo', true)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    // Crear nuevo producto
    async create(producto) {
        const { data, error } = await supabase
            .from('productos')
            .insert([producto])
            .select()

        if (error) throw error
        return data[0]
    },

    // Actualizar producto
    async update(id, updates) {
        const { data, error } = await supabase
            .from('productos')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    },

    // Eliminar producto (soft delete)
    async delete(id) {
        const { data, error } = await supabase
            .from('productos')
            .update({ activo: false, updated_at: new Date().toISOString() })
            .eq('id', id)

        if (error) throw error
        return data
    }
}

// Funciones helper para PQRS
export const pqrsAPI = {
    // Obtener todos los PQRS
    async getAll() {
        const { data, error } = await supabase
            .from('pqrs')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    },

    // Crear nuevo PQRS
    async create(pqrs) {
        const { data, error } = await supabase
            .from('pqrs')
            .insert([pqrs])
            .select()

        if (error) throw error
        return data[0]
    },

    // Actualizar estado de PQRS
    async updateStatus(id, estado, respuesta = null) {
        const updates = {
            estado,
            updated_at: new Date().toISOString()
        }

        if (respuesta) {
            updates.respuesta = respuesta
        }

        const { data, error } = await supabase
            .from('pqrs')
            .update(updates)
            .eq('id', id)
            .select()

        if (error) throw error
        return data[0]
    }
}



// Función para autenticación de admin
export const authAPI = {
    async login(email, password) {
        try {
            console.log('🔐 Intentando autenticación para:', email);
            console.log('🔗 URL de Supabase:', supabaseUrl);

            // Primero, probar la conexión básica
            const { data: testConnection, error: connectionError } = await supabase
                .from('admin_users')
                .select('count', { count: 'exact', head: true });

            if (connectionError) {
                console.error('❌ Error de conexión:', connectionError);
                return {
                    success: false,
                    error: 'Error de conexión con la base de datos: ' + connectionError.message
                };
            }

            console.log('✅ Conexión exitosa con Supabase');

            // Buscar el usuario en la tabla admin_users
            const { data: users, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('email', email.toLowerCase().trim());

            console.log('📊 Respuesta de consulta:', { users, error });

            if (error) {
                console.error('❌ Error en consulta de usuario:', error);
                return {
                    success: false,
                    error: 'Error consultando usuario: ' + error.message
                };
            }

            if (!users || users.length === 0) {
                console.log('❌ Usuario no encontrado:', email);
                return {
                    success: false,
                    error: 'Credenciales incorrectas'
                };
            }

            const user = users[0];
            console.log('✅ Usuario encontrado:', user);

            // Verificar si el usuario está activo (si la columna existe)
            if (user.active !== undefined && user.active === false) {
                console.log('❌ Usuario inactivo:', email);
                return {
                    success: false,
                    error: 'Usuario inactivo'
                };
            }

            // Verificar la contraseña (comparación directa por ahora)
            if (user.password_hash !== password) {
                console.log('❌ Contraseña incorrecta para:', email);
                return {
                    success: false,
                    error: 'Credenciales incorrectas'
                };
            }

            console.log('✅ Autenticación exitosa para:', email);

            // Intentar actualizar último login (opcional, no crítico)
            try {
                await supabase
                    .from('admin_users')
                    .update({
                        last_login: new Date().toISOString()
                    })
                    .eq('id', user.id);
            } catch (updateError) {
                console.warn('⚠️ No se pudo actualizar last_login:', updateError);
                // No fallar por esto
            }

            return {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                    role: user.role || 'admin'
                }
            };

        } catch (error) {
            console.error('❌ Error general en autenticación:', error);
            return {
                success: false,
                error: 'Error de conexión. Verifica tu internet e inténtalo de nuevo.'
            };
        }
    },

    // Función de prueba para verificar conexión
    async testConnection() {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('email, nombre')
                .limit(5);

            if (error) {
                console.error('❌ Error de conexión:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Conexión exitosa. Usuarios encontrados:', data);
            return { success: true, users: data };
        } catch (error) {
            console.error('❌ Error de prueba:', error);
            return { success: false, error: error.message };
        }
    },

    // Función simplificada para login directo (sin columna active)
    async loginSimple(email, password) {
        try {
            const { data: users, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('email', email.toLowerCase().trim());

            if (error) {
                return { success: false, error: 'Error de conexión con la base de datos' };
            }

            if (!users || users.length === 0) {
                return { success: false, error: 'Credenciales incorrectas' };
            }

            const user = users[0];

            if (user.password_hash !== password) {
                return { success: false, error: 'Credenciales incorrectas' };
            }

            return {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    nombre: user.nombre,
                    role: user.role || 'admin'
                }
            };
        } catch (error) {
            return { success: false, error: 'Error interno del servidor' };
        }
    }
}