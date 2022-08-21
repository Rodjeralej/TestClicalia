// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Material UI
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// Components
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
// Utils
import capitalize from '../../utils/strings';

// Styles

const styles = {
  pokemonAvatar: {
    height: 150,
    width: 200,
  },
  list: {
    height: 250,
    overflow: 'auto',
  },
};

export default function PokemonPopup({ pokemonUrl, open, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemonData = async () => {
    setLoading(true);
    try {
      const pokemonData = await axios.get(pokemonUrl);
      setPokemon(pokemonData?.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pokemonUrl) {
      fetchPokemonData();
    }
  }, [pokemonUrl]);

  const handleMoveDelete = (moveName) => {
    const pokemonClone = { ...pokemon };
    const filteredPokemons = pokemonClone.moves
      .filter((filteredPokemon) => filteredPokemon?.move.name !== moveName);
    pokemonClone.moves = filteredPokemons;
    setPokemon(pokemonClone);
  };

  const sortMovesByUrlIds = (move1, move2) => {
    const splittedUrl = (urlToSplit) => urlToSplit.move.url.split('/');

    const move1Splitted = splittedUrl(move1);
    const move2Splitted = splittedUrl(move2);

    const move1Id = parseInt(move1Splitted[move1Splitted.length - 2], 10);
    const move2Id = parseInt(move2Splitted[move2Splitted.length - 2], 10);

    if (move1Id < move2Id) { return 1; }
    if (move1Id > move2Id) { return -1; }
    return 0;
  };

  if (loading) return <Spinner />;

  return (
    <Dialog open={open} onClose={handleClose}>
      {error && <Error />}
      {pokemon && (
        <Stack direction="column" spacing={5} padding={5}>
          <Stack direction="row" spacing={10}>
            <Stack alignItems="center" spacing={3}>
              <Avatar alt="back_default" src={pokemon?.sprites.back_default} sx={styles.pokemonAvatar} />
              <Typography>{capitalize(pokemon?.name)}</Typography>
            </Stack>
            <List subheader={<ListSubheader>Abilities</ListSubheader>}>
              {pokemon?.abilities.map((ability) => !ability.is_hidden && (
              <ListItem key={ability?.ability.name}>
                <ListItemButton>
                  <ListItemText primary={ability?.ability.name} />
                </ListItemButton>
              </ListItem>
              )) }
            </List>
          </Stack>
          <List subheader={<ListSubheader>Moves</ListSubheader>} sx={styles.list}>
            {pokemon?.moves.sort(sortMovesByUrlIds).map((moves) => (
              <ListItem key={moves?.move.name}>
                <ListItemButton>
                  <ListItemText primary={moves?.move.name} />
                  <DeleteForeverIcon onClick={() => handleMoveDelete(moves?.move.name)} />
                </ListItemButton>
              </ListItem>
            )) }
          </List>
        </Stack>
      )}
    </Dialog>
  );
}

PokemonPopup.propTypes = {
  pokemonUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
