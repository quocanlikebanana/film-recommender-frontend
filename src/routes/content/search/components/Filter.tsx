import React from "react";
import { Button, Grid } from "@mui/material";
import LangInput from "./LangInput";
import CountryInput from "./CountryInput";
import ReleaseYearInput from "./ReleaseYearInput";
import { SearchMoviesMovieRequest } from "../../services/movie.api";

interface FilterProps {
  filters: SearchMoviesMovieRequest;
  onFilterChange: (
    key: keyof SearchMoviesMovieRequest,
  ) => (value: string) => void;
  onApplyFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onApplyFilters }) => {
  return (
    <form className="flex flex-wrap">
      <Grid container spacing={2} className="w-full">
        <Grid item xs={12} sm={3}>
          <LangInput onFilterChange={onFilterChange} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CountryInput onFilterChange={onFilterChange} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <ReleaseYearInput onFilterChange={onFilterChange} />
        </Grid>
        <Grid item xs={12} sm={3} className="flex items-center">
          <Button variant="contained" onClick={onApplyFilters}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Filter;
