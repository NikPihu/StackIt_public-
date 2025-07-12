@@ .. @@
-import React, { useState } from 'react';
+import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import Navbar from '../components/Navbar';
 import Sidebar from '../components/Sidebar';
 import RichTextEditor from '../components/RichTextEditor';
+import { questionService } from '../services/questionService';

 const AskQuestion = () => {
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const [tags, setTags] = useState('');
+  const [loading, setLoading] = useState(false);
+  const [error, setError] = useState('');

   const handleSubmit = async (e) => {
     e.preventDefault();
-    // Here you would typically send the data to your backend
-    console.log({ title, content, tags });
-    // Redirect to questions page after submission
-    navigate('/questions');
+    setLoading(true);
+    setError('');
+
+    try {
+      const questionData = {
+        title,
+        content,
+        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
+      };
+
+      await questionService.createQuestion(questionData);
+      navigate('/questions');
+    } catch (error) {
+      setError(error.error || 'Failed to create question. Please try again.');
+    } finally {
+      setLoading(false);
+    }
   };

@@ .. @@
           </div>
           
           <form onSubmit={handleSubmit} className="space-y-6">
+            {error && (
+              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
+                {error}
+              </div>
+            )}
+            
             <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
@@ .. @@
               <button
                 type="submit"
-                disabled={!title.trim() || !content.trim()}
-                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
+                disabled={!title.trim() || !content.trim() || loading}
+                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200"
               >
-                Post Question
+                {loading ? 'Posting...' : 'Post Question'}
               </button>
             </div>
           </form>