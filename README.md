# BerichBusiness

Catálogo estático de microproductos digitales (prompt packs, plantillas, kits descargables) vendidos a través de Hotmart.

## Cómo ver el sitio en tu computadora

```bash
npm install
npm run dev
```

Abrí [http://localhost:4321](http://localhost:4321) en el navegador.

## Cómo agregar un producto nuevo

1. Abrí `src/data/products.json`
2. Copiá el bloque de un producto existente
3. Cambiá los campos:

| Campo | Qué es |
|-------|--------|
| `slug` | Parte final de la URL (sin espacios, minúsculas, con guiones) |
| `nombre` | Nombre visible del producto |
| `precio` | Precio como texto (ej: `"14,90"`) |
| `moneda` | Ej: `"USD"` |
| `categoria` | Debe coincidir con un `slug` de `src/data/categories.json` |
| `problema` | Dolor principal — subtítulo del hero |
| `agitacion` | 2–3 líneas que amplían el problema (sección Agitación) |
| `incluye` | Lista de objetos `{ "nombre", "detalle" }` |
| `paraQuien` | Público ideal |
| `imagen` | Ruta en `public/` o `null` para portada navy/coral automática |
| `ctaTexto` | Texto del botón con contexto (ej: `"Conseguir el pack"`) |
| `hotmartUrl` | Link de pago de Hotmart (o `"PENDIENTE"` si aún no está) |

4. Subí la imagen a `public/images/products/`
5. Guardá, commit y push — el sitio se actualiza solo en Vercel

### Ejemplo de URL

Si `categoria` es `agencias-de-marketing` y `slug` es `pack-agencias-marketing`, la página queda en:

```
/agencias-de-marketing/pack-agencias-marketing
```

## Cómo editar las secciones del catálogo

Las categorías están en `src/data/categories.json`. El orden del array es el orden en la home.

## Comandos útiles

| Comando | Para qué sirve |
|---------|----------------|
| `npm run dev` | Ver el sitio en local mientras editás |
| `npm run build` | Generar la versión final (HTML estático) |
| `npm run preview` | Ver la versión final en local |

## Deploy en Vercel (gratis)

1. Subí este repo a GitHub
2. Entrá a [vercel.com](https://vercel.com) y conectá el repositorio
3. Vercel detecta Astro automáticamente
4. Cada push a `main` actualiza el sitio

## Estructura del proyecto

```
src/
  data/
    categories.json    ← secciones del catálogo
    products.json      ← productos (editá acá)
  pages/
    index.astro        ← home / catálogo
    [categoria]/
      [slug].astro     ← página de cada producto
  components/          ← piezas reutilizables de diseño
  layouts/             ← estructura común (header, footer)
  styles/
    global.css         ← colores y tipografía
public/
  images/products/     ← imágenes de productos
```

## Paleta de colores

- Azul marino: `#1B2A4A`
- Coral: `#D6672E`
