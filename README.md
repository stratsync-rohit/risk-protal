# Risk Analysis Portal

React 19 risk-monitoring portal built with TanStack Start, TanStack Router,
TanStack Query, Zustand, Firebase and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
```

## Project structure

```text
risk-protal/
├── index.html             # HTML template/reference
├── public/                # Static files served from /
├── src/
│   ├── components/        # Reusable feature and UI components
│   │   └── ui/            # Shared design-system primitives
│   ├── hooks/             # Reusable React hooks
│   ├── layouts/           # App and authenticated route shells
│   ├── lib/               # Stores, API clients, types and utilities
│   ├── pages/             # Complete screen-level components
│   ├── routes/            # TanStack file routes and route metadata
│   ├── router.tsx         # Router and Query Client setup
│   ├── routeTree.gen.ts   # Auto-generated route tree; do not edit
│   ├── server.ts          # SSR server entry and error handling
│   ├── start.ts           # TanStack Start middleware setup
│   └── styles.css         # Global styles and Tailwind theme
├── package.json
├── tsconfig.json
└── vite.config.ts
```

TanStack Start renders the real document shell from
`src/layouts/AppLayout.tsx`. Unlike a client-only Vite SPA, it injects the
client scripts during SSR, so no manual `main.tsx` bootstrap is needed.
