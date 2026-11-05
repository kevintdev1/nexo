# Nexo

Panel de administración (back-office) para gestionar usuarios, estudiantes e instituciones. Base para los próximos módulos de inventario y cuentas.

## 🛠 Tecnologías

| Área           | Herramienta                                          |
| -------------- | ---------------------------------------------------- |
| UI             | React 19, Tailwind CSS 4 (design tokens en `@theme`) |
| Lenguaje       | TypeScript 7 (`strict`)                              |
| Build          | Vite 8 (Rolldown)                                    |
| Rutas          | React Router                                         |
| Datos          | TanStack Query + Axios                               |
| Formularios    | React Hook Form + Zod 4                              |
| Notificaciones | Sonner                                               |
| Calidad        | Biome (lint + formato), Vitest + Testing Library     |
| Paquetes       | pnpm                                                 |

## 📁 Arquitectura

Organizada por **features** (cortes verticales del negocio) y, dentro de cada una, por **capas**.

```text
src/
├── app/                      # Composición: providers, rutas, páginas y composition root
│   ├── composition.ts        # Único sitio donde se eligen las implementaciones (DI)
│   ├── layouts/
│   └── pages/                # Juntan features; ninguna feature importa de otra
├── features/<feature>/
│   ├── components/           # Vista: solo pinta
│   ├── hooks/                # Estado, queries, mutaciones, toasts
│   ├── services/             # Casos de uso; dependen del puerto, no de HTTP
│   ├── repositories/         # Implementación HTTP del puerto; DTO ↔ modelo
│   ├── domain/               # Modelos, puertos y errores (TypeScript puro)
│   ├── schemas/              # Esquemas Zod + tipos inferidos
│   ├── filters/              # Configuración de filtros del listado
│   └── constants/            # Query keys, etiquetas, textos
├── shared/                   # Genérico y usado por dos o más features
│   ├── components/ui/        # Design system (sin conocimiento de negocio)
│   ├── filters/              # Tipos de filtro extensibles (enum, tri-state)
│   ├── hooks/
│   ├── utils/
│   └── validations/          # Campos Zod reutilizables
├── lib/                      # Cliente HTTP y variables de entorno validadas
└── test/                     # Setup y helpers de pruebas
```

Flujo de dependencias:

```text
components → hooks → services → domain (puerto) ← repositories → lib/api
```

### Principios

- **S**: un archivo, una responsabilidad. Vista, lógica (hook), casos de uso (service) y acceso a datos (repository) separados.
- **O**: variantes por mapa (`VARIANTS[variant]`) y filtros como estrategias: un tipo de filtro nuevo es un archivo nuevo, sin editar los existentes.
- **L**: cada repository cumple el contrato completo de su puerto; los tests usan fakes en memoria del mismo puerto.
- **I**: componentes con props estrechas; `ui/` nunca recibe modelos de negocio.
- **D**: los services reciben el puerto por constructor; la implementación se elige en `app/composition.ts` y llega por Context.

## 🚀 Configuración local

Requisitos: **Node.js ≥ 20.19** y **pnpm**.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Variable       | Descripción                    |
| -------------- | ------------------------------ |
| `VITE_API_URL` | URL base de la API del backend |

## 📜 Scripts

| Script                        | Qué hace                        |
| ----------------------------- | ------------------------------- |
| `pnpm dev`                    | Servidor de desarrollo          |
| `pnpm build`                  | Typecheck + build de producción |
| `pnpm typecheck`              | Comprobación de tipos           |
| `pnpm test`                   | Tests (Vitest)                  |
| `pnpm lint` / `pnpm lint:fix` | Lint y formato con Biome        |

## ⚙️ VS Code

```json
{
	"editor.defaultFormatter": "biomejs.biome",
	"editor.formatOnSave": true,
	"editor.codeActionsOnSave": {
		"source.organizeImports.biome": "always",
		"source.fixAll.biome": "always"
	}
}
```

Extensiones recomendadas: `biomejs.biome`, `bradlc.vscode-tailwindcss`.
