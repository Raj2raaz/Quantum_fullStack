import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from './pages/AuthForm'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App