# Máquina del tiempo y plan de corte

← [Parámetros del cultivo](parametros-del-cultivo.md) · [Inicio](README.md) · Siguiente: [Cómo contribuir](contribuir.md) →

El trabajador decide hoy, pero el efecto del corte se ve días después. La **máquina del tiempo** muestra cómo va a evolucionar la rosa y el **plan de corte** usa esa predicción para decidir a qué cama ir primero.

> Ambas páginas son **ilustrativas**: la finca del plan de corte es simulada y los días de la máquina del tiempo son aproximados. En la versión real, los datos saldrían de las fotos diarias del robot.

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
