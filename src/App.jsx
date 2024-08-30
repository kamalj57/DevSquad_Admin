import React from 'react';
import useMediaQuery from './Hooks/Mediaquery';
import './App.css';
import Login from './components/Login/Login';
import Loginresponsive from './components/Login/Loginresponsive';
import Animation from './assets/Animation/Animation'; 

function App() {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <div>
      {isMobile ? <Loginresponsive /> : <Login />}
      {/* <Animation />  */}
    </div>
  );
}

export default App;
