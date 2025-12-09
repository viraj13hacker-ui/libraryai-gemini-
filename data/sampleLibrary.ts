export interface LibraryBook {
  title: string;
  author: string;
  publishedYear: string;
  description: string;
  category: string;
}

export const libraryCatalog: LibraryBook[] = [
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    publishedYear: "1999",
    category: "Computer Science",
    description: "A comprehensive guide to software engineering best practices, covering topics from code adaptability to team responsibility."
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    publishedYear: "2008",
    category: "Computer Science",
    description: "A handbook of agile software craftsmanship that emphasizes the importance of writing clean, readable, and maintainable code."
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    publishedYear: "2011",
    category: "History",
    description: "An exploration of the history of the human species, from the Stone Age up to the twenty-first century."
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    publishedYear: "2011",
    category: "Psychology",
    description: "A detailed tour of the two systems that drive the way we think: System 1 is fast and emotional; System 2 is slower and more logical."
  },
  {
    title: "The Structure of Scientific Revolutions",
    author: "Thomas S. Kuhn",
    publishedYear: "1962",
    category: "Philosophy of Science",
    description: "A landmark book in the history of science that introduced the concept of 'paradigm shifts'."
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma et al.",
    publishedYear: "1994",
    category: "Computer Science",
    description: "The classic book on software design patterns, cataloging 23 classic software design patterns."
  },
  {
    title: "1491: New Revelations of the Americas Before Columbus",
    author: "Charles C. Mann",
    publishedYear: "2005",
    category: "History",
    description: "A non-fiction book that argues that the Americas were more populated and sophisticated before the arrival of Europeans than previously thought."
  },
  {
    title: "Silent Spring",
    author: "Rachel Carson",
    publishedYear: "1962",
    category: "Environmental Science",
    description: "An environmental science book that documented the adverse environmental effects caused by the indiscriminate use of pesticides."
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    publishedYear: "1976",
    category: "Biology",
    description: "A book on evolution that builds upon the principal theory of George C. Williams's Adaptation and Natural Selection."
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    publishedYear: "1997",
    category: "History",
    description: "Argues that geographical and environmental factors, not genetic ones, shaped the modern world."
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    publishedYear: "2009",
    category: "Computer Science",
    description: "A comprehensive textbook that covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers."
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    publishedYear: "1942",
    category: "Philosophy",
    description: "A philosophical essay which introduces Camus's philosophy of the absurd: man's futile search for meaning, unity, and clarity."
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    publishedYear: "1980",
    category: "Astronomy",
    description: "Explores the mutual development of science and civilization, covering topics such as the origin of life and the human brain."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    publishedYear: "2016",
    category: "Productivity",
    description: "Rules for focused success in a distracted world, arguing that the ability to focus without distraction is becoming increasingly rare."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    publishedYear: "2018",
    category: "Self-Help",
    description: "A practical and proven framework for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results."
  }
];