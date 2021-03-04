import React from 'react';
import LoginScreen from 'screens/login'

import ProjectListScreen from 'screens/project-list'
import { useAuth } from './context/auth-context'
import './App.css';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <ProjectListScreen /> : <LoginScreen />}
    </div>
  );
}

export default App;
