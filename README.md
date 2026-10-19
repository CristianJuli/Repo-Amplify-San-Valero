# Cloud Messages Demo

Aplicación React mínima para probar un workshop con GitHub y AWS Amplify.

## Requisitos

- Node.js 18 o superior
- npm

## Ejecutar en local

```bash
npm install
npm run dev
```

## Generar build de producción

```bash
npm run build
npm run preview
```

El build se genera en `dist/`.

## Estado inicial

Los mensajes se guardan únicamente en memoria. Al recargar la página desaparecen.

## Evolución prevista

1. Subir el proyecto a GitHub.
2. Desplegarlo con AWS Amplify Hosting.
3. Conectar Amplify Data / AWS AppSync / Amazon DynamoDB.
4. Persistir los mensajes.
5. Añadir un nuevo campo al formulario y al modelo de datos.
