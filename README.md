This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This project uses **pnpm** as its package manager (see `packageManager` in `package.json`). Node.js >= 20.9 is required.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Other useful scripts:

```bash
pnpm build      # production build
pnpm start      # run the production build
pnpm lint       # ESLint
pnpm typecheck  # TypeScript without emitting
```

## Modo sitio en construcción

Por defecto, `/` muestra la página de construcción (`components/UnderConstruction.tsx`), tanto en local como en producción.

```bash
pnpm dev                         # página de construcción
SITE_MODE=live pnpm dev          # ver el sitio completo en local
SITE_MODE=live pnpm build        # publicar el sitio completo en producción
```

Los casos de estudio en `/work/[slug]` siguen disponibles en ambos modos. El modo se resuelve en build time, así que cambiarlo en Vercel requiere un nuevo deploy: define `SITE_MODE=live` en las variables de entorno de Production cuando quieras publicar el sitio completo.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to load Manrope and JetBrains Mono.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
