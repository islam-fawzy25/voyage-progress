import React from 'react';
import logo from './logo.svg';
import './App.css';
import VoyageProgressBar from './components/VoyageProgressBar/VoyageProgressBar';


function App() {

  return (
    <div className="App">
      <h1>Voyage progress</h1>
      <VoyageProgressBar
        portOfLoading={"Karlshamn"}
        portOfDischarge={"Klaipeda"}
        depatureTime={{ hour: 9, minute: 36 }}
        arrivalTime={{ hour: 9, minute: 50 }}
      />
    </div>
  );
}

export default App;
