// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import TextField from '@mui/material/TextField';
// Constants
import { FILTER_PLACEHOLDER } from '../../utils/constants';

const filterStyles = {
  marginBottom: 5,
};

function PokemonsFilter({ filter, setFilter }) {
  const onTextChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <TextField
      label={FILTER_PLACEHOLDER}
      value={filter}
      onChange={onTextChange}
      sx={filterStyles}
    />
  );
}

PokemonsFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default PokemonsFilter;
