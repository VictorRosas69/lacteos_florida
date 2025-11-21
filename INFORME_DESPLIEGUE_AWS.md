# Informe de Despliegue en AWS: Proyecto React + Supabase

## 1. Resumen del Proyecto
**Tecnología Detectada:**
- **Frontend:** React (Vite)
- **Lenguaje:** JavaScript/JSX
- **Base de Datos:** Supabase (Externa)
- **Dependencias Clave:** `react-router-dom`, `@supabase/supabase-js`, `tailwindcss`

El proyecto es una "Single Page Application" (SPA). No requiere un servidor backend tradicional (como EC2 o Elastic Beanstalk) para servir el frontend, ya que se puede alojar como archivos estáticos. La lógica de negocio y persistencia se maneja a través de Supabase.

## 2. Recomendación de Arquitectura en AWS

Para este tipo de arquitectura (SPA + Backend as a Service), la mejor opción en AWS es **AWS Amplify**.

### ¿Por qué AWS Amplify?
1.  **Facilidad de Uso:** Está diseñado específicamente para frameworks modernos como React y Vite.
2.  **CI/CD Integrado:** Se conecta directamente a tu repositorio (GitHub, GitLab, Bitbucket). Cada vez que haces `git push`, Amplify construye y despliega la nueva versión automáticamente.
3.  **Gestión de Variables de Entorno:** Permite configurar de forma segura las credenciales de Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`) sin exponerlas en el código.
4.  **Hosting Global:** Utiliza la red de distribución de contenido (CDN) de AWS (CloudFront) para que la carga sea rápida desde cualquier lugar.
5.  **Soporte de Rutas:** Maneja automáticamente las reglas de reescritura para `react-router-dom` (evita errores 404 al recargar páginas internas).

### Alternativa: AWS S3 + CloudFront
Es una opción válida y muy económica, pero requiere configuración manual de:
- Buckets de S3.
- Distribución de CloudFront.
- Certificados SSL (ACM).
- Invalidación de caché en cada despliegue.
- Scripts de despliegue manuales.
*Recomendamos Amplify por la automatización y simplicidad.*

---

## 3. Guía Paso a Paso para Desplegar en AWS Amplify

### Prerrequisitos
- Tener una cuenta de AWS activa.
- Tener el código subido a un repositorio Git (GitHub, GitLab, Bitbucket o AWS CodeCommit).

### Pasos
1.  **Iniciar Sesión en AWS Console** y buscar el servicio **AWS Amplify**.
2.  Hacer clic en **"Create new app"** (Crear nueva aplicación) -> **"Host web app"**.
3.  **Seleccionar el proveedor de código** (ej. GitHub) y autorizar el acceso.
4.  **Seleccionar el repositorio y la rama** (ej. `main` o `master`).
5.  **Configuración de Build (Build Settings):**
    Amplify detectará automáticamente que es un proyecto Vite. Debería mostrar algo similar a:
    ```yaml
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
    ```
    *Nota: Asegúrate de que `baseDirectory` sea `dist` (que es el defecto de Vite).*

6.  **Variables de Entorno (Advanced Settings):**
    Aquí es donde conectamos con Supabase. Agrega las siguientes variables (copiando los valores de tu archivo `.env` local o panel de Supabase):
    - `VITE_SUPABASE_URL`: Tu URL de Supabase.
    - `VITE_SUPABASE_ANON_KEY`: Tu clave pública (anon) de Supabase.
    
    *Importante: En Vite, las variables deben empezar con `VITE_` para ser accesibles en el navegador.*

7.  **Revisar y Desplegar:** Haz clic en "Save and deploy".
8.  Amplify comenzará el proceso de: Provision -> Build -> Deploy -> Verify.

## 4. Consideraciones de Base de Datos (Supabase)

Dado que tu base de datos está en Supabase, necesitas asegurar que tu aplicación desplegada pueda comunicarse con ella.

1.  **URL del Sitio:** Una vez desplegado, Amplify te dará una URL (ej. `https://main.d12345.amplifyapp.com`).
2.  **Autenticación (Auth):** Ve a tu panel de **Supabase -> Authentication -> URL Configuration**.
    - Agrega la URL de producción de Amplify a la lista de **Site URL** y **Redirect URLs**. Esto es crucial para que funcionen los flujos de login/registro y redirecciones de OAuth.
3.  **Seguridad (RLS):** Asegúrate de que tus tablas en Supabase tengan habilitado **Row Level Security (RLS)**. Como la `ANON_KEY` es pública (visible en el navegador), la seguridad debe residir en las políticas de la base de datos, no en ocultar la clave.

## 5. Estimación de Costos (Capa Gratuita / Free Tier)

AWS Amplify ofrece una capa gratuita generosa por 12 meses:
- **Builds:** 1,000 minutos de construcción al mes.
- **Hosting:** 5 GB de almacenamiento y 15 GB de transferencia de datos al mes.

Para un proyecto personal o de inicio, es muy probable que te mantengas dentro de la capa gratuita. Si escalas, el modelo es "pay-as-you-go" (pago por uso).

## 6. Conclusión

Para tu proyecto "Lácteos Florida", la ruta recomendada es:
1.  Subir tu código a GitHub.
2.  Conectar el repositorio a **AWS Amplify**.
3.  Configurar las variables de entorno de Supabase en la consola de Amplify.
4.  Actualizar la configuración de URLs en el panel de Supabase.

Esta configuración es profesional, escalable y requiere muy poco mantenimiento.
