import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MessageCircle, Eye, Clock } from 'lucide-react';

const QuestionCard = ({
  id,
  title,
  content,
  author,
  votes,
  answers,
  views,
  tags,
  timestamp,
}) => {
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/question/${id}`} className="block group">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {stripHtml(content)}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-3 ml-6">
          <div className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
            <ArrowUp size={16} />
            <span className="text-sm font-medium">{votes || 0}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{answers || 0}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
            <Eye size={16} />
            <span className="text-sm font-medium">{views || 0}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
        <span>
          Asked by <span className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{author}</span>
        </span>
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;