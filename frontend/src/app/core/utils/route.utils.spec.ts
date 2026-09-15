import { extractIdFromUrl, getRelatedFilms, getRequiredRouteParam, toSlug } from "./route.utils";


describe('Utils', () => {
  it('should return required route param', () => {
    const route: any = {
      snapshot: {
        paramMap: {
          get: () => '123',
        },
      },
    };

    expect(getRequiredRouteParam(route, 'id')).toBe('123');
  });

  it('should throw when required route param is missing', () => {
    const route: any = {
      snapshot: {
        paramMap: {
          get: () => null,
        },
      },
    };

    expect(() =>
      getRequiredRouteParam(route, 'id')
    ).toThrowError();
  });

  it('should return related films', () => {
    const films = [
      { url: 'film-1', title: 'Film 1' },
      { url: 'film-2', title: 'Film 2' },
    ];

    expect(
      getRelatedFilms(['film-1'], films)
    ).toEqual([films[0]]);
  });

  it('should return empty array when no film urls are provided', () => {
    expect(getRelatedFilms(undefined, [])).toEqual([]);
  });

  it('should convert text to slug', () => {
    expect(toSlug('Luke Skywalker')).toBe(
      'luke-skywalker'
    );
  });

  it('should remove special characters from slug', () => {
    expect(toSlug('Hello, World!')).toBe(
      'hello-world'
    );
  });

  it('should extract id from url', () => {
    expect(
      extractIdFromUrl('https://swapi.dev/api/people/1/')
    ).toBe('1');
  });

  it('should return empty string for empty url', () => {
    expect(extractIdFromUrl('')).toBe('');
  });
});