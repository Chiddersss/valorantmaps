import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Import a CSS file to style the agent cards

function App() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const getAgents = async () => {
      try {
        const response = await axios.get('https://valorant-api.com/v1/agents');
        setAgents(response.data.data.slice(0, 18)); // set how many agents you want 
      } catch (error) {
        console.log(error);
      }
    };
    getAgents();
  }, []);

  return (
    <div className="agent-cards-container">
      {agents.map((agent) => (
        <div
          key={agent.uuid}
          className="agent-card"
          style={{
            background: `url(${agent.fullPortrait}) center/cover, url(${agent.background}) center/cover`,
            backgroundSize: '110%', // set background size to a larger value
          }}
        >
          <div className="agent-info-overlay">
            <h2>{agent.displayName}</h2>
            <ul>
              {agent.abilities.map((ability) => (
                <li key={ability.slot}>
                  {ability.displayName} - 
                  {ability.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
