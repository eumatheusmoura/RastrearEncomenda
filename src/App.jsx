import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [dados, setDados] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleRequest() {
    try {
      setLoading(true);
      axios
        .get(`https://rastreiocorreiosapi.herokuapp.com/rastreio/${input}`)
        .then((response) => {
          setDados([response.data.eventos]);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    handleRequest();
    console.log(input, [dados]);
  }

  return (
    <div className="App">
      <h1>Digite seu rastreio</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button disabled={!input} onClick={handleClick}>
        {loading ? "Rastreando..." : "Rastrear"}
      </button>
      {!dados[0]
        ? ""
        : dados[0].map((item, index) => {
            return (
              <div key={index}>
                <p key={index}>{item.descricao}</p>
                <p>{item.unidade.tipo}</p>
              </div>
            );
          })}
    </div>
  );
}

export default App;
