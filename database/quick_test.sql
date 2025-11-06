-- Prueba rápida para verificar que todo funciona
-- Ejecuta este SQL en el SQL Editor de Supabase

-- 1. Verificar estructura actual de la tabla
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'admin_users';

-- 2. Ver todos los usuarios
SELECT * FROM admin_users;

-- 3. Probar consulta simple (la que usa el código)
SELECT * FROM admin_users WHERE email = 'admin@lacteoslaflorida.com';

-- 4. Si no existe el usuario, crearlo
INSERT INTO admin_users (email, password_hash, nombre) 
VALUES ('admin@lacteoslaflorida.com', 'admin123', 'Administrador Principal')
ON CONFLICT (email) DO UPDATE SET 
    password_hash = 'admin123',
    nombre = 'Administrador Principal';

-- 5. Verificar que se creó/actualizó
SELECT * FROM admin_users WHERE email = 'admin@lacteoslaflorida.com';