# md-links-kr

## Descripción

`md-links-kr` Es una biblioteca que analiza archivos Markdown para extraer y validar enlaces. Puede utilizarse para obtener una lista de enlaces presentes en un archivo Markdown y, opcionalmente, validar su estado.

## Instalación

Para instalar la librería, asegúrate de tener Node.js instalado en tu sistema (versión 14.0.0 o superior) y ejecuta el siguiente comando:

```bash
npm install -g md-links-kr
```

## Uso

Desde la línea de comandos
```bash
md-links <archivo.md> [--validate] [--stats]
```
.  `<archivo.md>`: Ruta al archivo Markdown que deseas analizar.
.  `--validate`: Opción para validar el estado de los enlaces.
.  `--stats`: Opción para obtener estadísticas básicas de los enlaces.

## Desde JavaScript

```javascript
const mdLinks = require('md-links-kr');

mdLinks('./path/to/file.md', { validate: true })
    .the((links) => {
        console.table(links);
    })
    .catch((error) => {
        console.error(error);
    });

## API

`mdLinks(filePath, options)`

Parámetros: 

.  `filePath` (String): Ruta al archivo Markdown.
.  `options` (Object):
    .  `validate` (Booleand, opcional): Si se debe validar el estado de los enalces.
    
    Retorna: 

    .  Una promesa que resuelve un array de objetos representand los enlaces.

## Contribuyentes

.  Knelia Rodríguez

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para obtener más detalles