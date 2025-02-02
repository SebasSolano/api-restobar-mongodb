# API Restobar MongoDB

Esta API proporciona una plataforma para manejar un sistema de gestión de imágenes en un restaurante. Está desarrollada con Node.js, Express y utiliza MongoDB como base de datos principal.

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB con Mongoose
- Sharp
- Dotenv para configuración del entorno

---

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js (versión 18 o superior)
- MongoDB

---

## Instalación y Configuración

1. **Clona este repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd api-restobar-mongodb

2. **Instala las dependencias**:
   ```bash
   npm install
3. **Configura las variables de entorno**:
    ```bash
    PORT=5000
    MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<nombre_base_datos>
4. **Inicia el servidor en modo desarrollo**:  
    ```bash
    npm run dev
