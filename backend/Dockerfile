FROM python:3.11-bullseye

# Instala netcat
RUN apt-get update && apt-get install -y netcat && apt-get clean

# Establece el directorio de trabajo
WORKDIR /app

# Copia e instala las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto del servidor
EXPOSE 8000