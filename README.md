# Zapzipstadt

[![Portada ilustrada de Zapzipstadt con los Michien, Yuki en su ovni y el tren eléctrico](./docs/images/zapzipstadt-portada.png)](https://d4viddy.github.io/Zapzipstadt/)

> **Wo die Zukunft grün und die Luft sauber ist.**
>
> Donde el futuro es verde y el aire es limpio.

**[Explorar la ciudad](https://d4viddy.github.io/Zapzipstadt/)** · [Ver las fuentes y los créditos](https://d4viddy.github.io/Zapzipstadt/#quellen)

Zapzipstadt es una ciudad ficticia habitada por los Michien. Esta web, desarrollada como proyecto de un curso de alemán, cuenta su historia y muestra cómo la comunidad incorpora la energía solar, los espacios verdes y el transporte eléctrico a su vida cotidiana.

## Recorre Zapzipstadt

| Sección | Qué encontrarás |
| --- | --- |
| [Startseite](https://d4viddy.github.io/Zapzipstadt/#startseite) | Un planeta con seis Michien animados y un ovni que te lleva de vuelta a la portada. |
| [Geschichte](https://d4viddy.github.io/Zapzipstadt/#geschichte) | Una línea de tiempo interactiva con 12 hitos ilustrados en cuatro períodos, de 2000 a 2026. |
| [Unsere Stadt](https://d4viddy.github.io/Zapzipstadt/#unsere-stadt) | Un mapa isométrico con cinco lugares explorables, estadísticas, una infografía y un comparativo con Copenhague y Singapur que incluye videos Full HD. |
| [Tourismus und Freizeit](https://d4viddy.github.io/Zapzipstadt/#tourismus) | Una publicación de Instagram con corazones animados y Yuki, un Michien al que puedes arrastrar o tocar para descubrir curiosidades en alemán. |
| [Sehenswürdigkeiten](https://d4viddy.github.io/Zapzipstadt/#sehenswuerdigkeiten) | Cuatro lugares turísticos ilustrados con descripciones en alemán. |
| [Quellen](https://d4viddy.github.io/Zapzipstadt/#quellen) | Referencias, créditos audiovisuales, cinco prompts del desarrollo y una reflexión sobre el uso de IA. |

## Desarrollo

La interfaz usa **React**, **Vite** y **CSS**, con **Lenis** para el desplazamiento suave. El mapa, la línea de tiempo y el comparativo admiten navegación con teclado. Varias animaciones y los videos del comparativo respetan la preferencia de movimiento reducido.

### Ejecutar en local

Usa **Node.js 24**, la misma versión que utiliza el flujo de publicación.

```bash
git clone https://github.com/d4vidDy/Zapzipstadt.git
cd Zapzipstadt
npm ci
npm run dev
```

Abre la URL que indique Vite en la terminal.

| Comando | Uso |
| --- | --- |
| `npm run lint` | Revisa el código con Oxlint. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve la compilación local después de ejecutar `npm run build`. |

### Estructura

- [`src/sections/`](./src/sections/) contiene las secciones y los datos de la historia, el mapa y el comparativo.
- [`src/components/`](./src/components/) reúne la navegación, el desplazamiento suave y los componentes de la portada.
- [`src/assets/images/`](./src/assets/images/) guarda las ilustraciones que importa la aplicación.
- [`public/media/`](./public/media/) contiene los videos y las imágenes fijas del comparativo.

## Publicación y créditos

Cada push a `main` ejecuta el flujo de GitHub Actions que instala las dependencias, compila el sitio y publica `dist/` en GitHub Pages. [Ver flujo de publicación](./.github/workflows/deploy-pages.yml)

La portada de este README se generó con IA a partir de los personajes y las ilustraciones del proyecto. La web reúne las fuentes, las herramientas utilizadas y las licencias de los videos. [Consultar Quellen](https://d4viddy.github.io/Zapzipstadt/#quellen)
