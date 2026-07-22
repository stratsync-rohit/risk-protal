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

TanStack Start renders the HTML document shell from
`src/layouts/AppLayout.tsx`. Unlike a client-only Vite SPA, this project must
not have a root `index.html` or a manual `main.tsx`: Nitro generates the
renderer and injects the client scripts during SSR.

## Deploy to Vercel

The Nitro preset is pinned to `vercel`, and `npm run build` generates the
Vercel Build Output API bundle in `.vercel/output`.

In Vercel project settings, use this project as the Root Directory and keep the
build command as `npm run build`. Add every `VITE_FIREBASE_*` key and
`VITE_N8N_WEBHOOK_URL` from `.env.example` to the Production and Preview environments, then
redeploy. These values are embedded into the browser bundle at build time. The n8n webhook must
allow requests from the portal's browser origin.
