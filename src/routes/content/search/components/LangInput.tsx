import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {
  SearchMoviesMovieRequest,
  useGetPrimaryTranslationsQuery,
} from "../../services/movieApi";

interface LangInputProps {
  onFilterChange: (
    key: keyof SearchMoviesMovieRequest,
  ) => (value: string) => void;
}

export default function LangInput({ onFilterChange }: LangInputProps) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly string[]>([]);

  const { data, error, isLoading } = useGetPrimaryTranslationsQuery({});

  if (error) {
    console.error(error);
  }

  React.useEffect(() => {
    if (data) {
      setOptions(data);
    }
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (_: React.SyntheticEvent, value: string | null) => {
    onFilterChange("language")(value || "");
  };

  return (
    <Autocomplete
      className="p-5"
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={isLoading}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
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
