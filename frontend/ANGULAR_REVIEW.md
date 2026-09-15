## Short conclusion

This is a good foundation for a junior-level project. Several modern Angular choices are already visible: standalone bootstrapping, lazy loading, the new template control flow (`@if` and `@for`), `inject()`, `rxResource`, strict TypeScript settings, and SSR/hydration configuration.

The biggest improvement areas are not that the app is structured “incorrectly”, but that several choices are not yet consistent or type-safe. The detail pages contain a lot of repetition, the service and files have names that do not match their responsibilities, and the tests are no longer fully aligned with the current component API. 

> The request mentioned Angular 22, but this repository uses Angular 21.2.17. The recommendations are aligned with the installed version; the principles also apply to Angular 22.

## What is already going well

- [app.ts](src/app/app.ts) and [main.ts](src/main.ts) use modern standalone bootstrapping without an NgModule as the application foundation.
- [app.routes.ts](src/app/app.routes.ts) uses `loadComponent`. This provides lazy-loaded pages and is appropriate for routes that each represent their own screen.
- The templates use `@if` and `@for` instead of the older `*ngIf` and `*ngFor` syntax. The lists also use `track film.url`, which helps Angular reuse DOM elements efficiently.
- Dependency injection through `inject()` is applied consistently in the components and service.
- [landing.service.ts](src/app/services/landing.service/landing.service.ts) is a singleton through `providedIn: 'root'` and has a clear API role.
- The interfaces in [core/models](src/app/core/models/index.ts) show that the data models were considered deliberately.
- [app.config.ts](src/app/app.config.ts) uses `provideHttpClient(withFetch())`, client hydration, and event replay. These are relevant modern choices for an SSR application.
- [tsconfig.json](tsconfig.json) enables strict type checking and strict Angular templates. This is exactly the right direction for finding type errors early.
- The service uses `HttpErrorResponse` and does not silently discard errors. Error handling still needs refinement, but consciously handling errors is already a good habit.

## 1. Structure and architecture

### Current structure

The current structure is approximately:

```text
src/app/
  components/       screens/page components
  core/models/      API data interfaces
  core/utils/       reusable functions
  services/         data access
  app.*             application shell and configuration
```

For a small application, this is understandable and workable. The `core/models` folder makes sense for shared models. `core/utils` is also defensible for functions that do not belong to a specific feature.

### Structural improvement areas

#### 1. `landing.service` has a name that is too narrow

[landing.service.ts](src/app/services/landing.service/landing.service.ts) does not only fetch landing-page data; it fetches films, people, planets, species, vehicles, and starships. The service is therefore an API service for Star Wars data, not specifically a landing-page service.

Aanbevolen:

```text
src/app/core/services/swapi.service.ts
```

And the class name:

```ts
export class SwapiService {}
```

Class names start with an uppercase letter in TypeScript. `SwapiService` works technically, but it differs from the Angular and TypeScript convention: `SwapiService` or `SwapiService`.

#### 2. Think in features later, rather than only in technical folders

The `components` folder actually contains complete pages in this project: landing, episode, person, planet, species, vehicle, and starship. This is not wrong, but a feature-based structure becomes easier to scan as the application grows:

```text
src/app/
  core/
    models/
    services/
    utils/
  shared/
    ui/
  features/
    landing/
      landing.page.ts
    episode/
      episode.page.ts
    person/
      person.page.ts
    planet/
      planet.page.ts
```

This is not a reason to move everything immediately. A practical rule is: when a folder accumulates many different responsibilities, group by user-facing feature. Small reusable presentational components can later go in `shared/ui`; API and infrastructure code belongs in `core`.

#### 3. Remove the empty NgModule artifacts once the migration is complete

[app.module.ts](src/app/app.module.ts) is empty and is not used by the standalone bootstrap. This file can confuse someone who is learning to read the code. Remove it after confirming that it is no longer imported anywhere. The existing standalone architecture should not be converted back to NgModules.

#### 4. The models are currently direct API models

The interfaces contain names such as `opening_crawl`, `episode_id`, and `cost_in_credits`. This is understandable because that is how the external API works. Once there is a custom backend, it is better to establish a clear boundary:

- API DTOs represent the exact JSON format of the external or custom API.
- Frontend domain models can use consistent frontend names, for example `episodeId`.
- A mapper translates DTOs into models.

This does not need to be fully implemented for this small frontend yet. The important lesson is that external data is not automatically the same model that the UI should use.

## 2. Clean code and Angular practices

### Applied well

- The components are standalone and import their dependencies locally.
- Derived state is built with `computed()` in [episode.component.ts](src/app/components/episode/episode.component.ts) and [person.component.ts](src/app/components/person/person.component.ts). This is a good direction.
- The templates are mostly declarative: filtering usually happens in component code rather than in long template expressions.
- The route helpers in [route.utils.ts](src/app/core/utils/route.utils.ts) prevent the same URL logic from being rewritten throughout the application.
- `track` is used for most repeated lists.

### Main improvement areas

#### 1. Add `ChangeDetectionStrategy.OnPush`

None of the components specify `changeDetection: ChangeDetectionStrategy.OnPush`. The modern Angular recommendation is to use this explicitly for predictable and efficient change detection.

This fits well with the use of signals and `rxResource`. Add it consistently to all page components. Then check the templates and tests, because OnPush makes it especially clear when state must change.

#### 2. `standalone: true` is redundant in Angular 21

All components still contain `standalone: true`. In Angular 20 and later, components are standalone by default. It is not harmful in the current code, but according to the version-specific guidance it can be removed to reduce configuration noise.

#### 3. Add explicit types to all service methods

In [landing.service.ts](src/app/services/landing.service/landing.service.ts), some methods are typed, but `getPerson`, `getPlanet`, `getSpecie`, `getVehicle`, `getStarship`, and `getPeople` are not. Avoid allowing their return types to become too general.

Bijvoorbeeld:

```ts
getPeople(): Observable<Person[]> {
  return this.http.get<Person[]>(`${environment.apiUrl}/people`);
}

getPerson(id: string): Observable<Person> {
  return this.http.get<Person>(`${environment.apiUrl}/people/${id}`);
}
```

Import `Observable` from `rxjs` for this. The goal is for a component to know immediately what data it receives. Do not use `any` as an alternative.

#### 4. Remove `any` from `getRelatedFilms`

In [route.utils.ts](src/app/core/utils/route.utils.ts), `getRelatedFilms` has the parameter `films: any[] | undefined` and returns `any[]`. This bypasses strict typing in a shared utility.

For example, make the function specific to films:

```ts
export function getRelatedFilms(
  filmUrls: string[] | undefined,
  films: Film[] | undefined,
): Film[] {
  if (!filmUrls?.length || !films) {
    return [];
  }

  return films.filter((film) => filmUrls.includes(film.url));
}
```

Import `Film` at the top. If the same logic is later needed for multiple resource types, a generic helper can be considered then.

#### 5. Use one state style consistently

`EpisodeComponent` and `PersonComponent` use signals and `computed()`, while [planet.component.ts](src/app/components/planet/planet.component.ts), [specie.component.ts](src/app/components/specie/specie.component.ts), [vehicle.component.ts](src/app/components/vehicle/vehicle.component.ts), and [starship.component.ts](src/app/components/starship/starship.component.ts) use getters for derived data.

Getters are not automatically wrong, but `computed()` fits the rest of the application better and makes dependencies explicit. Also use `readonly` for resources that are not reassigned. A consistent style makes the code easier to maintain.

`showCrawl` and `showFilmInfo` in `EpisodeComponent` are also ordinary mutable properties. If these values can change from the template, make them signals with `signal(true)` and update them with `.set()` or `.update()`.

#### 6. Reduce duplicated error handling

The service already logs and translates errors in `handleError`. Several components then log the same error again with `catchError` and rethrow it. This creates duplicate logging and repeated code.

Choose one clear responsibility for each layer:

- the service translates technical HTTP errors into a useful error shape;
- the component displays a user-friendly status or error message;
- logging happens in one agreed location.

The current landing page only displays `Failed to load films`, while detail pages do not show a visible error message for many failures. Add at least a loading state, error state, and empty state for every resource.

#### 7. Detail pages fetch too much data

A detail page often fetches an entire collection and then searches locally for one item. For example, `PersonComponent` fetches people, planets, species, vehicles, starships, and films. This works for a small demo, but it is unnecessarily heavy and makes error handling more complicated.

A logical intermediate step is an API service with separate detail methods, such as `getPerson(id)`, `getPlanet(id)`, and so on. With a custom backend, the backend can also combine relationships or paginate results. Fetch only what the screen needs.

#### 8. Use stable IDs in routes

The landing page turns a film title into a slug and uses it as a route parameter. [episode.component.ts](src/app/components/episode/episode.component.ts) then searches by title again. Titles are less stable than IDs: a title can change or appear more than once.

Prefer a route such as:

```text
/episode/1
```

and load the film by its API ID. A slug can optionally be used as additional readable URL information, but it should not be the primary identity of a record.

#### 9. Check the endpoint name for a single starship

In [landing.service.ts](src/app/services/landing.service/landing.service.ts), `getStarship` uses `/starship/${id}`, while the collection is called `/starships`. Check this against the API contract; it probably should be `/starships/${id}`. This method is not visibly used at the moment, but a bug in an unused method can become an unpleasant surprise later.

#### 10. Keep helpers and imports clean

There are signs of unfinished code: `effect` is imported in [episode.component.ts](src/app/components/episode/episode.component.ts) but not used, and some imports appear to have been carried over from an earlier version. The comment `to check if I can use relatedFilms` should not remain as a development note in production code.

Let formatting and linting help, but also read the warnings. A formatter makes the code tidy; it does not determine whether the chosen abstraction is correct.

## 3. Templates and accessibility

This is an important area that goes beyond style.

### Clickable `div` elements

Several templates assign `[routerLink]` to a `div`, for example in [landing.component.html](src/app/components/landing/landing.component.html) and [episode.component.html](src/app/components/episode/episode.component.html). A `div` is not automatically keyboard-accessible and does not communicate link semantics to screen readers.

Use a real link for navigation:

```html
<a class="film-card" [routerLink]="['/episode', film.id]">
  <h2>{{ film.title }}</h2>
</a>
```

Use a `button` for an action that opens, closes, or changes something. Do not only add `role="button"` to a `div`; using the correct native element is better.

### Loading, error, and empty results

Many templates show nothing while `currentPlanet`, `currentPerson`, or another resource has no value yet. An empty page is unclear to a user. Use an explicit structure:

```html
@if (resource.isLoading()) {
  <p>Loading...</p>
} @else if (resource.error()) {
  <p role="alert">Could not load this item.</p>
} @else if (resource.value(); as item) {
  <!-- inhoud -->
} @else {
  <p>Item not found.</p>
}
```

The exact text can be translated later or managed through i18n. The states themselves should be part of the component design. i18n is a internationalization framework that allows you to translate your application into different languages. It is important to consider i18n early in the development process, as it can affect the structure and design of your application. Documentation: https://www.i18next.com/ 

### Semantic HTML

- `openingCrawl` is currently rendered as an `h3` in [episode.component.html](src/app/components/episode/episode.component.html). It is content, not a heading; a `p` or separate text section is semantically better.
- The class name `person-details` is also used for planets, species, vehicles, and starships. Choose a neutral name such as `entity-details`.
- The empty `<main>` in [app.html](src/app/app.html) looks like placeholder markup. Keep one meaningful main region in which the routed content actually appears, or remove the empty wrapper.
- Inline styling such as `style="background-size: cover"` can move to the component SCSS. The dynamic URL can remain a style binding.

### Images

For actual static `<img>` images, use Angular's `NgOptimizedImage` directive. The episode background is a CSS background and does not follow exactly the same pattern, but still check contrast, readability, and a fallback when an image is missing.

## 4. Tests

The tests are a good start because nearly every component has a spec file. At the moment, however, they mainly test whether a component can be created. As a result, regressions in relationships, errors, and rendering can easily go unnoticed.

### Tests that no longer seem to match the current API

Check these tests once the dependencies have been installed:

- [specie.component.spec.ts](src/app/components/specie/specie.component.spec.ts) calls `component.getFilmId()`, but that method is not present in the current `SpecieComponent`.
- [starship.component.spec.ts](src/app/components/starship/starship.component.spec.ts) does the same for `getFilmId()`.
- In [episode.component.spec.ts](src/app/components/episode/episode.component.spec.ts), `backgroundImage` and `backgroundStyle` are signals. A test must therefore call `component.backgroundImage()` and `component.backgroundStyle()`.
- In [person.component.spec.ts](src/app/components/person/person.component.spec.ts), `currentPerson` is a signal. Its value must be read with `component.currentPerson()`.
- The planet, vehicle, and starship tests do use getters as properties; that matches their current implementation but shows that the app uses two different state styles.

These are not purely cosmetic test problems. A test must use the current public component API; otherwise the test suite creates a false sense of security.

### Recommended test improvements

1. Test the service with `HttpTestingController`: correct URL, HTTP method, response type, and error handling.
2. Test the utilities in [route.utils.ts](src/app/core/utils/route.utils.ts): empty URLs, missing parameters, ID extraction, slugging, and related films.
3. Test at least one complete object with related films or relationships for each detail page.
4. Test loading, error, empty, and success states in the templates.
5. Test that a link uses the expected route parameter.
6. Use test-data factories or small fixtures so the same long objects do not need to be written again in every spec.
7. Name describe blocks after the component, for example `describe('LandingComponent', ...)`, so test output is immediately recognizable.

## 5. SSR and configuration

[app.config.server.ts](src/app/app.config.server.ts) and [app.routes.server.ts](src/app/app.routes.server.ts) are properly kept separate from the browser configuration. That is good.

There are two points to verify:

- All server routes use `RenderMode.Prerender`, including dynamic routes such as `episode/:movie` and `person/:id`. Verify with a real production build that these routes are generated correctly. Dynamic prerender routes often need explicit parameters or a suitable rendering strategy.
- The app uses an external API during SSR. Check what happens if that API is unavailable during the build or server rendering. A backend can later provide a stable custom API layer, but the frontend still needs clear loading and error states.

## 6. Preparing for the backend

Since backend work is the next step, this is a good time to make the frontend boundary clear.

### Recommended order

| Priority | Action | Why |
|---|---|---|
| High | Rename `SwapiService` to `SwapiService` and type all HTTP methods. | The code becomes clearer and backend integration becomes safer. |
| High | Update the stale component tests and add real success/error/loading tests. | Tests must protect the current code. |
| High | Use semantic links and check keyboard navigation. | This prevents accessibility problems in the UI. |
| Medium | Use IDs for routes and load detail data directly. | This creates less fragile URLs and avoids unnecessary API calls. |
| Medium | Add a small shared UI component for repeated film cards or relationship links. | This reduces template duplication without building too much abstraction too early. |
| Later | Build a custom backend/API layer with validation, clear DTOs, and a consistent error contract. | The frontend should not be responsible for external API details. |

### The backend should specifically address

- A frontend API such as `/api/films` and `/api/people/:id`, so the browser is not directly coupled to an external API.
- Server-side configuration for URLs and any secrets. Secrets must never end up in frontend code or browser bundles.
- Validation of route parameters and request data on the backend; frontend validation is only for usability.
- A consistent error response, for example a status code, error code, and readable message.
- Caching and pagination as collections grow.
- CORS, rate limiting, logging, and timeouts.
- DTO mapping between external SWAPI data, backend models, and frontend models.
- SSR behavior: decide which data may be loaded server-side and how temporary API outages are shown to the user.

## Final recommendation

The structure is sufficient for this stage and already contains modern Angular elements. The next quality step is mainly consistency: one naming style, complete types, one approach to derived state, real loading/error states, semantic navigation, and tests that verify behavior.

After that, the backend can be added without the pages remaining directly dependent on external API details. Small, demonstrable improvements per feature are the best learning path here.
