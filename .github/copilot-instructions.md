# Copilot Instructions for StarWars

- This is an Angular 21 standalone application with server-side rendering enabled.
- `src/main.ts` bootstraps the browser app using `bootstrapApplication(App, appConfig)`.
- `src/main.server.ts` bootstraps SSR using `bootstrapApplication(App, config, context)`.
- `src/app/app.config.ts` defines browser providers and router setup.
- `src/app/app.config.server.ts` merges browser config with SSR providers from `@angular/ssr`.
- `src/app/app.routes.ts` is the client route list; it is currently empty.
- `src/app/app.routes.server.ts` defines server rendering behavior; it currently uses a wildcard `**` with `RenderMode.Prerender`.
- `src/server.ts` is the Express SSR server and the entrypoint for `npm run serve:ssr:star-wars` once the app is built.

## Commands

- `npm start` or `ng serve` -> development server
- `npm run build` -> production build with browser + SSR outputs
- `npm test` or `ng test` -> run unit tests via Vitest
- `npm run serve:ssr:star-wars` -> run built SSR server from `dist/star-wars/server/server.mjs`

## Key patterns

- Standalone components are used; components import dependencies directly instead of using NgModules.
- Root component template is in `src/app/app.html` and contains placeholder markup plus `<router-outlet />`.
- `provideClientHydration(withEventReplay())` is enabled in browser config for hydration support.
- Server config uses `provideServerRendering(withRoutes(serverRoutes))` for SSR route control.
- Static assets come from `public/` and are included by `angular.json`.

## Notes for contributors

- There is no dedicated e2e setup configured despite the README mentioning `ng e2e`.
- The current app has no client routes defined, so adding new pages requires updating both `src/app/app.routes.ts` and likely `src/app/app.routes.server.ts` for SSR behavior.
- `src/server.ts` exports `reqHandler` for integration with host platforms, but the primary SSR runtime is the local Express server.
- `src/app/app.spec.ts` is scaffolded and may need updates to match actual template content.

## What to avoid

- Do not assume NgModule-based architecture; this project is built with Angular standalone components.
- Do not change SSR wiring without checking both `app.config.server.ts` and `src/server.ts`.
- Do not assume `ng e2e` works out of the box.
