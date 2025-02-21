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
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">Data Processor</h1>
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-xl">
        <textarea
          className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter JSON"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleSubmit} 
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 mb-4"
        >
          Submit
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Filtered Response</h2>
            <div className="mb-4">
              <label className="font-medium text-gray-700">Multi Filter</label>
              <select 
                multiple 
                onChange={handleSelectChange}
                className="w-full border-2 border-gray-300 p-3 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_alphabet">Highest Alphabet</option>
              </select>
            </div>
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
              {selectedOptions.length === 0 ? (
                <p className="text-center text-gray-600">Please select options to display</p>
              ) : (
                <div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
