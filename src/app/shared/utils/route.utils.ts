import { ActivatedRoute } from "@angular/router";

export function getRequiredRouteParam(
  route: ActivatedRoute,
  paramName: string
): string {
  const value = route.snapshot.paramMap.get(paramName);

  if (value === null) {
    throw new Error(
      `Required route parameter '${paramName}' was not found.`
    );
  }
  return value;
}

export function getRelatedFilms(
  filmUrls: string[] | undefined,
  films: any[] | undefined
): any[] {
  if (!filmUrls?.length || !films) {
    return [];
  }

  return films.filter((film) =>
    filmUrls.includes(film.url)
  );
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function extractIdFromUrl(url: string): string {
  return url.split('/').filter(Boolean).pop() ?? '';
}
