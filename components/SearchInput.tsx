import React, { useState, KeyboardEvent } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative z-10">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-library-300 to-indigo-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-library-400 focus-within:border-transparent">
          <div className="pl-6 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            className="w-full py-5 px-4 text-lg text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none font-medium"
            placeholder="e.g., The sociology of remote work..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <div className="pr-2">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !query.trim()}
              className={`p-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                query.trim() && !isLoading
                  ? 'bg-library-600 text-white hover:bg-library-700 shadow-md transform hover:scale-105'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Sparkles className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Suggestions */}
      {!query && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs md:text-sm text-slate-500">
          <span className="opacity-70">Try:</span>
          {["Quantum Computing Basics", "History of Coffee", "Stoicism in Modern Life", "Sustainable Urban Planning"].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
              className="px-3 py-1 bg-white border border-slate-200 rounded-full hover:bg-library-50 hover:border-library-300 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
