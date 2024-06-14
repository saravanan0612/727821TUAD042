import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const calculateAverage = async () => {

    const numbersArray = numbers.split(',').map(num => parseFloat(num.trim()));
    

    if (numbersArray.some(isNaN)) {
      setError('Invalid input: Please enter a list of numbers separated by commas.');
      setAverage(null);
      return;
    }

    try {
      const response = await axios.post('http://localhost:9786/number/e', {
        numbers: numbersArray,
      });
      setAverage(response.data.average);
      setError(null);
    } catch (err) {
      setAverage(null);
      setError(err.response ? err.response.data.error : 'An error occurred while calculating the average.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Average Calculator</h1>
      <input
        type="text"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        placeholder="Enter numbers separated by commas"
      />
      <button onClick={calculateAverage}>Calculate</button>
      {average !== null && <h2>Average: {average}</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
    </div>
  );
}

export default App;
