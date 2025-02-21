import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    setResponse(null);
    setError(null);
    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("Invalid input: 'data' should be an array.");
        return;
      }
      const res = await axios.post("https://bajaj-assign-backend.vercel.app/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  const handleSelectChange = (e) => {
    const options = [...e.target.selectedOptions].map((option) => option.value);
    setSelectedOptions(options);
  };

  return (
    <div className="container">
      <h1>API Input</h1>
      <textarea
        className="input-box"
        placeholder='{"data":["M","1","334","4","B"]}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      {error && <p className="error-text">{error}</p>}
      {response && (
        <div className="response-section">
          <h2>Multi Filter</h2>
          <select className="multi-select" multiple onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          <h2>Filtered Response</h2>
          {selectedOptions.length === 0 ? (
            <p className="placeholder-text">Please select options to display</p>
          ) : (
            <pre className="response-box">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(response).filter(([key]) => selectedOptions.includes(key))
                ),
                null,
                2
              )}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
