# Proyecto TO-DO List 📖

Este proyecto es una aplicación de lista de tareas que utiliza un backend en Django, un frontend en React con Vite y una base de datos MySQL.

---

## Requisitos previos

### Para usar Docker:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Para configurarlo manualmente:

- [Python 3.11](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)
- [MySQL 8](https://www.mysql.com/)

---

## Instrucciones para poner en marcha el proyecto

### Usando Docker

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Guetti/prueba-tecnica-itsave.git
   cd prueba-tecnica-itsave
   ```
2. **Construye y levanta los contenedores**: Ejecuta el siguiente comando desde la raíz del proyecto:

   ```bash
   docker-compose up --build
   ```

   Esto hará lo siguiente:

   - Construir las imágenes de Docker para el backend y el frontend.
   - Levantar los contenedores de la base de datos, el backend y el frontend.
   - Crear la base de datos y las tablas necesarias.

3. **Accede a la aplicación**:

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8000/api](http://localhost:8000/api)
   - Base de datos: [http://localhost:3306](http://localhost:3306) (usuario: `root`, contraseña: `root`)

4. **Detener los contenedores**: Para detener los contenedores, ejecuta:
   ```bash
   docker-compose down
   ```

### Configuración manual

Si prefieres configurar el proyecto manualmente, sigue estos pasos:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Guetti/prueba-tecnica-itsave.git
   cd prueba-tecnica-itsave
   ```
2. **Configura la base de datos**:

   - Asegúrate de tener MySQL instalado y en funcionamiento.
   - Crea una base de datos llamada `todo_list` y un usuario con permisos para acceder a ella.
     Puedes usar el siguiente comando en una terminal de tu servidor MySQL para crear la base de datos y el usuario (ajusta los valores según sea necesario):

     ```sql
     CREATE DATABASE todo_list CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
     CREATE USER 'tu_usuario'@'localhost' IDENTIFIED BY 'tu_contraseña';
     GRANT ALL PRIVILEGES ON todo_list.* TO 'tu_usuario'@'localhost';
     FLUSH PRIVILEGES;
     ```

3. **Configura el backend**:

   - Navega a la carpeta `backend`:

     ```bash
     cd backend
     ```

   - Agrega las credenciales de la base de datos en el archivo `.env` en la raíz del proyecto. Puedes modificar el archivo `.env.example` y renombrarlo a `.env`:

     ```bash
     DB_NAME=todo_list
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_HOST=localhost
     DB_PORT=3306
     ```

   - Crea un entorno virtual y actívalo:
     ```bash
     python -m venv venv
     source venv/bin/activate  # En Windows usa: venv\Scripts\activate
     ```
   - Instala las dependencias:
     ```bash
     pip install -r requirements.txt
     ```
   - Ejecuta las migraciones:
     ```bash
     python manage.py migrate
     ```
   - Inicia el servidor de desarrollo:

     ```bash
       python manage.py runserver
     ```

   - Accede al backend en [http://localhost:8000/api](http://localhost:8000/api)

4. **Configura el frontend**:

   - Navega a la carpeta `frontend`:

     ```bash
     cd ../frontend
     ```

   - Instala las dependencias:

     ```bash
     npm install
     ```

   - Inicia el servidor de desarrollo:

     ```bash
     npm run dev
     ```

   - Accede al frontend en [http://localhost:5173](http://localhost:5173)

5. **Detener el servidor**: Para detener el servidor de desarrollo, presiona `Ctrl + C` en la terminal donde lo iniciaste.
