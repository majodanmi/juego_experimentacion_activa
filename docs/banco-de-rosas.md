# Banco de rosas y recorrido del robot

← [Guía del formador](guia-del-formador.md) · [Inicio](README.md) · Siguiente: [Instalación y despliegue](instalacion-y-despliegue.md) →

## A · Recorrido del robot

Simulación de un robot cuadrúpedo que avanza por el pasillo con la cámara a la altura del trabajador, mirando las rosas desde abajo.

- Muestra el **mapa** de la nave (camas 41 y 42), la **cámara del robot** con los recuadros de cada rosa detectada, los **recortes** y una **bitácora** con hora, posición y número de rosas.
- Botones: **Iniciar / Pausar**, **Saltar animación**, **Reiniciar** y, al terminar, **Enviar al banco de rosas**.
- Las fotos y recuadros son **reales**: son las rosas que la empresa marcó en sus fotos de la cama (8 fotos en el recorrido, 56 fotos y 73 rosas en el dataset completo).

> Es una **propuesta**. En la versión real, un detector de objetos entrenado con el dataset público **RoseBlooming** (Universidad de Kioto: 519 fotos de invernadero, más de 7.000 rosas marcadas) y ajustado con las calificaciones de los expertos de la finca encontraría las rosas.

## B · Banco de rosas

### Cargar el banco

- **Cargar dataset de la finca** (o *Enviar al banco* desde el recorrido): agrega las 73 rosas con las etiquetas del **Experto de la finca**.
- **+ Foto de una rosa (jurado):** agrega una foto tomada con el celular. Se reduce a 400 px y queda pendiente de calificar.

### Calificar

1. Escribe el **nombre** de quien califica, su **rol** y, si quieres, sus **años de experiencia**.
2. Elige **cuántas rosas**: 15 (muestra), 30 o todas.
3. Califica cada foto: **Inmadura**, **Óptima** o **Sobreabierta**. También puedes marcar **Tengo dudas** o **descartar** si la foto no se ve bien.

Teclas: `1` inmadura · `2` óptima · `3` sobreabierta · `0` descartar · `D` marcar duda.

- **Modo entrenamiento:** después de cada respuesta muestra lo que dijo la finca.
- **Muestra equilibrada:** las muestras de 15 o 30 incluyen inmaduras, óptimas, hasta 2 sobreabiertas y cerca de un 13 % de casos difíciles. Cada persona recibe un orden distinto pero estable.
- Si alguien no termina, aparece el botón **Continuar** junto a su nombre.

### Consenso y casos difíciles

- **Etiqueta final de una rosa:** la de la finca. Si la finca no la etiquetó, la del primer calificador.
- **Caso difícil:** la empresa la marcó como difícil, **o** quienes la calificaron no están de acuerdo.
- **Coincidencia con la finca:** porcentaje de rosas en que cada persona dio la misma etiqueta que la empresa, más el **κ de Cohen** (acuerdo corregido por azar; se calcula con al menos 5 rosas en común).

| κ | Lectura habitual |
|---|---|
| < 0,20 | Acuerdo pobre |
| 0,21 – 0,40 | Débil |
| 0,41 – 0,60 | Moderado |
| 0,61 – 0,80 | Bueno |
| > 0,80 | Muy bueno |

### Enviar a Rose Lab

**Enviar a Rose Lab →** abre la configuración con el escenario **Banco de la finca**. Las rosas marcadas como difíciles se generan con una madurez cercana al límite entre categorías.

## Exportaciones

### Excel (`roselab_banco_<fecha>.xlsx`)

Tres hojas: **rosas**, **calificaciones** y **resumen**.

**Hoja `rosas`** (una fila por rosa):

| Columna | Significado |
|---|---|
| `rosa_id` | Identificador de la rosa |
| `imagen` | Ruta de la foto dentro del dataset (`imagenes/<id>.jpg`) |
| `foto_original` | Número de la foto de la cama de donde sale el recorte |
| `origen` | Dataset de la finca o foto nueva |
| `etiqueta_finca` | Etiqueta de la empresa (`INM`, `OPT`, `PAS`); vacía si no la etiquetó |
| `votos_INM`, `votos_OPT`, `votos_PAS` | Cuántas personas eligieron cada categoría (incluida la finca) |
| `etiqueta_final` | Etiqueta para entrenar modelos (ver consenso) |
| `cortar` | `1` si la etiqueta final es `OPT`; variable objetivo binaria |
| `acuerdo` | Proporción de votos de la etiqueta más votada (1 = todos coinciden) |
| `caso_dificil` | `1` si es caso difícil |
| `particion` | `entrenamiento` o `prueba` (80 / 20). Las rosas de una misma foto quedan siempre juntas |

**Hoja `calificaciones`** (una fila por calificación, sin nombres): `rosa_id`, `calificador` (código anónimo), `rol`, `experiencia_anios`, `etiqueta`, `coincide_con_finca`, `dudas`, `segundos`, `fecha_hora`.

### Dataset para modelos (`roselab_dataset_<fecha>.zip`)

```
rosas.csv            misma tabla que la hoja "rosas"
calificaciones.csv   misma tabla que la hoja "calificaciones"
LEEME.txt            cómo usar el dataset, con un ejemplo en Python
imagenes/<id>.jpg    una foto por rosa
```

### Privacidad

Los **nombres** solo se ven en la pantalla del banco. En las exportaciones cada persona aparece con un **código anónimo** (`C01`, `C02`…), su rol y su experiencia.

## Dónde se guarda

Todo el banco vive en el `localStorage` del navegador (clave `roselab_banco_v3`). **Reiniciar banco** lo borra por completo. Para conservarlo o pasarlo a otro equipo, exporten el Excel o el dataset.
