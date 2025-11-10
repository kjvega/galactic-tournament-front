# GalacticTournamentFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```


Interfaz web del proyecto Galactic Tournament, desarrollada con Angular 20 y desplegada en un contenedor Docker con Nginx.
Permite registrar especies, simular combates, visualizar el ranking galáctico y los resultados de las batallas en tiempo real.

Tecnologías utilizadas
Tecnología	Versión	Descripción
Angular	20.x	Framework principal para el frontend.
npm 20 o superior 
TypeScript	5.x	Lenguaje base del proyecto.
RxJS / Signals	—	Manejo reactivo de estado y reactividad avanzada.
Angular Material	—	Componentes UI (formularios, botones, tablas).
Nginx (stable-alpine)	—	Servidor para producción del build Angular.
Docker	≥ 24	Contenerización del proyecto.
Características principales

    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    


Angular CLI: 20.3.9
Node: 22.19.0
Package Manager: npm 10.9.3
OS: win32 x64
    

Angular: 20.3.10
... common, compiler, compiler-cli, core, forms
... platform-browser, platform-server, router

Package                      Version
------------------------------------
@angular-devkit/architect    0.2003.9
@angular-devkit/core         20.3.9
@angular-devkit/schematics   20.3.9
@angular/build               20.3.9
@angular/cli                 20.3.9
@angular/ssr                 20.3.9
@schematics/angular          20.3.9
rxjs                         7.8.2
typescript                   5.9.3
zone.js                      0.15.1

Arquitectura modular basada en standalone components.

Reactividad con Signals (sin necesidad de NgRx).

Combates galácticos entre especies con animaciones visuales.

Tablas de ranking y resultados persistentes.

Sistema global de toasts e interceptor HTTP para manejo de errores del backend.


Preparado para despliegue en Docker + Nginx.

📂 Estructura del proyecto
galactic-tournament-front/
│
├── src/
│   ├── app/
│   │   ├── core/              # Interceptores, servicios base
│   │   ├── modules/species/   # Módulo de especies (ranking, batalla, registro)
│   │   ├── shared/            # Componentes y servicios compartidos
│   │   └── app.routes.ts      # Rutas principales
│   ├── assets/                # Recursos estáticos
│   ├── environments/          # Configuración de entornos
│   └── main.ts                # Punto de arranque de Angular
│
├── nginx.conf                 # Configuración del servidor Nginx
├── Dockerfile                 # Construcción de la imagen del front
├── package.json               # Dependencias del proyecto
└── angular.json               # Configuración Angular CLI

Scripts disponibles
Desarrollo local

Ejecuta el proyecto con live reload:

npm install
npm start


o

ng serve


El proyecto estará disponible en
http://localhost:4200

Build de producción

Crea el build optimizado para producción:

npm run build -- --configuration production


El resultado se genera en:

dist/galactic-tournament-front/browser/

Despliegue con Docker
Construir la imagen:
docker build -t galactic-tournament-front .

2️⃣ Ejecutar el contenedor:
docker run -d -p 4200:80 --name galactic-front galactic-tournament-front


Luego abre en el navegador:
http://localhost:4200

nginx.conf

Archivo base incluido en la raíz del proyecto:

server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  # Soporte para rutas de Angular (SPA)
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Archivos estáticos
  location ~* \.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff2?)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public, immutable";
  }
}

🔗 Comunicación con el backend

El frontend se comunica con el backend en Spring Boot (puerto 8081) mediante los endpoints REST:

Endpoint	Descripción
/api/species	Registro y listado de especies
/api/species/fight	Ejecución de combates
/api/species/ranking	Consulta de ranking
/api/battle-results	Historial de batallas

Configurable en el environment.ts:

export const environment = {
  apiUrl: 'http://localhost:8081/api'
};

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
