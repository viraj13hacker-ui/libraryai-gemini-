import React from 'react';
import { BookOpen, Library } from 'lucide-react';
import { libraryCatalog } from '../data/sampleLibrary';

export const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="flex items-center justify-center gap-3 mb-4 text-library-700">
        <Library className="w-8 h-8 md:w-10 md:h-10" />
        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
          IdeaLibrary
        </h1>
      </div>
      <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base font-light">
        Your intelligent research companion. Searching 
        <span className="font-semibold text-library-600"> {libraryCatalog.length} curated titles </span> 
        from our exclusive catalog to jumpstart your bibliography.
      </p>
    </header>
  );
};