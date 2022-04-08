import React from 'react';
import Navbar  from './components/Navbar';
import './App.css';
import Connect from './pages/Connect';
import { useStore } from './store/Provider';
import { observer } from 'mobx-react-lite';


import Bounty from './pages/Bounty';
import Bounties from './pages/Bounties'

function App() {
  const store = useStore()

  const pages  = {
    connect: <Connect />,
    bounty: <Bounty />,
    bounties: <Bounties />
  }


  return (
    <div className="App">
      <Navbar />
      {pages[store.currentPage]}
    </div>
  );
}

export default observer(App);
