import useApi from './useAPI';
import { CharacterItem } from '../types/SeriesList';
import { useState } from 'react';

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

export const useCharacterGraph = () => {
  const { request, loading, error } = useApi<CharacterAPI>();
  const [characters, setCharacters] = useState<unknown>();
  const fetchCharacterGraph = (
    seriesId: number,
    offset: number = 0,
    limit: number = 100
  ) => {
    request(
      `/api/series/${seriesId}/characters?offset=${offset}&limit=${limit}`
    )
      .then((response) => {
        const charGraph = buildGraph(response.data.results);
        setCharacters(charGraph);
      })
      .catch((error) => console.error(error));
  };

  const buildGraph = (characters: CharacterItem[]) => {
    const nodes = characters.map((char) => ({ id: char.id, name: char.name }));
    const links: any[] = [];

    const comicAppearances: { [comicId: string]: any[] } = {};

    // Collect comic appearances
    console.log(characters);
    // characters.forEach((character) => {
    //   character?.comics?.forEach((comic: any) => {
    //     if (!comicAppearances[comic.id]) {
    //       comicAppearances[comic.id] = [];
    //     }
    //     comicAppearances[comic.id].push(character.id);
    //   });
    // });

    // Create links based on co-appearances
    Object.values(comicAppearances).forEach((characterIds) => {
      for (let i = 0; i < characterIds.length; i++) {
        for (let j = i + 1; j < characterIds.length; j++) {
          links.push({ source: characterIds[i], target: characterIds[j] });
        }
      }
    });

    return { nodes, links };
  };

  return { fetchCharacterGraph, characters, loading, error };
};
