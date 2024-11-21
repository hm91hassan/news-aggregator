// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import News from './pages/News';
import Footer from './components/Footer';
import AuthLayout from './layouts/AuthLayout';
import GuestLayout from './layouts/GuestLayout';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex-grow">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <AuthLayout>
                                    <News />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/news"
                            element={
                                <AuthLayout>
                                    <News />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <AuthLayout>
                                    <Profile />
                                </AuthLayout>
                            }
                        />

                        <Route
                            path="/login"
                            element={
                                <GuestLayout>
                                    <Login />
                                </GuestLayout>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <GuestLayout>
                                    <Register />
                                </GuestLayout>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
