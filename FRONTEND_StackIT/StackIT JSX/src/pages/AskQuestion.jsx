import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';
import { questionService } from '../services/questionService';
import { useAsyncOperation } from '../hooks/useApi';
import { HelpCircle, Tag, FileText } from 'lucide-react';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const { loading, error, execute } = useAsyncOperation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      const questionData = {
        title: title.trim(),
        content: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await execute(() => questionService.createQuestion(questionData));
      navigate('/questions');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Share your question with the community and get helpful answers from experienced developers
          </p>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Writing a good question</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Make your title specific and descriptive</li>
            <li>• Explain what you've tried and what didn't work</li>
            <li>• Include relevant code snippets or error messages</li>
            <li>• Add appropriate tags to help others find your question</li>
            <li>• Be clear about what you're trying to achieve</li>
          </ul>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error.error || 'Failed to create question. Please try again.'}
            </div>
          )}
          
          {/* Title */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-gray-400" />
              <label htmlFor="title" className="text-lg font-semibold text-gray-900">
                Question Title
              </label>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., How do I implement authentication in React with JWT tokens?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
              maxLength={150}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                Be specific and imagine you're asking a question to another person
              </p>
              <span className={`text-sm ${title.length > 140 ? 'text-red-500' : 'text-gray-500'}`}>
                {title.length}/150
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <HelpCircle className="h-5 w-5 text-gray-400" />
              <label className="text-lg font-semibold text-gray-900">
                Question Details
              </label>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Provide all the details about your question. Include what you've tried, what you expected to happen, and what actually happened.
            </p>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Describe your question in detail. Include code snippets, error messages, or any relevant information that will help others understand your problem..."
              height="400px"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-5 w-5 text-gray-400" />
              <label htmlFor="tags" className="text-lg font-semibold text-gray-900">
                Tags
              </label>
            </div>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, javascript, authentication, jwt, hooks"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="mt-2 text-sm text-gray-500">
              Add up to 5 tags to describe what your question is about. Separate tags with commas.
            </p>
            
            {/* Popular tags suggestions */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {['react', 'javascript', 'node.js', 'python', 'go', 'typescript', 'css', 'html'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);
                      if (!currentTags.includes(tag)) {
                        setTags(currentTags.concat(tag).join(', '));
                      }
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <button
              type="button"
              onClick={() => navigate('/questions')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !content.trim() || loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Posting...</span>
                </>
              ) : (
                <span>Post Question</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;