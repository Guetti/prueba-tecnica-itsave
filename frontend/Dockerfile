# Usa una imagen de Node específica basada en Debian (compatible con rollup-linux-x64-gnu)
FROM node:slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia package.json y package-lock.json (si existe) para instalar dependencias
COPY package*.json ./

# Instala las dependencias con npm
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que usa Vite por defecto
EXPOSE 5173

# Comando por defecto para iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev"]
