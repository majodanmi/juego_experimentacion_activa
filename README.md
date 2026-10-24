# ROSE LAB AR

Plataforma de capacitación en el corte de rosas de exportación (variedad roja Freedom) con realidad aumentada. Proyecto de Sabana Hack 2026.

🌹 **Jugar El viaje de una rosa (fase 1):** https://majodanmi.github.io/juego_experimentacion_activa/viaje-de-una-rosa/index.html

📖 **Documentación completa: [wiki del proyecto](docs/README.md)**: guías para aprendices y formadores, banco de rosas, arquitectura y despliegue.

## Ciclo completo

- **Fase 1 · [El viaje de una rosa](viaje-de-una-rosa/index.html):** juego narrativo de 10 a 15 minutos (experiencia concreta del ciclo de Kolb). El aprendiz corta una rosa, la acompaña hasta la floristería en Miami y descubre por qué importa el punto de corte. Abre con doble clic, sin servidor.
- **A · Recorrido del robot:** simulación de un robot que recorre el pasillo y fotografía las rosas desde abajo (fotos reales de la finca).
- **B · Banco de rosas:** varias personas califican las rosas (inmadura, óptima o sobreabierta) y se comparan con el experto de la finca. Exporta Excel (.xlsx) y un dataset .zip con fotos para entrenar modelos.
- **C · Entrenamiento:** cama de rosas 3D en AR, celular o computador. El escenario "Banco de la finca" arma la cama con las rosas reales ya calificadas.

## Estructura

```
index.html                Estructura de todas las pantallas
css/styles.css            Estilos generales e identidad visual (paleta GHT)
css/banco.css             Estilos del recorrido del robot y del banco de rosas
js/main.js                Juego: escena 3D (Three.js), WebXR/AR, controles, evaluación y botones
js/banco/recorrido.js     A · Simulación del recorrido del robot
js/banco/banco.js         B · Banco de rosas: calificación, consenso, exportación
js/banco/datos-finca.js   Etiquetas de la empresa y recuadros de cada rosa en las fotos
js/util/dom.js            Utilidades de DOM
js/util/exportar.js       CSV, ZIP y Excel sin librerías externas
assets/                   Logos
assets/finca/fotos/       Fotos originales del recorrido (desde abajo, en la cama)
assets/finca/rosas/       Recorte de cada rosa etiquetada
docs/                     Wiki del proyecto
viaje-de-una-rosa/        Fase 1: juego "El viaje de una rosa" (index.html, css/styles.css, js/juego.js)
```

Three.js 0.160 se carga desde unpkg mediante el `importmap` de `index.html`. Las calificaciones y el historial se guardan en el `localStorage` del navegador.

## Cómo ejecutarlo

Como `js/main.js` es un módulo de JavaScript, el navegador no lo carga si abres `index.html` con doble clic (`file://`). Hay que servir la carpeta:

```bash
python3 -m http.server 8000
``` 
y abrir http://localhost:8000.

- **Computador:** vista previa con WASD + ratón.
- **Quest 3 o celular (AR):** WebXR y la cámara exigen **HTTPS**, por ejemplo publicando el repositorio con GitHub Pages.

https://horizon.meta.com/shares/FZqkw5sTDDvnDF4s00ZRZfB6VkxOkG

https://horizon.meta.com/shares/aomstw7iOZmKotLpjUT4mamNfQnrQX






