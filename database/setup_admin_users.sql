-- Script para configurar la tabla admin_users en Supabase
-- Ejecuta este SQL en el SQL Editor de tu dashboard de Supabase

-- Crear tabla admin_users si no existe
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(active);

-- Crear tabla para registrar intentos de login (opcional)
CREATE TABLE IF NOT EXISTS admin_login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    success BOOLEAN NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address VARCHAR(45)
);

-- Crear índice para intentos de login
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_email ON admin_login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_date ON admin_login_attempts(attempted_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para admin_users
-- Solo permitir lectura para autenticación (sin exponer contraseñas)
CREATE POLICY "Permitir lectura para autenticación" ON admin_users
    FOR SELECT USING (true);

-- Permitir actualización de last_login
CREATE POLICY "Permitir actualización de login" ON admin_users
    FOR UPDATE USING (true);

-- Política para admin_login_attempts
CREATE POLICY "Permitir inserción de intentos" ON admin_login_attempts
    FOR INSERT WITH CHECK (true);

-- Insertar usuario administrador por defecto
-- IMPORTANTE: Cambia estos datos por los tuyos
INSERT INTO admin_users (email, password_hash, nombre, role, active) 
VALUES (
    'admin@lacteoslaflorida.com',
    'admin123', -- CAMBIAR por una contraseña segura
    'Administrador Principal',
    'super_admin',
    true
) ON CONFLICT (email) DO NOTHING;

-- Opcional: Insertar más usuarios admin
INSERT INTO admin_users (email, password_hash, nombre, role, active) 
VALUES (
    'gerente@lacteoslaflorida.com',
    'gerente123', -- CAMBIAR por una contraseña segura
    'Gerente de Ventas',
    'admin',
    true
) ON CONFLICT (email) DO NOTHING;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verificar que todo se creó correctamente
SELECT 'Tabla admin_users creada correctamente' as status;
SELECT COUNT(*) as total_admins FROM admin_users;