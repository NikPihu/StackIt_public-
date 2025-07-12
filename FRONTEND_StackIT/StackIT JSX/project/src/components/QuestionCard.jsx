import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, MessageCircle, Eye } from 'lucide-react';

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
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/question/${id}`} className="block group">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{content}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-2 ml-4">
          <div className="flex items-center space-x-1 text-gray-500">
            <ArrowUp size={16} />
            <span className="text-sm font-medium">{votes}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MessageCircle size={16} />
            <span className="text-sm font-medium">{answers}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Eye size={16} />
            <span className="text-sm font-medium">{views}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Asked by <span className="font-medium text-blue-600">{author}</span></span>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

export default QuestionCard;