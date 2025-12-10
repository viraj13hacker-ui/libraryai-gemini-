import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { BookCard } from './components/BookCard';
import { LoadingState } from './components/LoadingState';
import { getBookRecommendations } from './services/libraryService';
import { Book, LoadingState as LoadStatus } from './types';
import { AlertCircle, BookOpenCheck, KeyRound, Terminal } from 'lucide-react';

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [isCheckingKey, setIsCheckingKey] = useState<boolean>(true);
  const [isAiStudioAvailable, setIsAiStudioAvailable] = useState<boolean>(false);

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio) {
          setIsAiStudioAvailable(true);
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
        } else {
          setIsAiStudioAvailable(false);
          // Check for env var directly if running locally
          // @ts-ignore
          const envKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY);
          setHasApiKey(!!envKey);
        }
      } catch (e) {
        console.error("Error checking API key status", e);
        // Fallback to false so we show the auth screen
        setHasApiKey(false);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    try {
      if (window.aistudio) {
        await window.aistudio.openSelectKey();
        // Assume success after the modal closes/resolves
        setHasApiKey(true);
        // Reset error state if we had one
        setError(null);
      }
    } catch (e) {
      console.error("Error selecting API key", e);
      setError("Failed to select API key. Please try again.");
    }
  };

  const handleSearch = async (query: string) => {
    setStatus(LoadStatus.SEARCHING);
    setError(null);
    setCurrentQuery(query);
    
    // Simulate a minimum loading time for better UX
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
      
      // If the error specifically mentions the API key, force the key selection screen again
      if (err.message && err.message.includes("API_KEY")) {
        setHasApiKey(false);
        setError("API Key verification failed. Please check your key configuration.");
        setStatus(LoadStatus.IDLE);
      } else {
        setError(err.message || "Something went wrong.");
        setStatus(LoadStatus.ERROR);
      }
    }
  };

  if (isCheckingKey) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-library-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  // API Key Selection Screen
  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in-up">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <KeyRound className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3 text-center">
            Authentication Required
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-center">
            To access the intelligent library research assistant, you need to connect your Google API key.
          </p>

          {isAiStudioAvailable ? (
            <div className="space-y-4">
              <button
                onClick={handleSelectKey}
                className="w-full py-3 px-4 bg-gradient-to-r from-library-600 to-indigo-600 hover:from-library-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Connect API Key
              </button>
              <p className="text-xs text-center text-slate-500">
                Uses Google GenAI SDK. See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Billing Documentation</a>.
              </p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 text-left">
              <div className="flex items-center gap-2 mb-3 text-slate-800 font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Local Setup Instructions</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                It looks like you are running this app locally. You must set the environment variable manually.
              </p>
              <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 font-mono bg-white p-3 rounded border border-slate-100">
                <li>Create a <span className="text-indigo-600">.env</span> file in the root.</li>
                <li>Add: <span className="text-indigo-600">API_KEY=your_key_here</span></li>
                <li>Restart your development server.</li>
              </ol>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center border border-red-100">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

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