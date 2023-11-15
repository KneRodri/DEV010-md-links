# md-links-kr

## Descripción

`md-links-kr` es una biblioteca que analiza archivos Markdown para extraer y validar enlaces. Puede utilizarse para obtener una lista de enlaces presentes en un archivo Markdown y, opcionalmente, validar su estado.

## Instalación

Para instalar la librería, asegúrate de tener Node.js instalado en tu sistema (versión 14.0.0 o superior) y ejecuta el siguiente comando:

```bash
npm install -g md-links-kr

## Uso

Desde la línea de comandos

md-links <archivo.md> [--validate] [--stats]

.  `<archivo.md>`: Ruta al archivo Markdown que deseas analizar.
.  `--validate`: Opción para validar el estado de los enlaces.
.  `--stats`: Opción para obtener estadísticas básicas de los enlaces.