import React from 'react';
import { Book as BookType } from '../types';
import { BookOpen, User, Calendar, Tag } from 'lucide-react';

interface BookCardProps {
  book: BookType;
  index: number;
}

export const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:border-library-200 transition-all duration-300 flex flex-col h-full animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-2 bg-gradient-to-r from-library-400 to-indigo-400"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
            <Tag className="w-3 h-3" /> {book.category || 'General'}
          </span>
          {book.publishedYear && (
             <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
               <Calendar className="w-3 h-3" /> {book.publishedYear}
             </span>
          )}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 leading-tight">
          {book.title}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 font-medium">
          <User className="w-4 h-4 text-library-500" />
          <span>{book.author}</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 border-l-2 border-slate-200 pl-3 italic">
          "{book.description}"
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100">
           <h4 className="text-xs font-bold text-library-600 uppercase tracking-wide mb-2 flex items-center gap-1">
             <BookOpen className="w-3 h-3" /> Research Relevance
           </h4>
           <p className="text-sm text-slate-700 leading-snug">
             {book.relevance}
           </p>
        </div>
      </div>
      
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
         <span className="text-xs text-slate-400 font-mono">ID: LIB-{Math.floor(Math.random() * 10000)}</span>
         <button className="text-sm text-library-600 hover:text-library-800 font-medium transition-colors">
            Find in Catalog &rarr;
         </button>
      </div>
    </div>
  );
};
