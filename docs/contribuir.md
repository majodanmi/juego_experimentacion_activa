# Cómo contribuir

← [Máquina del tiempo y plan de corte](maquina-del-tiempo-y-plan-de-corte.md) · [Inicio](README.md) · Siguiente: [Preguntas frecuentes](preguntas-frecuentes.md) →

## Flujo de trabajo

1. **Actualiza `main`** antes de empezar:
   ```bash
   git checkout main
   git pull
   ```
2. **Crea una rama** con un nombre corto:
   ```bash
   git checkout -b nombre-del-cambio
   ```
3. Haz los cambios y **pruébalos** con un servidor local (ver [Instalación](instalacion-y-despliegue.md)).
4. **Guarda y sube** la rama:
   ```bash
   git add .
   git commit -m "Describe qué cambia y por qué"
   git push -u origin nombre-del-cambio
   ```
5. En GitHub, abre un **pull request** hacia `main`, con una descripción de lo que cambia y cómo probarlo.
6. Otra persona del equipo lo revisa y hace **Merge**.

> No trabajen directamente en `main`: GitHub Pages publica lo que esté ahí.

## Convenciones del código

### HTML
- Sin `onclick` ni otros eventos en línea: usa `data-accion` (ver [Arquitectura](arquitectura.md#botones-data-accion)).
- Sin `style="…"` para estilos fijos: usa una clase en el CSS. Solo se acepta `style` cuando el JavaScript lo cambia (por ejemplo, `display:none` inicial).

### CSS
- Colores con las variables de `:root` (`--g-osc`, `--coral`, …), no con códigos sueltos.
- Estilos generales en `styles.css`; los de una sección grande, en su propio archivo (como `banco.css`).

### JavaScript
- Módulos ES (`import` / `export`). Cada archivo con una responsabilidad.
- Nombres en español, como el resto del código (`cortar`, `flores`, `calificar`).
- Las constantes que dependen de la finca van en **PARÁMETROS DEL CULTIVO** de `main.js`.
- Escapa con `esc()` cualquier texto escrito por usuarios antes de meterlo en `innerHTML`.

### Imágenes y datos
- Imágenes como archivos en `assets/`, no en base64 dentro del código.
- Las rosas nuevas del dataset: el recorte en `assets/finca/rosas/<id>.jpg` y la entrada en `js/banco/datos-finca.js`.

## Antes de pedir revisión

- [ ] Funciona en el computador con un servidor local.
- [ ] La consola del navegador (F12) no muestra errores nuevos.
- [ ] Si tocaste el juego: probaste una sesión completa hasta la evaluación.
- [ ] Si tocaste el banco: probaste calificar y exportar.
- [ ] Si cambiaste la estructura o el uso: actualizaste esta wiki.
