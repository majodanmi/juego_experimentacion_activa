# Visión general

[Inicio](README.md) · Siguiente: [Guía del aprendiz](guia-del-aprendiz.md) →

## El problema

En la finca, cortar una rosa **antes de su punto** (inmadura) es la falla más común: la flor no abre bien en destino y se pierde valor de exportación. Hoy se aprende a reconocer el punto de corte en el cultivo, con un formador al lado y sin una forma objetiva de medir el progreso.

## La propuesta

ROSE LAB AR permite practicar el corte **sin dañar flores reales**, con criterios de la propia finca y resultados comparables entre aprendices.

## Ciclo completo (A · B · C)

```
 A · Recorrido del robot      B · Banco de rosas            C · Entrenamiento
 ─────────────────────────    ──────────────────────────    ─────────────────────────────
 Fotografía las rosas desde → Personas califican cada    → El aprendiz corta rosas en una
 abajo, como las ve el        rosa: inmadura, óptima o      cama 3D (AR, celular o PC) y
 trabajador                   sobreabierta. Se compara      recibe una evaluación
                              con el experto de la finca
```

| Etapa | Estado en esta versión |
|---|---|
| **A · Recorrido del robot** | Simulación (propuesta) sobre **fotos reales** de la finca. En la versión real, un detector entrenado con el dataset público RoseBlooming (Universidad de Kioto) encontraría las rosas. |
| **B · Banco de rosas** | Funcional. Incluye 73 rosas reales con las etiquetas de la empresa. |
| **C · Entrenamiento** | Funcional en Quest 3 (AR), celular Android (AR), iPhone/iPad (cámara + giroscopio) y computador (vista previa). |

## Las tres categorías de rosa

| Categoría | Etiqueta | ¿Cortar? | Cómo se ve (criterio de la empresa para Freedom) |
|---|---|---|---|
| Inmadura | `INM` | No | Cabeza más pequeña, rojo más oscuro, sépalos pegados a los pétalos |
| Óptima / en punto | `OPT` | **Sí** | Caracol definido mostrando el centro, color vivo e intenso, patrón de copa, sépalos hacia abajo |
| Sobreabierta | `PAS` | No | Ya pasó el punto de corte: flor abierta, rojo más claro y rosado |

> En el juego la categoría óptima aparece como **"En punto"**, y en el banco como **"Óptima"** (el nombre que usa la empresa). Son la misma categoría.

## Dónde se usa cada parte

- **Aprendiz:** juega la etapa C. Ver [Guía del aprendiz](guia-del-aprendiz.md).
- **Formador:** configura sesiones, revisa resultados y alimenta el banco. Ver [Guía del formador](guia-del-formador.md).
- **Equipo de datos:** exporta las calificaciones para entrenar modelos. Ver [Banco de rosas](banco-de-rosas.md).
