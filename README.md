# ROSE LAB AR

**Ficha técnica · Sabana Hack 2026, reto "Corte de rosas"**

| | |
|---|---|
| **Probar en línea** | [ROSE LAB AR](https://majodanmi.github.io/juego_experimentacion_activa/) · [El viaje de una rosa (fase 1)](https://majodanmi.github.io/juego_experimentacion_activa/viaje-de-una-rosa/index.html) · [Máquina del tiempo](https://majodanmi.github.io/juego_experimentacion_activa/maquina-del-tiempo/) · [Plan de corte](https://majodanmi.github.io/juego_experimentacion_activa/plan-de-corte/) |
| **Documentación** | [Wiki del proyecto](docs/README.md) |
| **Variedad** | Rosa roja Freedom (exportación) |

## Descripción breve

**Problema.** En la finca, cortar una rosa antes o después de su punto es la falla más común: la flor no abre en destino o llega maltratada, y se pierde valor de exportación. Hoy el punto de corte se aprende en el cultivo, con un formador al lado, gastando flores reales y sin una forma objetiva de medir el progreso del aprendiz.

**Solución.** Una plataforma web de capacitación que sigue el ciclo de aprendizaje experiencial:

1. **Fase 1, El viaje de una rosa:** un juego narrativo en el que el aprendiz corta una rosa, la acompaña hasta la floristería en Miami y ve la consecuencia de su decisión. Así aprende los tres rasgos del punto de corte: color, forma y tamaño.
2. **A, recorrido del robot:** se simula un robot que fotografía las rosas desde abajo, como las ve el trabajador.
3. **B, banco de rosas:** personas con experiencia califican esas fotos como inmadura, óptima o sobreabierta. La plataforma mide su acuerdo con el experto de la finca.
4. **C, entrenamiento:** el aprendiz corta rosas en una cama 3D, en realidad aumentada o en realidad virtual, y recibe una evaluación objetiva.
5. **Complementos:** la **máquina del tiempo** muestra cómo evoluciona una rosa día a día, y el **plan de corte** propone a qué cama ir primero con una ruta óptima (ambos ilustrativos).

## Nivel de desarrollo

**Prototipo funcional, publicado en GitHub Pages.** Esto es lo que está implementado:

- **El viaje de una rosa:** 6 capítulos con diálogos y 6 retos de dificultad creciente. Incluye una lupa para girar, acercar y medir la rosa. Tiene pétalos, niveles e insignias, un cuaderno del aprendiz y un resumen para el formador que se descarga en JSON.
- **Recorrido del robot (A):** una simulación sobre 8 fotos reales de la finca, con las rosas detectadas marcadas en cada foto.
- **Banco de rosas (B):** trae 73 rosas reales con la etiqueta de la empresa. Varias personas pueden calificarlas, con modo de entrenamiento. Calcula el consenso y el acuerdo (kappa de Cohen), y exporta a Excel (.xlsx) y a un dataset .zip con las fotos.
- **Entrenamiento (C):** una cama de rosas 3D con escenarios de dificultad, entre ellos "Banco de la finca", que usa las rosas ya calificadas. Muestra una guía de la zona de corte y evalúa por categoría y por largo del tallo. Los resultados se exportan a CSV.
- **Máquina del tiempo y plan de corte:** la rosa 3D día a día con el modo "¿Cuántos días le faltan?", y un plan por probabilidades con ruta óptima exacta (Held-Karp), simulación de tres estrategias y verificación de cálculos.
- **Dispositivos:** en Meta Quest 3, el aprendiz elige entre AR (la cama en su propio espacio) y VR (un invernadero virtual que recorre con las palancas). También hay AR en Android (WebXR), cámara y giroscopio en iPhone/iPad, y vista previa 3D en el computador.

## Ventajas

1. **Práctica sin gastar flores:** el aprendiz se equivoca y repite sin cortar rosas reales.
2. **Criterios de la propia finca:** usa fotos reales del cultivo y las etiquetas de la empresa, en lugar de ejemplos genéricos.
3. **Medición objetiva:** cada sesión deja datos comparables entre aprendices y entre calificadores (aciertos, tiempos, consenso y kappa), que se exportan para el formador.
4. **Sin instalación:** corre en el navegador de gafas, celular o computador. Además, el banco genera un dataset etiquetado que sirve para entrenar modelos de visión.

## Desventajas y limitaciones

1. **El robot es simulado:** el recorrido usa fotos ya tomadas. Todavía no hay hardware ni un detector automático de rosas.
2. **Alcance de datos reducido:** cubre una sola variedad (Freedom) y 73 rosas en el banco. Las rosas 3D se generan por código con los colores medidos en las fotos, pero no son fotorrealistas.
3. **Sin servidor:** los datos se guardan en el navegador de cada dispositivo (`localStorage`), sin cuentas ni sincronización. El AR exige HTTPS y un dispositivo compatible.

## Lenguaje de programación

- **JavaScript** (ES modules), **HTML5** y **CSS3**.
- No usa backend ni proceso de compilación (*build*).

## Herramientas, frameworks y servicios

| Tipo | Uso |
|---|---|
| **Three.js 0.160** (desde unpkg) | Escena 3D de la cama de rosas |
| **WebXR Device API** | Realidad aumentada (Meta Quest 3 y Android) y realidad virtual (Meta Quest 3) |
| **Cámara y sensores de movimiento** (`getUserMedia`, `DeviceOrientation`) | Modo AR en iPhone/iPad |
| **SVG y Web Audio API** | Arte y sonido de El viaje de una rosa, generados por código sin imágenes ni audios |
| **localStorage** | Historial de sesiones y calificaciones del banco |
| **CSV, XLSX y ZIP propios** | Exportaciones sin librerías externas |
| **Web Serial API** | Punto de integración preparado para conectar un robot (ESP32/Arduino); no está activo |
| **Google Fonts** (Nunito) | Tipografía del juego narrativo |
| **GitHub y GitHub Pages** | Código, control de versiones y publicación con HTTPS |
| **Meta Quest 3** | Dispositivo de prueba para AR |

## Alcance del prototipo

### Qué funciona hoy

- El ciclo completo de punta a punta: fase 1 → recorrido del robot → banco de rosas → entrenamiento con las rosas reales calificadas.
- Calificación con varias personas en un mismo dispositivo, comparada con el experto de la finca.
- Exportación de resultados: JSON (fase 1), Excel y dataset .zip (banco) y CSV (entrenamiento).
- Uso en Quest 3, Android, iPhone/iPad y computador desde un enlace público.

### Qué queda por fuera

- El robot físico y el detector automático de rosas. Se propone entrenarlo con el dataset público RoseBlooming.
- La conexión real con el ESP32/Arduino. Solo está la plantilla de integración.
- Un servidor con base de datos compartida, cuentas de usuario y un panel del formador con varios aprendices.
- Otras variedades de rosa y más fotos en el banco.
- La validación con aprendices en la finca y la medición del impacto en la calidad del corte.
