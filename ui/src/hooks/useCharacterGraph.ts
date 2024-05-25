import useApi from './useAPI';
import { CharacterItem } from '../types/SeriesList';
import { useCallback, useState } from 'react';

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
  const { request, error } = useApi<CharacterAPI>();
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<CharacterItem[]>([]);

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
      console.log(totalRequests);

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
      console.log(allRecords);
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  }, [request]);

  return { fetchCharacterGraph, characters, loading, error };
};
