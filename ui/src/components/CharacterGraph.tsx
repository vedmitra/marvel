import React, { useEffect } from 'react';
import { useCharacterGraph } from '../hooks/useCharacterGraph';

const CharacterGraph: React.FC<{
  seriesId: number;
}> = ({ seriesId }) => {
  const { characters: characterGraph, fetchCharacterGraph } =
    useCharacterGraph();
  console.log(characterGraph);
  useEffect(() => {
    console.log("ll");
    // fetchCharacterGraph(seriesId);
  }, []);
  return (
    // <ForceGraph2D
    //   graphData={graphData}
    //   nodeAutoColorBy="group"
    //   onNodeClick={(node: any) => onCharacterSelect(node)}
    // />
    <></>
  );
};

export default CharacterGraph;
