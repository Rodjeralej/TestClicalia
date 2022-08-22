import React, { useEffect, useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import PokemonPopup from '../PokemonPopup/PokemonPopup';

import capitalize from '../../utils/strings';

import { API, ROUTES } from '../../utils/constants';

const tableHeaders = ['Name', 'URL'];

const sortPokemons = (pokemon1, pokemon2) => {
  if (pokemon1.name < pokemon2.name) return -1;
  if (pokemon1.name > pokemon2.name) return 1;
  return 0;
};

const filterPokemonsData = (pokemonsData, filter) => {
  if (!pokemonsData) { return; }
  const filteredPokemonsData = pokemonsData
    .filter((pokemonData) => pokemonData.name.toLowerCase().includes(filter.toLowerCase()))
    .sort(sortPokemons);

  return filteredPokemonsData;
};

function PokemonsTable({ filter }) {
  const [loading, setLoading] = useState(false);
  const [pokemonsData, setPokemonsData] = useState(null);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const filteredData = filterPokemonsData(pokemonsData, filter);

  const fetchPokemonsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pokemonsResponse = await axios.get(
        `${API}${ROUTES.getAllPokemons}`,
      );
      const {
        data: { results },
      } = pokemonsResponse;
      setPokemonsData(results);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemonsData();
  }, [fetchPokemonsData]);

  useEffect(() => {
    if (pokemonsData) {
      filterPokemonsData();
    }
  }, [filter, pokemonsData, filterPokemonsData]);

  const onCellClick = (pokemonUrl) => {
    setOpenModal(true);
    setSelectedPokemonUrl(pokemonUrl);
  };

  const handleModalClose = () => setOpenModal(false);

  if (loading) return <Spinner />;

  if (error) return <Error />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((tableHeader) => (
                <TableCell key={tableHeader}>{tableHeader}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length > 0 ? (
              filteredData.map((pokemonData) => (
                <TableRow
                  key={pokemonData.name}
                  onClick={() => onCellClick(pokemonData.url)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{capitalize(pokemonData.name)}</TableCell>
                  <TableCell>{pokemonData.url}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  There is no information related
                  to the Pokemon you are looking for 🤓
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PokemonPopup
        pokemonUrl={selectedPokemonUrl}
        open={openModal}
        handleClose={handleModalClose}
      />
    </>
  );
}

PokemonsTable.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default PokemonsTable;
