import ForceGraph2D from "react-force-graph-2d";
import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Toolbar, Typography } from "@mui/material";
import { Search } from "./Search";
import { useCharacterGraph } from "../hooks/useCharacterGraph";

const CharacterGraph: React.FC = () => {
  const {
    characterGraph,
    fetchCharacterGraph,
    getSeriesList,
    filteredSeriesList,
    filteredCharacterGraph,
    filterBySeries,
    loading,
    buildingGraph,
  } = useCharacterGraph();
  const isInitialRender = useRef(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loadingGraph, setLoadingGraph] = useState(true);

  useEffect(() => {
    if (isInitialRender.current) {
      fetchCharacterGraph();
      getSeriesList("");
      isInitialRender.current = false;
    }
  }, [isInitialRender, fetchCharacterGraph, getSeriesList, searchTerm]);

  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Marel character explorer</Typography>
        <Search
          seriesList={filteredSeriesList}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onInputChange={getSeriesList}
          onSelect={filterBySeries}
        />
      </Toolbar>
      {loading || buildingGraph ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography>
            {loading ? "Fetching Data..." : "Processing data..."}
          </Typography>
        </Box>
      ) : (
        <ForceGraph2D
          graphData={
            filteredCharacterGraph && filteredCharacterGraph?.nodes?.length > 0
              ? filteredCharacterGraph
              : characterGraph
          }
          nodeAutoColorBy="group"
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            if (!node.x || !node.y) return;

            const radius = 12;
            const imgSize = radius * 2;
            const img = new Image();
            img.src = node.img; // Ensure node.img is the image URL

            img.onload = () => {
              ctx.save();

              // Draw the circular clip path
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.closePath();
              ctx.clip();

              // Draw the image inside the circular clip path
              ctx.drawImage(
                img,
                node.x - radius,
                node.y - radius,
                imgSize,
                imgSize
              );

              ctx.restore();

              // Draw the node border
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.strokeStyle = node.color || "black";
              ctx.lineWidth = 1;
              ctx.stroke();
            };
          }}
          nodePointerAreaPaint={(node: any, color, ctx) => {
            if (!node.x || !node.y) return;

            const radius = 12;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
          }}
          onEngineStop={() => setLoadingGraph(false)}
          // onNodeClick={(node: any) => onCharacterSelect(node)}
        />
      )}
    </>
  );
};

export default CharacterGraph;
