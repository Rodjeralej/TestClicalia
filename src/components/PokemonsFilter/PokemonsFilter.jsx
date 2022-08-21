import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

function PokemonsFilter({ filter, setFilter }) {
  return (
    <TextField
      label="Find some pokemons..."
      value={filter}
      onChange={(event) => {
        setFilter(event.target.value);
      }}
    />
  );
}

PokemonsFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default PokemonsFilter;
