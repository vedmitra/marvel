import useApi from "./useAPI";
import { CharacterItem } from "../types/SeriesList";
import { characters as mockCharacters } from "./Characters";
import { useCallback, useState } from "react";

type CharacterAPI = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: CharacterItem[];
  };
};
type Node = {
  id: string;
  name: string;
  img: string;
};

type Link = {
  source: string;
  target: string;
};

type Result = {
  nodes: Node[];
  links: Link[];
};

export const useCharacterGraph = () => {
  const { request, error } = useApi<CharacterAPI>();
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [characterGraph, setCharacterGraph] = useState<{
    nodes: Node[];
    links: Link[];
  }>();

  const fetchCharacterGraph = useCallback(async () => {
    const limit = 100;
    let allRecords: CharacterItem[] = [];

    setLoading(true);

    try {
      // Fetch the first batch to get the total count
      const initialResponse = await request(
        `/api/characters?offset=0&limit=${limit}`
      );
      allRecords = initialResponse.data.results;

      const total = initialResponse.data.total;
      const totalRequests = Math.ceil(total / limit);

      // Fetch the remaining batches
      const requests = [];
      for (let i = 1; i < totalRequests; i++) {
        const offset = i * limit;
        requests.push(
          request(`/api/characters?offset=${offset}&limit=${limit}`)
        );
      }

      const responses = await Promise.all(requests);
      responses.forEach((response) => {
        allRecords = allRecords.concat(response.data.results);
      });

      setCharacters(allRecords);
      const charGraph = buildGraph(mockCharacters);
      console.log(charGraph);
      setCharacterGraph(charGraph);
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }

    // setCharacters(mockCharacters);
    // const charGraph = buildGraph(mockCharacters);
    // setCharacterGraph(charGraph);
    // console.log(charGraph);
  }, []);

  const buildGraph = (characters: CharacterItem[]): Result => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    const comicToCharacters: { [comicURI: string]: Set<number> } = {};
    const chars = characters.map((char) => {
      delete char?.series;
      delete char?.events;
      delete char?.stories;
      char.img = char?.thumbnail?.path;
      return char;
    });
    // Create nodes and build the comic-to-characters map
    chars.forEach((character) => {
      nodes.push({
        id: character.id.toString(),
        name: character.name,
        img: `${character.thumbnail.path}.${character.thumbnail.extension}`,
      });
      character.comics.items.forEach((comic) => {
        if (!comicToCharacters[comic.resourceURI]) {
          comicToCharacters[comic.resourceURI] = new Set();
        }
        comicToCharacters[comic.resourceURI].add(character.id);
      });
    });

    // Create links based on common comic appearances
    const characterPairs = new Set<string>();
    Object.values(comicToCharacters).forEach((characterSet) => {
      const charactersArray = Array.from(characterSet);
      for (let i = 0; i < charactersArray.length; i++) {
        for (let j = i + 1; j < charactersArray.length; j++) {
          const pair = `${charactersArray[i]}-${charactersArray[j]}`;
          if (!characterPairs.has(pair)) {
            links.push({
              source: charactersArray[i].toString(),
              target: charactersArray[j].toString(),
            });
            characterPairs.add(pair);
          }
        }
      }
    });

    return { nodes, links };
  };

  return { fetchCharacterGraph, characters, characterGraph, loading, error };
};
