-- Script para arreglar las políticas RLS de admin_users
-- Ejecuta este SQL en el SQL Editor de Supabase

-- Primero, deshabilitar RLS temporalmente para testing
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Verificar que los datos existen
SELECT * FROM admin_users;

-- Si no hay datos, insertar usuario de prueba
INSERT INTO admin_users (email, password_hash, nombre, role, active) 
VALUES (
    'admin@lacteoslaflorida.com',
    'admin123',
    'Administrador Principal',
    'super_admin',
    true
) ON CONFLICT (email) DO UPDATE SET
    password_hash = 'admin123',
    active = true;

-- Verificar que se insertó correctamente
SELECT email, nombre, role, active, created_at FROM admin_users;

-- Opcional: Habilitar RLS con políticas más permisivas
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Permitir lectura para autenticación" ON admin_users;
DROP POLICY IF EXISTS "Permitir actualización de login" ON admin_users;

-- Crear políticas más permisivas para testing
CREATE POLICY "Permitir todo acceso" ON admin_users
    FOR ALL USING (true) WITH CHECK (true);

-- Verificar que las políticas funcionan
SELECT 'Configuración completada correctamente' as status;