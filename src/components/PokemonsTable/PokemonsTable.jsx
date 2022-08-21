import React, { useEffect, useState, useReducer } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import PokemonPopup from "../PokemonPopup/PokemonPopup";
import capitalize from "../../utils/strings";
import { API, ROUTES, NO_RESULTS } from "../../utils/constants";

const tableHeaders = ["Name", "URL"];

const pokemonSorter = (pokemon1, pokemon2) => {
  if (pokemon1.name < pokemon2.name) return -1;
  if (pokemon1.name > pokemon2.name) return 1;
  return 0;
};

function PokemonsTable({ filter, ...props }) {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState(null);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");
  const [openModal, toggleOpenModal] = useReducer((prev) => !prev, false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API}${ROUTES.getAllPokemons}`);
        setPokemons(response.data.results);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonsData();
  }, []);

  const handleCellClick = (pokemonUrl) => {
    toggleOpenModal();
    setSelectedPokemonUrl(pokemonUrl);
  };

  if (loading) return <Spinner />;
  if (error) return <Error />;

  const filteredData =
    pokemons !== null
      ? pokemons
          .filter((pokemonData) => pokemonData.name.includes(filter))
          .sort(pokemonSorter)
      : [];

  return (
    <>
      <TableContainer component={Paper} {...props}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((tableHeader) => (
                <TableCell key={tableHeader}>{tableHeader}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((pokemonData) => (
                <TableRow
                  key={pokemonData.name}
                  onClick={() => handleCellClick(pokemonData.url)}
                >
                  <TableCell>{capitalize(pokemonData.name)}</TableCell>
                  <TableCell>{pokemonData.url}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>{NO_RESULTS}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PokemonPopup
        pokemonUrl={selectedPokemonUrl}
        open={openModal}
        handleClose={toggleOpenModal}
      />
    </>
  );
}

PokemonsTable.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default PokemonsTable;
