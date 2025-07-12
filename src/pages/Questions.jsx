@@ .. @@
-import React from 'react';
+import React, { useState, useEffect } from 'react';
 import Navbar from '../components/Navbar';
 import Sidebar from '../components/Sidebar';
 import QuestionCard from '../components/QuestionCard';
 import CommunityInfo from '../components/CommunityInfo';
+import { questionService } from '../services/questionService';

 const Questions = () => {
-  const sampleQuestions = [
-    {
-      id: 1,
-      title: "How to implement authentication in React?",
-      content: "I'm building a React application and need to implement user authentication. What are the best practices for handling login, logout, and protecting routes?",
-      author: "johndoe",
-      votes: 15,
-      answers: 8,
-      views: 342,
-      tags: ["react", "authentication", "javascript"],
-      timestamp: "2 hours ago"
-    },
-    {
-      id: 2,
-      title: "Best practices for state management in large applications",
-      content: "What are the recommended approaches for managing state in large-scale React applications? Should I use Redux, Context API, or something else?",
-      author: "developer123",
-      votes: 23,
-      answers: 12,
-      views: 567,
-      tags: ["react", "state-management", "redux"],
-      timestamp: "4 hours ago"
-    },
-    {
-      id: 3,
-      title: "How to optimize React performance for large lists?",
-      content: "I have a component that renders thousands of items and it's getting slow. What are the best techniques to optimize performance?",
-      author: "codemaster",
-      votes: 31,
-      answers: 15,
-      views: 789,
-      tags: ["react", "performance", "optimization"],
-      timestamp: "6 hours ago"
-    },
-    {
-      id: 4,
-      title: "TypeScript vs JavaScript: When to use which?",
-      content: "I'm deciding whether to use TypeScript or stick with JavaScript for my next project. What are the pros and cons of each?",
-      author: "webdev_pro",
-      votes: 42,
-      answers: 20,
-      views: 1234,
-      tags: ["typescript", "javascript", "development"],
-      timestamp: "1 day ago"
-    }
-  ];
+  const [questions, setQuestions] = useState([]);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState('');
+  const [page, setPage] = useState(1);
+  const [totalCount, setTotalCount] = useState(0);

+  useEffect(() => {
+    fetchQuestions();
+  }, [page]);
+
+  const fetchQuestions = async () => {
+    try {
+      setLoading(true);
+      const response = await questionService.getQuestions(page, 10);
+      
+      if (response.question_items) {
+        setQuestions(response.question_items);
+        setTotalCount(response.total_count || 0);
+      }
+    } catch (error) {
+      setError('Failed to fetch questions');
+      console.error('Error fetching questions:', error);
+    } finally {
+      setLoading(false);
+    }
+  };
+
+  const formatTimestamp = (dateString) => {
+    const date = new Date(dateString);
+    const now = new Date();
+    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
+    
+    if (diffInHours < 1) return 'Just now';
+    if (diffInHours < 24) return `${diffInHours} hours ago`;
+    const diffInDays = Math.floor(diffInHours / 24);
+    return `${diffInDays} days ago`;
+  };

   return (
@@ .. @@
             <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Popular Questions</h1>
-              <p className="text-gray-600">Browse through the most asked and trending questions</p>
+              <p className="text-gray-600">
+                Browse through the most asked and trending questions ({totalCount} total)
+              </p>
             </div>
             
-            <div className="space-y-6">
-              {sampleQuestions.map((question) => (
-                <QuestionCard key={question.id} {...question} />
-              ))}
-            </div>
+            {loading ? (
+              <div className="flex justify-center items-center py-12">
+                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
+              </div>
+            ) : error ? (
+              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
+                {error}
+              </div>
+            ) : questions.length === 0 ? (
+              <div className="text-center py-12">
+                <p className="text-gray-500 text-lg">No questions found.</p>
+              </div>
+            ) : (
+              <div className="space-y-6">
+                {questions.map((question) => (
+                  <QuestionCard 
+                    key={question.question_id} 
+                    id={question.question_id}
+                    title={question.title}
+                    content={question.content}
+                    author={question.user_id}
+                    votes={question.upvote}
+                    answers={0} // You'll need to implement answer counting
+                    views={Math.floor(Math.random() * 1000)} // Placeholder
+                    tags={question.tags || []}
+                    timestamp={formatTimestamp(question.created_at)}
+                  />
+                ))}
+              </div>
+            )}
           </div>
           
           <aside className="w-80">