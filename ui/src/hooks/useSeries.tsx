import useAPI from './useAPI';
import { SeriesItem } from '../types/SeriesList';
import { useState } from 'react';

type SeriesAPI = {
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
    results: SeriesItem[];
  };
};

export const useSeries = () => {
  const [seriesList, setSeriesList] = useState<SeriesItem[]>([]);
  const [pageInfo, setPageInfo] = useState({ offset: 0, limit: 10, total: 0 });
  const { request, loading, error } = useAPI<SeriesAPI>();

  const fetchSeriesList = async (offset: number = 0, limit: number = 100) => {
    request(`/api/series?offset=${offset}&limit=${limit}`).then((response) => {
      setSeriesList(response.data.results);
      setPageInfo({
        offset: response.data.offset,
        limit: response.data.limit,
        total: response.data.total,
      });
    });
  };

  const nextPage = () => {
    const newOffset = pageInfo.offset + pageInfo.limit;
    if (newOffset < pageInfo.total) {
      fetchSeriesList(newOffset, pageInfo.limit);
    }
  };

  const prevPage = () => {
    const newOffset = pageInfo.offset - pageInfo.limit;
    if (newOffset >= 0) {
      fetchSeriesList(newOffset, pageInfo.limit);
    }
  };

  return { seriesList, fetchSeriesList, nextPage, prevPage, loading, error };
};
