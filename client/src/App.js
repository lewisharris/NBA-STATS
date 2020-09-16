import React from "react";
import "./App.css";
import Stats from "./Stats";
import Games from "./Games";
import Year from "./components/Year";

function App() {
  return (
    <div className="App">
      <h1>NBA STATS</h1>
      <Stats />
      <Year>Season</Year>
      <Games />
    </div>
  );
}

export default App;
