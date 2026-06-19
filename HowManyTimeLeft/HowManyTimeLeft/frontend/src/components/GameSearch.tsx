import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GameSearchProps {
  onSearch: (query: string) => void;
}

export function GameSearch({ onSearch }: GameSearchProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search for any game..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 text-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 border-gray-300 dark:border-gray-700 shadow-lg hover:border-gray-400 dark:hover:border-gray-600 focus:border-gray-500 dark:focus:border-gray-500 focus:ring-0 transition-colors"
        />
      </div>
    </div>
  );
}
