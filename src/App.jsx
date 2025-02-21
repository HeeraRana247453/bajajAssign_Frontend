import React, { useState } from "react";
import axios from "axios";

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
    const options = [...e.target.selectedOptions].map(option => option.value);
    setSelectedOptions(options);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Data Processor</h1>
      <textarea
        className="w-full md:w-2/3 p-3 border border-gray-300 rounded-md"
        placeholder="Enter JSON"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button 
        onClick={handleSubmit} 
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {response && (
        <div className="w-full md:w-2/3 mt-6 p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-lg font-semibold mb-2">Filtered Response</h2>
          <div className="mb-2">
            <label className="font-medium">Multi Filter</label>
            <select 
              multiple 
              onChange={handleSelectChange}
              className="w-full border border-gray-300 p-2 rounded-md mt-2"
            >
              <option value="numbers">Numbers</option>
              <option value="alphabets">Alphabets</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
          </div>
          {selectedOptions.length === 0 ? (
            <p className="text-gray-500">Please select options to display</p>
          ) : (
            <div className="mt-3 bg-gray-100 p-3 rounded-md">
              {selectedOptions.includes("numbers") && response.numbers && (
                <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>
              )}
              {selectedOptions.includes("alphabets") && response.alphabets && (
                <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>
              )}
              {selectedOptions.includes("highest_alphabet") && response.highest_alphabet && (
                <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
