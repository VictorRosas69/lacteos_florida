-- Crear tabla de productos si no existe
CREATE TABLE IF NOT EXISTS productos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    imagen VARCHAR(500),
    imagen_url VARCHAR(500),
    disponible BOOLEAN DEFAULT true,
    destacado BOOLEAN DEFAULT false,
    activo BOOLEAN DEFAULT true,
    badge VARCHAR(50),
    ventas_ultimo_mes INTEGER DEFAULT 0,
    ingresos_totales DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_disponible ON productos(disponible);
CREATE INDEX IF NOT EXISTS idx_productos_destacado ON productos(destacado);
CREATE INDEX IF NOT EXISTS idx_productos_activo ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_created_at ON productos(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública de productos activos
CREATE POLICY IF NOT EXISTS "Productos públicos legibles" ON productos
    FOR SELECT USING (activo = true);

-- Política para permitir todas las operaciones a usuarios autenticados (administradores)
CREATE POLICY IF NOT EXISTS "Administradores pueden gestionar productos" ON productos
    FOR ALL USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_productos_updated_at ON productos;
CREATE TRIGGER update_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos productos de ejemplo si la tabla está vacía
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, disponible, destacado, badge, ventas_ultimo_mes, ingresos_totales)
SELECT * FROM (VALUES
    ('Queso Campesino 500g', 'Queso fresco artesanal de sabor suave y textura cremosa, perfecto para acompañar con pan o frutas.', 9000.00, 'Quesos', 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', true, true, 'Bestseller', 245, 2205000.00),
    ('Yogurt Natural 1L', 'Yogurt casero cremoso y natural, rico en probióticos, perfecto solo o con frutas y miel.', 8500.00, 'Yogures', 'https://images.unsplash.com/photo-1571212515416-cd2c2c9c4e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', true, true, 'Orgánico', 289, 2456500.00),
    ('Arequipe Casero 250g', 'Dulce de leche artesanal cremoso y suave, perfecto para postres o untar.', 8000.00, 'Postres', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', true, false, 'Artesanal', 178, 1424000.00),
    ('Crema de Leche 1L', 'Crema fresca y espesa, ideal para preparaciones culinarias, postres y café.', 14000.00, 'Lácteos', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', true, false, 'Premium', 89, 1246000.00)
) AS v(nombre, descripcion, precio, categoria, imagen_url, disponible, destacado, badge, ventas_ultimo_mes, ingresos_totales)
WHERE NOT EXISTS (SELECT 1 FROM productos LIMIT 1);

-- Comentarios para documentar la tabla
COMMENT ON TABLE productos IS 'Tabla para almacenar el catálogo de productos de Lácteos La Florida';
COMMENT ON COLUMN productos.nombre IS 'Nombre del producto';
COMMENT ON COLUMN productos.descripcion IS 'Descripción detallada del producto';
COMMENT ON COLUMN productos.precio IS 'Precio del producto en pesos colombianos';
COMMENT ON COLUMN productos.categoria IS 'Categoría del producto (Lácteos, Quesos, Yogures, etc.)';
COMMENT ON COLUMN productos.imagen IS 'URL de la imagen del producto (campo legacy)';
COMMENT ON COLUMN productos.imagen_url IS 'URL de la imagen del producto';
COMMENT ON COLUMN productos.disponible IS 'Indica si el producto está disponible para la venta';
COMMENT ON COLUMN productos.destacado IS 'Indica si el producto debe mostrarse como destacado';
COMMENT ON COLUMN productos.activo IS 'Indica si el producto está activo en el sistema (soft delete)';
COMMENT ON COLUMN productos.badge IS 'Etiqueta especial del producto (Bestseller, Premium, etc.)';
COMMENT ON COLUMN productos.ventas_ultimo_mes IS 'Número de ventas del último mes';
COMMENT ON COLUMN productos.ingresos_totales IS 'Ingresos totales generados por este producto';