# Etapa 1: build de Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: servir con Nginx
FROM nginx:stable-alpine

# Eliminamos archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiamos el build generado por Angular 20 (que vive en /browser)
COPY --from=build /app/dist/galactic-tournament-front/browser /usr/share/nginx/html

# Copiamos configuración de Nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
