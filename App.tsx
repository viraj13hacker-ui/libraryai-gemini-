import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { BookCard } from './components/BookCard';
import { LoadingState } from './components/LoadingState';
import { getBookRecommendations } from './services/libraryService';
import { Book, LoadingState as LoadStatus } from './types';
import { AlertCircle, BookOpenCheck } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setStatus(LoadStatus.SEARCHING);
    setError(null);
    setCurrentQuery(query);
    
    // Simulate a minimum loading time for better UX (so the user sees the transition)
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const [fetchedBooks] = await Promise.all([
        getBookRecommendations(query),
        minLoadTime
      ]);
      setBooks(fetchedBooks);
      setStatus(LoadStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
      setStatus(LoadStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 relative z-0">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-slate-200/50 to-transparent z-[-1] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl px-4 pt-4">
        <Header />
        
        <div className="mt-6 mb-12">
          <SearchInput onSearch={handleSearch} isLoading={status === LoadStatus.SEARCHING} />
        </div>

        {/* Content Area */}
        <main>
          {status === LoadStatus.SEARCHING && (
            <div className="text-center">
              <p className="text-slate-500 mb-6 font-medium animate-pulse">Scanning library archives for "{currentQuery}"...</p>
              <LoadingState />
            </div>
          )}

          {status === LoadStatus.ERROR && (
            <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Search Failed</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button 
                onClick={() => handleSearch(currentQuery)}
                className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium shadow-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {status === LoadStatus.SUCCESS && books.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-2">
                  <BookOpenCheck className="text-library-500" />
                  Curated Collection
                </h2>
                <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                  Found {books.length} resources for "{currentQuery}"
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book, index) => (
                  <BookCard key={`${book.title}-${index}`} book={book} index={index} />
                ))}
              </div>
            </div>
          )}

          {status === LoadStatus.SUCCESS && books.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-slate-500 font-serif">No books found for this topic. Please try a different query.</p>
            </div>
          )}

          {status === LoadStatus.IDLE && (
            <div className="text-center py-20 opacity-40 select-none">
              <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto blur-sm">
                 {/* Decorative placeholder background for idle state */}
                 {[...Array(10)].map((_, i) => (
                   <div key={i} className="h-32 bg-slate-200 rounded-md"></div>
                 ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0; 
        }
        .animate-fade-in {
          animation: opacity 0.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
}