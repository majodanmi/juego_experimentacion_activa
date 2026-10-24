# Guía del formador

← [Guía del aprendiz](guia-del-aprendiz.md) · [Inicio](README.md) · Siguiente: [Banco de rosas](banco-de-rosas.md) →

Todo se configura **antes** de entrar. Durante la simulación no aparecen preguntas ni menús.

## 1 · Aprendiz

| Campo | Para qué sirve |
|---|---|
| Nombre | Aparece en la evaluación y en el historial (si se deja vacío: "Aprendiz") |
| Altura de ojos en computador | Solo para la vista previa en PC (entre 1,30 y 1,90 m; por defecto 1,55 m) |
| Modo | **Práctica guiada:** el sistema responde después de cada corte. **Evaluación:** sin ayudas; el resultado se ve al final |

## 2 · Escenario

| Escenario | Proporción inmaduras / en punto / sobreabiertas | Cuándo usarlo |
|---|---|---|
| Cama estándar | 45 / 40 / 15 % | Mezcla parecida a una cama real |
| Error más común | 55 / 45 / 0 % | Entrenar la diferencia **inmadura vs. en punto**, con rosas cerca del límite |
| Casos difíciles | 40 / 40 / 20 % | Follaje, contraluz, rosas más bajas y madurez cerca de los límites |
| Personalizado | La que definas con los deslizadores | Ejercicios específicos. Mover cualquier deslizador cambia a este escenario |
| Banco de la finca | La de las rosas reales calificadas | Cada rosa virtual corresponde a una rosa real del [banco](banco-de-rosas.md). Se habilita cuando el banco tiene rosas |

Otros ajustes:

- **Longitud de la cama:** 10, 20 o 30 m.
- **Densidad de flores:** baja, media o alta. Con media, una cama de 20 m tiene 22 rosas por lado (44 en total).
- **Tiempo límite:** sin límite, 3, 5 o 10 min.

### Código de cama

El **mismo código genera exactamente la misma cama** (posición, madurez y altura de cada rosa). Úsenlo para evaluar a varios aprendices **en igualdad de condiciones**. Si se deja vacío al entrar a la configuración, se genera uno aleatorio de 4 caracteres.

### Nombre del punto de corte

Texto libre con el nombre que usa la finca (por ejemplo "Punto 3"). Aparece en las instrucciones y en los mensajes de corte correcto.

## 3 · Ayudas

- **Retroalimentación después de cada corte:** solo en Práctica guiada (en Evaluación se desactiva sola).
- **Mostrar zona de corte en el tallo:** marca en verde el tramo recomendado del tallo, entre 40 y 60 cm por debajo de la cabeza.

## Cómo leer la evaluación

### Métricas principales

| Métrica | Cómo se calcula | Meta |
|---|---|---|
| **Conformidad del corte** | Cortes correctos ÷ total de cortes | **88 %** |
| **Aprovechamiento** | Cortes correctos ÷ rosas en punto en el tramo recorrido | — |
| **Ritmo** | Cortes por hora | 220 tallos/hora en campo (en simulación es solo una referencia) |
| **Recorrido** | Porcentaje de la cama que se alcanzó a recorrer | — |

### Detalle de decisiones

| Resultado | Significado |
|---|---|
| Corte correcto | Rosa en punto con tallo ≥ 40 cm |
| Corte prematuro | Rosa inmadura (la falla más común) |
| Corte tardío | Rosa sobreabierta |
| Tallo corto | Rosa en punto cortada con menos de 40 cm |
| Flor omitida | Rosa en punto que quedó en la planta, dentro del tramo recorrido |

En el escenario **Banco de la finca** se muestra además *"Así se veían en la finca las rosas de esta sesión"*: la foto real de cada rosa que cortaste (o que debías cortar) con la etiqueta de la empresa.

### Historial

Cada sesión queda guardada en **ese navegador** (hasta 200 sesiones). Con **Descargar historial (CSV)** se exportan todas para analizarlas en Excel.

> El historial no se comparte entre dispositivos. Si los aprendices usan equipos distintos, descarguen el CSV de cada uno.

### En las gafas

Al finalizar dentro del visor aparece un panel con el resumen. Presiona el gatillo para salir y ver el detalle completo.
