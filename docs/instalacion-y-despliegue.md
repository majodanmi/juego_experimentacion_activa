# Instalación y despliegue

← [Banco de rosas](banco-de-rosas.md) · [Inicio](README.md) · Siguiente: [Arquitectura del código](arquitectura.md) →

No hay que instalar dependencias ni compilar: es HTML, CSS y JavaScript. Three.js 0.160 se descarga de unpkg al abrir la página, así que **se necesita internet**.

## Ejecutar en el computador

Los archivos de `js/` son módulos de JavaScript. Por seguridad, el navegador **no los carga** si abres `index.html` con doble clic (`file://`). Hay que servir la carpeta:

```bash
git clone https://github.com/majodanmi/juego_experimentacion_activa.git
cd juego_experimentacion_activa
python3 -m http.server 8000
```

Abre http://localhost:8000. Para detener el servidor: `Ctrl + C`.

> Cualquier servidor estático sirve: la extensión *Live Server* de VS Code o `npx serve`, entre otros.

En el computador funciona la **vista previa** (WASD + ratón). El AR necesita HTTPS (ver abajo).

## Publicar con GitHub Pages

1. En GitHub: **Settings → Pages**.
2. En *Source* elige **Deploy from a branch**, rama **`main`**, carpeta **`/ (root)`**, y guarda.
3. En uno o dos minutos queda en `https://majodanmi.github.io/juego_experimentacion_activa/`.

GitHub Pages usa HTTPS, que es lo que exigen el AR y la VR (WebXR) y la cámara del celular. El archivo vacío `.nojekyll` en la raíz evita que GitHub procese el sitio con Jekyll: se publica tal cual, sin compilar.

## Probar en cada dispositivo

| Dispositivo | Navegador | Modo | Requisito |
|---|---|---|---|
| Meta Quest 3 | Navegador de Meta Quest | AR con passthrough (**Entrar en AR**) o VR en el invernadero virtual (**Entrar en VR**) | HTTPS |
| Android | Chrome | AR con WebXR (**Entrar en AR**) | HTTPS y ARCore |
| iPhone / iPad | Safari o Chrome | Cámara + giroscopio (**Usar la cámara del dispositivo**) | HTTPS y permiso de cámara y movimiento |
| Computador | Chrome, Edge, Firefox, Safari, Brave | Vista previa en 3D | Servidor local o HTTPS |

### Abrir en las Quest 3

1. Publica con GitHub Pages (o usa otro servidor con HTTPS).
2. En las gafas, abre el **navegador** y entra a la dirección.
3. Configura la sesión y elige el modo:
   - **Entrar en AR:** la cama aparece en tu propio espacio. Despeja un espacio de unos 3 × 2,5 m.
   - **Entrar en VR:** recorres la cama dentro de un invernadero virtual. Caminas con la palanca izquierda y giras con la derecha, así que se puede jugar de pie o sentado en poco espacio.

## Actualizar la versión publicada

GitHub Pages publica lo que está en `main`. Cualquier cambio que se una a `main` con un pull request se publica solo en uno o dos minutos. Si no ves el cambio, recarga sin caché (`Ctrl + Shift + R`, o `Cmd + Shift + R` en Mac).
