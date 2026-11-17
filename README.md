# ATEL 3D — Sitio web y sistema de gestión

Sitio oficial de ATEL 3D, estudio de diseño y fabricación digital en Cuenca, Ecuador.

## Estado actual
Primera versión de la página pública: presentación del estudio, líneas ATEL HOME / ATEL PRO / ATEL LAB y acceso directo a WhatsApp.

## Tecnología
- Next.js + React + TypeScript
- Supabase previsto para autenticación, base de datos y almacenamiento (configuración pendiente)
- Despliegue previsto: Cloudflare Pages

## Próximas etapas
1. Configurar Supabase y proteger el acceso al panel privado.
2. Crear gestión de productos, fotos y categorías.
3. Implementar inventario, pedidos, clientes y pagos.
4. Añadir gastos, indicadores financieros y reportes.
5. Publicar la web.

## Desarrollo local
1. Instala Node.js LTS.
2. Descarga o clona este repositorio.
3. Ejecuta `npm install`.
4. Ejecuta `npm run dev`.
5. Abre `http://localhost:3000`.

## Variables de entorno
Copia `.env.example` a `.env.local` y completa las credenciales públicas del proyecto Supabase cuando configuremos la base de datos.

**Nunca publiques claves privadas ni la clave `service_role` de Supabase.**
