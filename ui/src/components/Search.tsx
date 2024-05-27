import React, { FC, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";

type SeriesItem = {
  value: string;
  label: string;
};

type SearchProps = {
  seriesList: SeriesItem[];
  selectedSeries?: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  onInputChange: (searchTerm: string) => void;
  onSelect: (searchTerm: string) => void;
};

// Utility function to remove duplicates based on the label
const removeDuplicates = (seriesList: SeriesItem[]) => {
  const seen = new Set();
  return seriesList.filter((item) => {
    const duplicate = seen.has(item.label);
    seen.add(item.label);
    return !duplicate;
  });
};

export const Search: FC<SearchProps> = ({
  seriesList,
  searchTerm,
  onInputChange,
  setSearchTerm,
  onSelect,
}) => {
  const uniqueSeriesList = removeDuplicates(seriesList);

  const handleInputChange = useCallback(
    (_event: React.ChangeEvent<{}>, value: string | null) => {
      setSearchTerm(value || "");
      onInputChange(value || "");
    },
    [onInputChange, setSearchTerm]
  );

  const handleChange = useCallback(
    (
      _event: React.SyntheticEvent<Element, Event>,
      value: SeriesItem | null
    ) => {
      setSearchTerm(value ? value.label : "");
      onInputChange(value ? value.label : "");
      onSelect(value ? value.label : "");
    },
    [onInputChange, setSearchTerm]
  );

  return (
    <Autocomplete
      options={uniqueSeriesList}
      getOptionLabel={(option) => option.label}
      value={uniqueSeriesList.find((item) => item.label === searchTerm) || null}
      onChange={handleChange}
      onInputChange={handleInputChange}
      sx={{ width: 300 }} // Set fixed width here
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search..."
          sx={{ backgroundColor: "white", borderRadius: 1, width: "100%" }} // Ensure TextField takes full width
        />
      )}
    />
  );
};
