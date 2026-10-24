# Arquitectura del código

← [Instalación y despliegue](instalacion-y-despliegue.md) · [Inicio](README.md) · Siguiente: [Parámetros del cultivo](parametros-del-cultivo.md) →

## Estructura

```
index.html                Estructura de todas las pantallas (sin JS ni estilos en línea)
css/
  styles.css              Estilos generales, tokens de color GHT, modo celular
  banco.css               Estilos del recorrido del robot y del banco de rosas
js/
  main.js                 Punto de entrada: escena 3D, sesión, WebXR, controles, evaluación y botones
  banco/
    recorrido.js          A · Simulación del recorrido del robot
    banco.js              B · Banco: estado, calificación, consenso, κ, exportación
    datos-finca.js        Etiquetas de la empresa y recuadros de cada rosa
  util/
    dom.js                $ (getElementById) y esc (escapar HTML)
    exportar.js           CSV, ZIP sin compresión y Excel (.xlsx) sin librerías
assets/
  logo-ght-blanco.png     Logo para la banda verde
  logo-ght-color.png      Logo para pies de página y panel en VR
  finca/fotos/<n>.jpg     Fotos originales de la cama (480 × 640)
  finca/rosas/<id>.jpg    Recorte de cada rosa etiquetada
  maquina-del-tiempo/     Fotos de referencia de la máquina del tiempo (dia_m6.jpg … dia_p3.jpg)
viaje-de-una-rosa/        Fase 1: index.html · css/styles.css · js/juego.js
maquina-del-tiempo/       La rosa día a día: index.html · css/styles.css · js/main.js (módulo, Three.js)
plan-de-corte/            Predictor y ruta óptima: index.html · css/styles.css · js/main.js
docs/                     Esta wiki
```

Cada página tiene su HTML (estructura), su CSS (estilos) y su JS (lógica) en archivos separados. Los logos y las fotos se cargan desde `assets/`; no hay imágenes incrustadas en el código.

## Dependencias

| Dependencia | Cómo se carga | Para qué |
|---|---|---|
| Three.js 0.160 | `importmap` en `index.html` → unpkg | Escena 3D, WebXR, `PointerLockControls`, `mergeGeometries` |
| Montserrat | Google Fonts | Tipografía de la marca |

No hay `package.json`, ni build, ni framework.

## Módulos y dependencias entre ellos

```
main.js ──► banco/banco.js ──► banco/datos-finca.js
   │              ├──────────► util/exportar.js
   │              └──────────► util/dom.js
   └──────► banco/recorrido.js ──► banco/datos-finca.js, util/dom.js
```

- `main.js` importa `BANCO` (API del banco) y las funciones del recorrido.
- `banco.js` y `recorrido.js` **no importan** `main.js`. Para cambiar de pantalla usan `window.ir(id)`, que define `main.js`.

## Pantallas

Cada pantalla es un `<section class="pantalla">`. Solo una tiene la clase `on`. `window.ir(id)` cambia de pantalla.

```
inicio ──► recorrido (A) ──► banco (B) ──► config ──► listo ──► [juego] ──► resultados
   │                            ▲            ▲                    │
   └────────────────────────────┴────────────┘               pausa (Esc)
```

## Botones: `data-accion`

El HTML no tiene `onclick`. Cada botón declara su acción:

```html
<button data-accion="ir" data-arg="config">Configurar sesión</button>
<button data-accion="calificar" data-arg="OPT">Óptima</button>
```

Al final de `main.js`, el objeto `ACCIONES` relaciona cada nombre con su función y se registra un `click` por botón. Para agregar un botón:

1. Escribe la función (en `main.js` o expórtala desde su módulo).
2. Agrégala a `ACCIONES`.
3. Usa `data-accion="nombre"` (y `data-arg` si necesita un argumento) en el HTML.

Si una acción no existe, la consola muestra `Acción desconocida: …`.

## API del banco (`BANCO`)

| Función | Uso |
|---|---|
| `lista()` | Rosas con etiqueta de consenso: `[{id, label, dificil}]` |
| `conteos()` / `porcentajes()` | Cantidad o porcentaje de `INM`, `OPT`, `PAS` |
| `refrescarOpcion()` | Habilita o deshabilita el escenario "Banco de la finca" |
| `refrescarInicio()` | Actualiza el estado del banco en el inicio |
| `htmlResultados(datos)` | HTML con las fotos reales de las rosas de la sesión |
| `irBanco`, `enviarAlBanco`, `calificar`, `exportarExcel`, `exportarDataset`, … | Acciones de los botones |

## Juego (`main.js`)

| Sección | Qué hace |
|---|---|
| Parámetros del cultivo | Medidas y umbrales. Ver [Parámetros del cultivo](parametros-del-cultivo.md) |
| Geometría | Pétalos, sépalos y hojas como láminas curvas. La cabeza floral se genera según la apertura `t` (0 a 1) y se guarda en caché |
| `construirCultivo(cfg, ar)` | Arma la cama: suelo, invernadero (solo fuera de AR), tallos instanciados, rosas y zonas de corte. Usa un generador pseudoaleatorio con semilla (`mulberry32`) para que el código de cama sea reproducible |
| Sesión | `prepararSesion`, `iniciarPC`, `iniciarAR` (Quest/Android), `iniciarVR` (Quest, invernadero virtual), `iniciarCamara` (iPhone) |
| `cortar(sel)` | Clasifica el corte (correcto, prematuro, tardío, tallo corto) y guarda la decisión |
| `finalizar()` / `mostrarResultados()` | Calcula métricas, guarda el historial y muestra la evaluación |
| `window.__rl` | Acceso para pruebas automáticas: `camera`, `mundo`, `flores`, `apuntar`, `cortar`, `finalizar` |

## Datos guardados en el navegador

| Clave de `localStorage` | Contenido | Límite |
|---|---|---|
| `roselab_historial` | Resultados de cada sesión | 200 sesiones |
| `roselab_banco_v3` | Banco: rosas, calificadores, perfiles, calificaciones | Lo que permita el navegador (unos 5 MB) |

Nada se envía a un servidor.
