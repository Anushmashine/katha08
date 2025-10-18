// Frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
<<<<<<< HEAD
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './Routes';
import { Toaster } from 'sonner'; // 1. IMPORT THE TOASTER
=======
// import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory'; // <-- COMMENTED OUT
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './Routes';
import { Toaster } from 'sonner';
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <AuthProvider>
        <div className="App">
          <Toaster richColors position="top-right" /> {/* 2. ADD THE TOASTER COMPONENT HERE */}
          <AppRoutes />
        </div>
      </AuthProvider>
=======
      {/* ⚠️ TEMPORARILY DISABLED Auth0 Social Login */}
      {/* <Auth0ProviderWithHistory> */}
        <AuthProvider>
          <div className="App">
            <Toaster richColors position="top-right" />
            <AppRoutes />
          </div>
        </AuthProvider>
      {/* </Auth0ProviderWithHistory> */}
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    </Router>
  );
}

export default App;