
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
    const [showForm, setShowForm] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [refresh, setRefresh] = useState(false);

    // Handle adding and editing employees
    const handleAddEmployee = () => {
        setCurrentEmployee(null);
        setShowForm(true);
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setShowForm(true);
    };

    const handleSave = () => {
        setShowForm(false);
        setRefresh(!refresh); // Toggle to refresh employee list
    };

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Register page route */}
                    <Route path="/signup" element={<Register />} />

                    {/* Login page route */}
                    <Route path="/login" element={<Login />} />

                    {/* Private route for Dashboard with Employee Management */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard>
                                    <h1>Employee Management System</h1>
                                    {!showForm && (
                                        <>
                                            <button onClick={handleAddEmployee}>Add New Employee</button>
                                            <EmployeeList refresh={refresh} onEditEmployee={handleEditEmployee} />
                                        </>
                                    )}
                                    {showForm && (
                                        <EmployeeForm existingEmployee={currentEmployee} onSave={handleSave} />
                                    )}
                                </Dashboard>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
