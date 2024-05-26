import ForceGraph2D from 'react-force-graph-2d';
import React, { useEffect, useRef } from 'react';
import { useCharacterGraph } from '../hooks/useCharacterGraph';

const CharacterGraph: React.FC<{
  seriesId: number;
}> = ({ seriesId }) => {
  const { characters, characterGraph, fetchCharacterGraph } =
    useCharacterGraph();
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      fetchCharacterGraph();
      isInitialRender.current = false;
    }
  }, [isInitialRender, fetchCharacterGraph]);
  const graph = {
    nodes: [
      {
        id: "id1",
        val: 1,
        img: () => {
          const img = new Image();
          img.src =
            "http://i.annihil.us/u/prod/marvel/i/mg/4/b0/5d939e25a9787.jpg";
          return img;
        },
      },
      {
        id: "id2",
        img: () => {
          const img = new Image();
          img.src =
            "http://i.annihil.us/u/prod/marvel/i/mg/4/b0/5d939e25a9787.jpg";
          return img;
        },
        val: 10,
      },
      {
        id: "id3",
        img: () => {
          const img = new Image();
          img.src =
            "http://i.annihil.us/u/prod/marvel/i/mg/4/b0/5d939e25a9787.jpg";
          return img;
        },
        val: 5,
      },
      {
        id: "id4",
        img: () => {
          const img = new Image();
          img.src =
            "http://i.annihil.us/u/prod/marvel/i/mg/4/b0/5d939e25a9787.jpg";
          return img;
        },
        val: 10,
      },
    ],
    links: [
      {
        source: "id1",
        target: "id2",
      },
      {
        source: "id2",
        target: "id3",
      },
      {
        source: "id4",
        target: "id2",
      },
    ],
  };
  return (
    <ForceGraph2D
      graphData={characterGraph}
      nodeAutoColorBy="group"
      //   onNodeClick={(node: any) => onCharacterSelect(node)}
    />
  );
};

export default CharacterGraph;
