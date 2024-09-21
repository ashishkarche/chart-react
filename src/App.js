import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tradeData, setTradeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data with basic auth from the full API URL
    axios.get('https://chitwanhumad.pythonanywhere.com/get-trade-general/20240921/chart', {
      auth: {
        username: 'tradesafeapi',
        password: 'Ashish0921'
      }
    })
      .then((response) => {
        setTradeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <h1>Trade Data</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Last Price</th>
            <th>Green Candles</th>
            <th>Red Candles</th>
            <th>Stable Candles</th>
            <th>Green Candles Time</th>
            <th>Red Candles Time</th>
            <th>Computed Time</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tradeData.Name).map((key) => (
            <tr key={key}>
              <td>{tradeData.Name[key]}</td>
              <td>{tradeData.Score[key]}</td>
              <td>{tradeData.LastPrice[key]}</td>
              <td>{tradeData["Green Candels"][key]}</td>
              <td>{tradeData["Red Candels"][key]}</td>
              <td>{tradeData["Stable Candels"][key]}</td>
              <td>{tradeData["Green Candles Time"][key]}</td>
              <td>{tradeData["Red Candles Time"][key]}</td>
              <td>{tradeData.computed_time[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
