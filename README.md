# ROSE LAB AR

Plataforma de capacitación en el corte de rosas de exportación (variedad roja Freedom) con realidad aumentada. Proyecto de Sabana Hack 2026.

## Estructura

```
index.html              Estructura de las pantallas (inicio, configuración, listo, pausa, resultados)
css/styles.css          Estilos e identidad visual (paleta GHT)
js/main.js              Lógica del juego: escena 3D (Three.js), WebXR, controles y evaluación
assets/                 Logos e imágenes
```

Three.js 0.160 se carga desde unpkg mediante el `importmap` de `index.html`.

## Cómo ejecutarlo

Como `js/main.js` es un módulo de JavaScript, el navegador no lo carga si abres `index.html` con doble clic (`file://`). Hay que servir la carpeta:

```bash
python3 -m http.server 8000
```

y abrir http://localhost:8000.

- **Computador:** vista previa con WASD + ratón.
- **Quest 3 o celular (AR):** WebXR y la cámara exigen **HTTPS**, por ejemplo publicando el repositorio con GitHub Pages.
