-- Script para agregar las columnas faltantes a admin_users
-- Ejecuta este SQL en el SQL Editor de Supabase

-- Agregar columna active si no existe
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Agregar columna role si no existe
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'admin';

-- Agregar columna created_at si no existe
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Agregar columna updated_at si no existe
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Agregar columna last_login si no existe
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Actualizar los registros existentes para que tengan active = true
UPDATE admin_users SET active = true WHERE active IS NULL;

-- Actualizar los registros existentes para que tengan role = 'admin'
UPDATE admin_users SET role = 'admin' WHERE role IS NULL;

-- Verificar la estructura final
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'admin_users' 
ORDER BY ordinal_position;

-- Verificar los datos
SELECT * FROM admin_users;