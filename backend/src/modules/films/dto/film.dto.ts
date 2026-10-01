export class FilmDto {
  id: string;
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;

  characters: string[];
  planets: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}