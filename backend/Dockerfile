FROM python:alpine

# Instala netcat y dependencias para compilar mysqlclient
RUN apk update && apk add --no-cache \
    netcat-openbsd \
    build-base \
    mariadb-dev \
    pkgconfig \
    python3-dev

# Establece el directorio de trabajo
WORKDIR /app

# Copia e instala las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto del servidor
EXPOSE 8000
