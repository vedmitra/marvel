export type Url = {
  type: string;
  url: string;
};

type Thumbnail = {
  path: string;
  extension: string;
};

type ComicItem = {
  resourceURI: string;
  name: string;
};

type StoryItem = {
  resourceURI: string;
  name: string;
  type: string;
};

type EventItem = {
  resourceURI: string;
  name: string;
};

type CharacterItem = {
  resourceURI: string;
  name: string;
  role: string;
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
};

type ResourceItem = {
  resourceURI: string;
  name: string;
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
