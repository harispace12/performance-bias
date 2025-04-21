import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TeamAnalysis } from './pages/TeamAnalysis';
import { EmployeeDeepDive } from './pages/EmployeeDeepDive';
import './App.css'
import { Sidebar } from './components/Sidebar';
import Employee from './pages/Employee';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team-analysis" element={<TeamAnalysis />} />
            <Route path="/employee-deep-dive" element={<EmployeeDeepDive />} />
            <Route path="/employee" element={<Employee />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
