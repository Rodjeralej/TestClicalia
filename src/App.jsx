// Dependencies
import React, { useState } from 'react';
// Material UI
import PokemonsTable from './components/PokemonsTable/PokemonsTable';
// Components
import PokemonsFilter from './components/PokemonsFilter/PokemonsFilter';
// Styles
import styles from './App.module.scss';

function App() {
  const [filter, setFilter] = useState('');

  return (
    <div className={styles.container}>
      <PokemonsFilter filter={filter} setFilter={setFilter} />
      <PokemonsTable filter={filter} />
    </div>
  );
}

export default App;
