# Máquina del tiempo y plan de corte

← [Parámetros del cultivo](parametros-del-cultivo.md) · [Inicio](README.md) · Siguiente: [Cómo contribuir](contribuir.md) →

El trabajador decide hoy, pero el efecto del corte se ve días después. La **máquina del tiempo** muestra cómo va a evolucionar la rosa y el **plan de corte** usa esa predicción para decidir a qué cama ir primero.

> Ambas páginas son **ilustrativas**: la finca del plan de corte es simulada y los días de la máquina del tiempo son aproximados. En la versión real, los datos saldrían de las fotos diarias del robot. Ver [Limitaciones](#limitaciones).

## Máquina del tiempo · [`maquina-del-tiempo/`](../maquina-del-tiempo/index.html)

- Muestra **una rosa 3D vista desde abajo**, como la ve el trabajador en la cama. Usa la misma geometría de la cama de entrenamiento.
- Con el control de días (−6 a +3, donde 0 es el punto óptimo) se ven cambiar los **sépalos, el tamaño, la forma y el color**.
- **Vista en la mano:** la rosa desde arriba, con el caracol; lo que el trabajador solo ve cuando ya cortó.
- **Modo "¿Cuántos días le faltan?":** el aprendiz adivina y luego ve la rosa avanzar hasta su punto.
- Abajo hay **fotos reales de la finca** ordenadas de cerrada a abierta (son rosas distintas, como referencia).

## Plan de corte · [`plan-de-corte/`](../plan-de-corte/index.html)

1. **Predecir cada rosa:** probabilidad de estar óptima hoy, mañana o pasado (distribución normal sobre el día de inicio, con ajuste por cama).
2. **Sumar por cama:** rosas listas esperadas y rosas en su último día óptimo (se pierden si no se cortan hoy).
3. **Armar la mejor ruta:** con las horas del equipo y el tiempo de caminar, la **ruta óptima** prueba todas las combinaciones de camas y órdenes (programación dinámica, método de Held-Karp, problema de orientación) y elige la que corta más rosas valiosas.

Compara tres estrategias durante 21 días (una floración completa de cada cama): **orden fijo**, **plan simple** (urgentes primero y luego barrido por nave) y **plan con ruta óptima**. La sección *Ver cómo se calcula* trae las fórmulas, un ejemplo por cama, una prueba de calibración y un CSV para verificar en Excel.

**El trabajador sigue decidiendo qué rosa cortar**; el plan solo le dice dónde está el trabajo.

### Supuestos principales (todos por calibrar en la finca)

| Supuesto | Valor en la demo |
|---|---|
| Ventana óptima | 3 días por rosa |
| Tiempo por cama | 6 min de recorrido + 16 s por tallo (220 tallos por hora) |
| Caminar | 0,5 min por cama de distancia, 6 min por cambio de nave, 2 min desde la entrada |
| Revisión de seguridad | Una cama con 2 días sin visita suma el valor de 8 rosas |
| Periodo simulado | 21 días |

## Limitaciones

Estas páginas muestran **la lógica** del plan, no resultados de la finca. Antes de usarlas para decidir hay que tener en cuenta lo siguiente:

### La ruta óptima no escala a una finca completa
La ruta exacta (Held-Karp) revisa todas las combinaciones de camas, y el trabajo se multiplica por algo más de 2 con cada cama nueva. Medido en un computador Mac (puede variar según el equipo):

| Camas con trabajo | Tiempo | Memoria |
|---|---|---|
| 12 (la demo) | menos de 10 ms | menos de 1 MB |
| 16 | unos 30 ms | unos 9 MB |
| 18 | unos 150 ms | unos 40 MB |
| 20 | casi 1 s | unos 190 MB |
| 22 | más de 3 s | unos 830 MB (un celular cierra la página) |

Una finca real tiene cientos de camas. Para usarla allí habría que calcular la ruta **por nave o por grupo de camas cercanas**, o cambiar a un método aproximado (por ejemplo, el vecino más cercano con mejoras locales), que no garantiza la mejor ruta pero responde al instante.

### La calibración comprueba el cálculo, no el modelo
La prueba de *Ver cómo se calcula* compara las rosas esperadas con las "reales", pero las reales salen **de la misma finca simulada** que usa el modelo. Por eso solo demuestra que las fórmulas están bien programadas. Para saber si el modelo acierta en la finca se necesitan:

- fotos diarias del robot de **las mismas rosas**, con el día en que cada una estuvo óptima marcado por el experto;
- comparar las rosas esperadas con las que de verdad se cortaron en punto, cama por cama.

Además, en la demo cada rosa tiene **una sola predicción** desde el primer día. En la versión real la predicción se actualizaría cada día con la foto nueva, y la precisión (σ) tendría que medirse en vez de elegirse con el control.

### "Tallos por hora" no se compara con la meta de 220
La meta de 220 tallos por hora es la velocidad de corte de un trabajador con experiencia. En la simulación, el número sale mucho más bajo (unos 40 a 55) por dos razones:

- **Cada cama suma 6 minutos fijos** de recorrido, aunque tenga pocas rosas listas.
- **La finca simulada es pequeña:** 12 camas de 70 a 180 rosas, con días de poco trabajo.

Ese indicador sirve para **comparar las tres estrategias entre sí**, no para compararlo con la productividad real. Para eso habría que calibrar el tiempo por cama, el tamaño de las camas y las horas del equipo con datos de la finca.

### Otros supuestos
- Las camas y las rosas son **ficticias**: 2 naves de 6 camas.
- La ventana óptima es de **3 días** para todas las rosas y no cambia con el clima ni con la variedad.
- En la máquina del tiempo, los **días son aproximados** y las fotos son **rosas distintas** ordenadas por apertura, no la misma rosa día a día.
