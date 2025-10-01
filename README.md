# 🐸 Guía de Especies de Ranas del Mundo

Una aplicación web interactiva construida con Next.js que presenta información sobre especies de ranas organizadas en acordeones anidados. La aplicación permite explorar la diversidad de anfibios de manera intuitiva y educativa.

## ✨ Características

- **Acordeones Anidados**: Organización jerárquica de información (Órdenes → Familias → Especies)
- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio
- **Animaciones Suaves**: Transiciones fluidas y efectos hover atractivos
- **Información Detallada**: Datos completos sobre hábitat, dieta, tamaño y estado de conservación
- **Imágenes**: Fotos de especies cuando están disponibles
- **TypeScript**: Código tipado para mayor robustez
- **Tailwind CSS**: Estilos modernos y consistentes

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18.0 o superior
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd nested-accordion
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales y animaciones
│   ├── layout.tsx           # Layout principal de la aplicación
│   └── page.tsx             # Página principal
├── components/
│   ├── FrogAccordion.tsx    # Componente principal de acordeón para ranas
│   └── NestedAccordion.tsx  # Componente genérico de acordeón anidado
└── data/
    └── frogsData.ts         # Datos de especies de ranas
```

## 🏗️ Arquitectura

### Componentes

#### `FrogAccordion`
Componente especializado que renderiza la información de ranas en acordeones anidados:
- **Órdenes**: Nivel superior (ej: Anura, Gymnophiona)
- **Familias**: Nivel intermedio (ej: Bufonidae, Hylidae)
- **Especies**: Nivel inferior con información detallada

#### `NestedAccordion`
Componente genérico reutilizable para crear acordeones anidados con cualquier tipo de datos.

### Datos

La estructura de datos está definida en `frogsData.ts` con las siguientes interfaces:

```typescript
interface FrogSpecies {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  size: string;
  diet: string;
  conservationStatus: string;
  imageUrl?: string;
}

interface FrogFamily {
  id: string;
  name: string;
  description: string;
  species: FrogSpecies[];
}

interface FrogOrder {
  id: string;
  name: string;
  description: string;
  families: FrogFamily[];
}
```

## 🎨 Personalización

### Añadir Nuevas Especies

Para añadir nuevas especies, edita el archivo `src/data/frogsData.ts`:

```typescript
// Añadir nueva especie a una familia existente
{
  id: "nueva-especie",
  name: "Nombre Común",
  scientificName: "Nombre Científico",
  description: "Descripción de la especie...",
  habitat: "Hábitat natural...",
  size: "Tamaño promedio...",
  diet: "Alimentación...",
  conservationStatus: "Estado de conservación...",
  imageUrl: "URL_de_imagen_opcional"
}
```

### Modificar Estilos

Los estilos se pueden personalizar en:
- `src/app/globals.css`: Estilos globales y animaciones
- Componentes individuales: Clases de Tailwind CSS

### Añadir Nuevas Categorías

Para añadir nuevos niveles de anidación, modifica las interfaces en `frogsData.ts` y actualiza los componentes correspondientes.

## 🌐 Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de CSS utilitario
- **Heroicons**: Iconos SVG
- **React Hooks**: Gestión de estado local

## 📱 Responsive Design

La aplicación está optimizada para:
- **Móviles**: Layout de una columna, botones táctiles
- **Tablets**: Layout híbrido con mejor aprovechamiento del espacio
- **Escritorio**: Layout completo con múltiples columnas

## 🔧 Desarrollo

### Estructura de Commits

Usa commits semánticos:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Documentación
- `style:` Formato, espacios, etc.
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests

### Linting

El proyecto incluye ESLint configurado para Next.js. Ejecuta `npm run lint` para verificar el código.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en el repositorio.

---

¡Disfruta explorando la increíble diversidad de ranas del mundo! 🐸✨