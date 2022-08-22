import React, { useState } from 'react';

import Stack from '@mui/material/Stack';

import PokemonsTable from './components/Pokemon/PokemonsTable/PokemonsTable';
import PokemonsFilter from './components/Pokemon/PokemonsFilter/PokemonsFilter';

function App() {
  const [filter, setFilter] = useState('');

  return (
    <Stack direction="column" padding="80px 60px">
      <PokemonsFilter filter={filter} setFilter={setFilter} />
      <PokemonsTable filter={filter} />
    </Stack>
  );
}

export default App;
