# Preguntas frecuentes

← [Cómo contribuir](contribuir.md) · [Inicio](README.md)

### Abro `index.html` con doble clic y no pasa nada (los botones no responden)
Los módulos de JavaScript no cargan desde `file://`. Usa un servidor local (`python3 -m http.server 8000`) o la versión publicada. Ver [Instalación](instalacion-y-despliegue.md).

### Los botones "Entrar en AR" o "Entrar en VR" están deshabilitados
- La página debe abrirse por **HTTPS** (GitHub Pages) o desde `localhost`.
- En Quest 3 usa el navegador de las gafas; en Android, Chrome con ARCore.
- En iPhone/iPad no hay WebXR: usa **Usar la cámara del dispositivo**.
- **Entrar en VR** solo aparece en gafas (Quest 3). En celular o tableta se ofrece AR o la cámara.

### ¿AR o VR?
- **AR:** ves tu espacio real con la cama de rosas encima. Es lo más parecido a estar en el invernadero, pero necesitas unos 3 × 2,5 m libres.
- **VR:** todo es virtual, incluido el invernadero. Sirve cuando no hay espacio libre o hay mucha gente alrededor, porque te mueves con las palancas.

### En el celular no se mueve la vista
En iPhone/iPad hay que **permitir el acceso al movimiento** cuando el navegador lo pida. Si no aparece el permiso, arrastra el dedo por la pantalla para mirar.

### La cama quedó mal ubicada en AR
Usa **Grip** en las Quest o **⟳ Recolocar** en el celular para ponerla de nuevo frente a ti.

### No aparece el escenario "Banco de la finca"
Se habilita cuando el banco tiene rosas con etiqueta. Entra a **B · Banco de rosas** y toca **Cargar dataset de la finca**.

### Se perdió el historial o el banco
Ambos se guardan en el navegador del equipo. Se pierden si se borran los datos del sitio, si se usa ventana privada o si se cambia de navegador o de equipo. Descarguen el **CSV del historial** y el **Excel del banco** con frecuencia.

### Dos aprendices tuvieron camas distintas
Para que la cama sea idéntica deben coincidir el **código de cama**, el escenario, la longitud, la densidad y las proporciones.

### La página se ve sin estilos o sin el modelo 3D
Three.js y la fuente se descargan de internet. Revisa la conexión y recarga sin caché (`Ctrl + Shift + R`).

### Quiero cambiar las medidas de la cama o los criterios de madurez
Ver [Parámetros del cultivo](parametros-del-cultivo.md).
