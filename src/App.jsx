import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    setResponse(null);  // Clear previous response before submitting new data
    setError(null);
    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("Invalid input: 'data' should be an array.");
        return;
      }
      const res = await axios.post("http://localhost:3000/bfhl", parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON or API error");
    }
  };

  const handleSelectChange = (e) => {
    const options = [...e.target.selectedOptions].map(option => option.value);
    setSelectedOptions(options);
  };

  return (
    <div>
      <h1>Data Processor</h1>
      <textarea
        placeholder="Enter JSON"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <select multiple onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {selectedOptions.length === 0 ? (
            <p>Please select options to display</p>
          ) : (
            <pre>
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
