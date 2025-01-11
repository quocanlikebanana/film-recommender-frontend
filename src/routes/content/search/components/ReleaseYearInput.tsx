// src/components/ReleaseYearInput.tsx
import React from "react";
import { TextField } from "@mui/material";
import { SearchMoviesMovieRequest } from "../../services/movie.api";

interface ReleaseYearInputProps {
  onFilterChange: (
    key: keyof SearchMoviesMovieRequest,
  ) => (value: string) => void;
}

const ReleaseYearInput: React.FC<ReleaseYearInputProps> = ({
  onFilterChange,
}) => {
  return (
    <div className="p-5">
      <TextField
        id="release-year"
        type="number"
        label="Release Year"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onFilterChange("primary_release_year")(event.target.value);
        }}
      />
    </div>
  );
};

export default ReleaseYearInput;
