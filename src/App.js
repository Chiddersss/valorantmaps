import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const getAgents = async () => {
      try {
        const response = await axios.get('https://valorant-api.com/v1/agents');
        setAgents(response.data.data.slice(0, 18));
      } catch (error) {
        console.log(error);
      }
    };
    getAgents();
  }, []);

  const truncateDescription = (description, sentences) => {
    const truncated = description.trim().split('.').slice(0, sentences).join('. ');
    return truncated + '.';
  };

  return (
    <div className="agent-cards-container">
      {agents.map((agent) => (
        <div
          key={agent.uuid}
          className="agent-card"
          style={{
            backgroundImage: `url(${agent.background})`,
          }}
        >
          <div className="agent-info-overlay">
            <div className="agent-name">{agent.displayName}</div>
            <ul>
              {agent.abilities.map((ability) => (
                <li key={ability.slot}>
                  <span className="ability-name">{ability.displayName}</span>
                  <span className="ability-description">
                    {truncateDescription(ability.description, 2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="agent-img" style={{ backgroundImage: `url(${agent.fullPortrait})` }} />
        </div>
      ))}
    </div>
  );
}

export default App;
