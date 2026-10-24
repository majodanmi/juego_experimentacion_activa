# ROSE LAB AR

Plataforma de capacitación en el corte de rosas de exportación (variedad roja Freedom) con realidad aumentada. Proyecto de Sabana Hack 2026.

📖 **Documentación completa: [wiki del proyecto](docs/README.md)**: guías para aprendices y formadores, banco de rosas, arquitectura y despliegue.

## Ciclo completo

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
