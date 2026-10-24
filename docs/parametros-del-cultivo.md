# Parámetros del cultivo

← [Arquitectura del código](arquitectura.md) · [Inicio](README.md) · Siguiente: [Cómo contribuir](contribuir.md) →

Todos están al inicio de [`js/main.js`](../js/main.js), en la sección **PARÁMETROS DEL CULTIVO**. Si la finca da medidas distintas, este es el lugar para ajustarlas.

## Medidas

| Constante | Valor | Significado |
|---|---|---|
| `PASILLO` | 0,70 m | Ancho del camino entre camas |
| `CAMA` | 0,90 m | Ancho de cada cama |
| `ALTO_SETO` | 1,55 m | Altura del follaje |
| `MIN_TALLO` | 0,40 m | Largo mínimo del tallo para que el corte sea válido |
| `ALCANCE` | 1,5 m | Distancia máxima a la que funciona la tijera |

Las cabezas florales se ubican entre 1,85 y 2,20 m de altura (entre 1,55 y 1,72 m para algunas rosas en "Casos difíciles"), por eso el aprendiz las mira desde abajo.

## Madurez

Cada rosa tiene una **apertura `t`** entre 0 (botón cerrado) y 1 (flor abierta):

```
0 ─────────────── 0,42 ───────────────── 0,80 ─────────── 1
     inmadura      │       en punto ✂       │  sobreabierta
              UMBRAL_INM               UMBRAL_PAS
```

La forma cambia mucho hasta el punto, casi nada **dentro** del punto y vuelve a cambiar cuando la flor se pasa, como en la realidad.

## Escenarios

Rango de apertura `t` con que se genera cada tipo de rosa:

| Escenario | % inm / punto / sobre | Inmaduras | En punto | Sobreabiertas |
|---|---|---|---|---|
| Estándar | 45 / 40 / 15 | 0,00 – 0,34 | 0,50 – 0,72 | 0,88 – 1,00 |
| Error más común | 55 / 45 / 0 | 0,22 – 0,39 | 0,46 – 0,68 | 0,86 – 1,00 |
| Casos difíciles | 40 / 40 / 20 | 0,30 – 0,41 | 0,43 – 0,79 | 0,81 – 0,93 |
| Personalizado | deslizadores | 0,00 – 0,36 | 0,48 – 0,74 | 0,86 – 1,00 |
| Banco de la finca | según el banco | 0,00 – 0,34 | 0,50 – 0,72 | 0,88 – 1,00 |
| Banco: rosas difíciles | — | 0,36 – 0,41 | 0,43 – 0,50 | 0,81 – 0,86 |

En el escenario **Banco de la finca**, la categoría de cada rosa virtual la define la **etiqueta real** (no la apertura). Las rosas difíciles se generan cerca de los umbrales.

## Cantidad de rosas

- Rosas por lado = largo de la cama × densidad (baja 0,7 · media 1,1 · alta 1,6 por metro).
- Además hay 0,5 tallos sin flor por metro y por lado.

## Colores

Tonos medidos en las fotos de la finca (cabezas de Freedom: rojo vino, tono ≈ −12°, saturación ≈ 0,6) y aclarados para compensar el contraluz de las fotos:

| Constante | Color | Uso |
|---|---|---|
| `COLOR_INM` | `#752333` | Inmadura: vino opaco, más oscuro |
| `COLOR_OPT` | `#bc1a35` | En punto: rojo vino intenso y saturado |
| `COLOR_PAS` | `#cc5176` | Sobreabierta: más claro, rosado-magenta |
| `VERDE_BOTON` | `#8aa83f` | Toque verde en la base de los pétalos externos del botón cerrado |
| `COLOR_VIEJO` | `#602b38` | Bordes que se oscurecen cuando la flor se pasa |

## Paleta de la interfaz (GHT)

Definida como variables en [`css/styles.css`](../css/styles.css):

| Variable | Color | Uso |
|---|---|---|
| `--g-osc` | `#005333` | Verde oscuro: principal |
| `--g-med` | `#579966` | Verde medio: secundario |
| `--g-int` | `#008B56` | Verde intenso: acentos e interacción |
| `--coral` | `#F04432` | Rojo coral: detalle del logo, alertas |

Las etiquetas del banco (`--et-inm`, `--et-opt`, `--et-pas`) están en [`css/banco.css`](../css/banco.css).
