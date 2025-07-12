@@ .. @@
-import React, { useState } from 'react';
+import React, { useState, useEffect } from 'react';
 import { useParams } from 'react-router-dom';
 import Navbar from '../components/Navbar';
 import Sidebar from '../components/Sidebar';
 import RichTextEditor from '../components/RichTextEditor';
+import { questionService } from '../services/questionService';
 import { ArrowUp, ArrowDown, MessageCircle, Eye, Award } from 'lucide-react';

 const QuestionDetail = () => {
   const { id } = useParams();
+  const [question, setQuestion] = useState(null);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState('');
   const [answer, setAnswer] = useState('');
-  const [votes, setVotes] = useState({ up: 15, down: 2 });
   const [userVote, setUserVote] = useState(null);
+  const [upvoting, setUpvoting] = useState(false);

-  const handleVote = (type) => {
-    if (userVote === type) {
-      setUserVote(null);
-      setVotes(prev => ({ ...prev, [type]: prev[type] - 1 }));
-    } else {
-      if (userVote) {
-        setVotes(prev => ({ ...prev, [userVote]: prev[userVote] - 1 }));
+  useEffect(() => {
+    fetchQuestion();
+  }, [id]);
+
+  const fetchQuestion = async () => {
+    try {
+      setLoading(true);
+      const response = await questionService.getQuestionById(id);
+      setQuestion(response);
+    } catch (error) {
+      setError('Failed to fetch question');
+      console.error('Error fetching question:', error);
+    } finally {
+      setLoading(false);
+    }
+  };
+
+  const handleUpvote = async () => {
+    try {
+      setUpvoting(true);
+      await questionService.upvoteQuestion(id);
+      // Refresh question data to get updated vote count
+      await fetchQuestion();
+    } catch (error) {
+      console.error('Error upvoting question:', error);
+    } finally {
+      setUpvoting(false);
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
+
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gray-50">
+        <Navbar />
+        <Sidebar />
+        <main className="ml-64 pt-20 p-8">
+          <div className="flex justify-center items-center py-12">
+            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
+          </div>
+        </main>
+      </div>
+    );
+  }
+
+  if (error || !question) {
+    return (
+      <div className="min-h-screen bg-gray-50">
+        <Navbar />
+        <Sidebar />
+        <main className="ml-64 pt-20 p-8">
+          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
+            {error || 'Question not found'}
+          </div>
+        </main>
+      </div>
+    );
+  }
+
+  // Sample answers for now - you'll need to implement answer service
+  const sampleAnswers = [];
+
+  return (
+    <div className="min-h-screen bg-gray-50">
+      <Navbar />
+      <Sidebar />
+      
+      <main className="ml-64 pt-20 p-8">
+        <div className="max-w-4xl mx-auto">
+          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
+            <div className="flex gap-6">
+              <div className="flex flex-col items-center space-y-2">
+                <button
+                  onClick={handleUpvote}
+                  disabled={upvoting}
+                  className={`p-2 rounded-full transition-colors ${
+                    upvoting
+                      ? 'bg-gray-100 text-gray-400'
+                      : 'hover:bg-gray-100 text-gray-600'
+                  }`}
+                >
+                  <ArrowUp size={24} />
+                </button>
+                <span className="text-xl font-bold text-gray-900">{question.upvote || 0}</span>
+                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
+                  <ArrowDown size={24} />
+                </button>
+              </div>
+              
+              <div className="flex-1">
+                <h1 className="text-2xl font-bold text-gray-900 mb-4">
+                  {question.title}
+                </h1>
+                <div className="text-gray-700 mb-6">
+                  <div dangerouslySetInnerHTML={{ __html: question.content }} />
+                </div>
+                
+                <div className="flex flex-wrap gap-2 mb-4">
+                  {question.tags?.map((tag) => (
+                    <span
+                      key={tag}
+                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
+                    >
+                      {tag}
+                    </span>
+                  ))}
+                </div>
+                
+                <div className="flex items-center justify-between text-sm text-gray-500">
+                  <div className="flex items-center space-x-4">
+                    <div className="flex items-center space-x-1">
+                      <Eye size={16} />
+                      <span>{Math.floor(Math.random() * 1000)} views</span>
+                    </div>
+                    <div className="flex items-center space-x-1">
+                      <MessageCircle size={16} />
+                      <span>{sampleAnswers.length} answers</span>
+                    </div>
+                  </div>
+                  <span>
+                    Asked {formatTimestamp(question.created_at)} by{' '}
+                    <span className="font-medium text-blue-600">{question.user_id}</span>
+                  </span>
+                </div>
+              </div>
+            </div>
+          </div>

+          <div className="mb-8">
+            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Answer</h2>
+            <RichTextEditor
+              value={answer}
+              onChange={setAnswer}
+              placeholder="Share your knowledge and help the community..."
+              height="300px"
+            />
+            <div className="mt-4">
+              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
+                Post Answer
+              </button>
+            </div>
+          </div>

+          <div className="space-y-6">
+            <h2 className="text-xl font-bold text-gray-900">{sampleAnswers.length} Answers</h2>
+            
+            {sampleAnswers.length === 0 ? (
+              <div className="text-center py-8">
+                <p className="text-gray-500">No answers yet. Be the first to answer!</p>
+              </div>
+            ) : (
+              sampleAnswers.map((answer) => (
+                <div key={answer.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
+                  {/* Answer content here */}
+                </div>
+              ))
+            )}
+          </div>
+        </div>
+      </main>
+    </div>
+  );
+};

+export default QuestionDetail;