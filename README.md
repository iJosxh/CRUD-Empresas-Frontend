# CRUD de Empresas — Frontend

Aplicación web desarrollada con Angular para gestionar empresas. Permite registrar empresas, consultar sus datos y actualizar su información mediante una API REST desarrollada con Spring Boot.

## Tecnologías utilizadas

- Angular
- TypeScript
- HTML y CSS
- Reactive Forms
- HttpClient
- Angular Router

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener instalados:

- **Node.js:** entorno de ejecución de JavaScript.
- **npm:** administrador de paquetes que se instala con Node.js.
- **Angular CLI:** herramienta para ejecutar y administrar proyectos Angular.
- **Backend Spring Boot:** API REST del sistema de empresas.

## Instalación

1. Clona el repositorio o descarga el proyecto.
2. Abre una terminal en la carpeta raíz del frontend.
3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Si no tienes Angular CLI instalado, puedes instalarlo con:

   ```bash
   npm install -g @angular/cli
   ```

## Configuración


Verifica que el backend esté ejecutándose y que la URL configurada en el servicio `src/app/services/empresa.ts` corresponda a la dirección de tu API.

Configuración actual:

```typescript
private apiUrl = 'http://localhost:8080/api/empresas';
```

Si el backend utiliza otro puerto o dirección, actualiza esta URL.

## Ejecutar el proyecto

Desde la carpeta raíz del frontend, ejecuta:

```bash
ng serve
```

También puedes utilizar:

```bash
npm start
```

Abre el navegador en:

http://localhost:4200


## Funcionalidades

- Listar empresas registradas.
- Registrar nuevas empresas.
- Validar los campos del formulario.
- Consultar los detalles de una empresa.
- Actualizar la información de una empresa.

## Estructura principal

```text
src/
└── app/
    ├── models/
    │   └── empresa.ts
    ├── services/
    │   └── empresa.ts
    ├── pages/
    │   ├── listado-empresas/
    │   └── detalle-empresa/
    ├── app.config.ts
    ├── app.routes.ts
    └── app.html
```
