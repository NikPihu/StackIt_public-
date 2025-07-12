import React from 'react';
import { FileText, Clock, User, TrendingUp } from 'lucide-react';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'Building Scalable React Applications: Best Practices and Patterns',
      excerpt: 'Learn how to structure your React applications for maintainability and scalability. This comprehensive guide covers component architecture, state management, and performance optimization.',
      author: 'Sarah Johnson',
      readTime: '12 min read',
      publishedAt: '2 days ago',
      tags: ['react', 'architecture', 'best-practices'],
      views: 1234,
      featured: true
    },
    {
      id: 2,
      title: 'Understanding JWT Authentication in Node.js',
      excerpt: 'A deep dive into JSON Web Tokens and how to implement secure authentication in your Node.js applications. Includes practical examples and security considerations.',
      author: 'Mike Chen',
      readTime: '8 min read',
      publishedAt: '1 week ago',
      tags: ['nodejs', 'authentication', 'security'],
      views: 892,
      featured: false
    },
    {
      id: 3,
      title: 'Python for Data Science: Getting Started with Pandas',
      excerpt: 'Master the fundamentals of data manipulation with Pandas. This tutorial covers data loading, cleaning, transformation, and basic analysis techniques.',
      author: 'Dr. Emily Rodriguez',
      readTime: '15 min read',
      publishedAt: '3 days ago',
      tags: ['python', 'data-science', 'pandas'],
      views: 2156,
      featured: true
    },
    {
      id: 4,
      title: 'Microservices with Go: A Practical Guide',
      excerpt: 'Learn how to build and deploy microservices using Go. Covers service design, communication patterns, and deployment strategies.',
      author: 'Alex Thompson',
      readTime: '20 min read',
      publishedAt: '5 days ago',
      tags: ['go', 'microservices', 'backend'],
      views: 756,
      featured: false
    },
    {
      id: 5,
      title: 'CSS Grid vs Flexbox: When to Use Which',
      excerpt: 'A comprehensive comparison of CSS Grid and Flexbox layout systems. Learn when to use each approach for optimal web layouts.',
      author: 'Lisa Park',
      readTime: '6 min read',
      publishedAt: '1 week ago',
      tags: ['css', 'layout', 'frontend'],
      views: 1543,
      featured: false
    },
    {
      id: 6,
      title: 'Docker Best Practices for Development Teams',
      excerpt: 'Optimize your development workflow with Docker. This guide covers containerization strategies, multi-stage builds, and team collaboration.',
      author: 'David Kumar',
      readTime: '10 min read',
      publishedAt: '4 days ago',
      tags: ['docker', 'devops', 'development'],
      views: 987,
      featured: false
    }
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles</h1>
          <p className="text-gray-600 text-lg">
            Discover in-depth articles and tutorials from the community
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <div key={article.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 p-6 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      Featured
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <TrendingUp size={14} />
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <span>{article.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <FileText size={14} />
                    <span>Article</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <TrendingUp size={14} />
                    <span>{article.views} views</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span className="truncate">{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <span className="text-xs">{article.publishedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Write Article CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Knowledge
          </h2>
          <p className="text-gray-600 mb-6">
            Write an article and help other developers learn from your experience
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Write Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default Articles;