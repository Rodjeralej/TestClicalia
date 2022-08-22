import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TextField from '@mui/material/TextField';

const filterStyles = {
  marginBottom: 5,
};

function PokemonsFilter({ setFilter }) {
  const handleTextChange = (event) => {
    setFilter(event.target.value);
  };

  const debounceHandleTextChange = useCallback(_.debounce((e) => handleTextChange(e), 200), []);

  return (
    <TextField
      label="Find some Pokemons..."
      onChange={debounceHandleTextChange}
      sx={filterStyles}
    />
  );
}

PokemonsFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default PokemonsFilter;
