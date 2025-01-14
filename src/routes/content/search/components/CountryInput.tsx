import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchMoviesMovieRequest } from "../../services/movie.api";
import { Country } from "../../interfaces/movie.interface";
import { useGetCountryQuery } from "../../services/tmdp.api";

interface CountryInputProps {
  onFilterChange: (
    key: keyof SearchMoviesMovieRequest,
  ) => (value: string) => void;
}

export default function CountryInput({ onFilterChange }: CountryInputProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Country[]>([]);

  const { data, error, isLoading } = useGetCountryQuery({});

  if (error) {
    console.error(error);
  }

  const handleOpen = () => {
    setOpen(true);
    if (data) {
      setOptions(data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleChange = (_: React.SyntheticEvent, value: Country | null) => {
    console.log("country: ", value);
    onFilterChange("region")(value ? value.iso_3166_1 : "");
  };

  return (
    <Autocomplete
      className="p-5"
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) =>
        option.iso_3166_1 === value.iso_3166_1
      }
      getOptionLabel={(option) => option.english_name}
      options={options}
      loading={isLoading}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Region"
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
