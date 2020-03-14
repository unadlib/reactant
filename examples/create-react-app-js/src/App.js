import React from 'react';
import logo from './logo.svg';
import './App.css';

function App({
  count,
  increase,
}) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={increase}>{count}</button>
      </header>
    </div>
  );
}

export default App;
