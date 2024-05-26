export type Url = {
  type: string;
  url: string;
};

type Thumbnail = {
  path: string;
  extension: string;
};

type StoryItem = {
  resourceURI: string;
  name: string;
  type?: string;
};

type EventItem = {
  resourceURI: string;
  name: string;
};

type CreatorItem = {
  resourceURI: string;
  name: string;
  role: string;
};

type Collection<T> = {
  available: number;
  returned: number;
  collectionURI: string;
  items: T[];
  name?: string;
  resourceURI?: string;
};

type ResourceItem = {
  resourceURI: string;
  name: string;
};

type Image = {
  path: string;
  extension: string;
};

export type SeriesItem = {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: Thumbnail;
  comics: Collection<ComicItem>;
  stories: Collection<StoryItem>;
  events: Collection<EventItem>;
  characters: Collection<CharacterItem>;
  creators: Collection<CreatorItem>;
  next: ResourceItem;
  previous: ResourceItem;
};

export type CharacterItem = {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls?: Url[];
  thumbnail: Thumbnail;
  comics: {
    available: number;
    collectionURI: string;
    returned: number;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  img?: string;
  stories?: Collection<StoryItem>;
  events?: Collection<EventItem>;
  series?: Collection<StoryItem>;
};

export type ComicItem = {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: Date;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  resourceURI: string;
  urls: Url[];
  series: SeriesItem;
  thumbnail: Thumbnail;
  images: Image[];
  characters: CharacterItem;
};
