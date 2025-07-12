@@ .. @@
 import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
+import { AuthProvider } from './context/AuthContext';
+import ProtectedRoute from './components/ProtectedRoute';
 import Home from './pages/Home';
 import Questions from './pages/Questions';
 import QuestionDetail from './pages/QuestionDetail';
 import AskQuestion from './pages/AskQuestion';
 import Communities from './pages/Communities';
 import Articles from './pages/Articles';
+import Login from './pages/Login';
+import Signup from './pages/Signup';

 function App() {
   return (
-    <Router>
-      <div className="App">
-        <Routes>
-          <Route path="/" element={<Home />} />
-          <Route path="/questions" element={<Questions />} />
-          <Route path="/question/:id" element={<QuestionDetail />} />
-          <Route path="/ask" element={<AskQuestion />} />
-          <Route path="/communities" element={<Communities />} />
-          <Route path="/articles" element={<Articles />} />
-        </Routes>
-      </div>
-    </Router>
+    <AuthProvider>
+      <Router>
+        <div className="App">
+          <Routes>
+            <Route path="/login" element={<Login />} />
+            <Route path="/signup" element={<Signup />} />
+            <Route path="/" element={
+              <ProtectedRoute>
+                <Home />
+              </ProtectedRoute>
+            } />
+            <Route path="/questions" element={
+              <ProtectedRoute>
+                <Questions />
+              </ProtectedRoute>
+            } />
+            <Route path="/question/:id" element={
+              <ProtectedRoute>
+                <QuestionDetail />
+              </ProtectedRoute>
+            } />
+            <Route path="/ask" element={
+              <ProtectedRoute>
+                <AskQuestion />
+              </ProtectedRoute>
+            } />
+            <Route path="/communities" element={
+              <ProtectedRoute>
+                <Communities />
+              </ProtectedRoute>
+            } />
+            <Route path="/articles" element={
+              <ProtectedRoute>
+                <Articles />
+              </ProtectedRoute>
+            } />
+          </Routes>
+        </div>
+      </Router>
+    </AuthProvider>
   );
 }