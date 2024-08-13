import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import * as Alerty from "@alerty/react";

Alerty.configure({
  dsn: "https://01hxsyxpc7yqbz4n3dq80kp84v@localhost:4318/0a37eed4-fd20-42de-9975-5d09a303234a",
  debug: true,
});


function App() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        Alerty.captureError("Fetched data from API", {
          extra: json,
        });
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
