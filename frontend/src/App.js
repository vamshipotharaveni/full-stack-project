import React, { useEffect, useState } from 'react';
import RentalList from './components/RentalList';
import { rentalAPI } from './services/api';
import './App.css';

function App() {
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      await rentalAPI.healthCheck();
      setIsBackendConnected(true);
      setConnectionError(null);
    } catch (error) {
      setIsBackendConnected(false);
      setConnectionError('Unable to connect to backend. Please ensure the backend server is running.');
      console.error('Backend connection failed:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏠 Rental Finder</h1>
        <p>Find your perfect rental property</p>
        <div className="connection-status">
          {isBackendConnected ? (
            <span className="status-connected">✅ Backend Connected</span>
          ) : (
            <span className="status-disconnected">❌ Backend Disconnected</span>
          )}
        </div>
      </header>
      
      <main className="App-main">
        {connectionError && (
          <div className="connection-error">
            <p>{connectionError}</p>
            <button onClick={checkBackendConnection} className="retry-btn">
              Retry Connection
            </button>
          </div>
        )}
        
        <RentalList />
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2024 Rental Finder. Built with Spring Boot & React.</p>
      </footer>
    </div>
  );
}

export default App;
