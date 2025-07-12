import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Questions from './pages/Questions';
import QuestionDetail from './pages/QuestionDetail';
import AskQuestion from './pages/AskQuestion';
import Communities from './pages/Communities';
import Articles from './pages/Articles';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/questions" element={
              <ProtectedRoute>
                <Layout>
                  <Questions />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/question/:id" element={
              <ProtectedRoute>
                <Layout>
                  <QuestionDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/ask" element={
              <ProtectedRoute>
                <Layout>
                  <AskQuestion />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/communities" element={
              <ProtectedRoute>
                <Layout>
                  <Communities />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/articles" element={
              <ProtectedRoute>
                <Layout>
                  <Articles />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;