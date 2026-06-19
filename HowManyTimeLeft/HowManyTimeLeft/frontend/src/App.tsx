import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { GameSearch } from '@/components/GameSearch';
import { GameCard } from '@/components/GameCard';
import { GameDetails } from '@/components/GameDetails';
import SkyToggle from '@/components/ui/sky-toggle';
import { useTheme } from '@/hooks/useTheme';
import { searchGames } from '@/services/api';
import type { Game } from '@/types/game';

function App() {
  // Initialize theme
  useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['games', searchQuery],
    queryFn: () => searchGames(searchQuery),
    enabled: searchQuery.length > 0,
  });

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <SkyToggle />
      </div>
      <BackgroundPaths>
        <div className="space-y-12 py-12">
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900 dark:text-white">
                How Many Time Left
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover game durations and find your next adventure
              </p>
            </div>

            <GameSearch onSearch={setSearchQuery} />
          </div>

        {searchQuery && (
          <div className="mt-12">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
              </div>
            ) : data?.results && data.results.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                  Found {data.count} games
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {data.results.map((game: Game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onClick={() => setSelectedGameId(game.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  No games found. Try a different search.
                </p>
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12 space-y-4">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Start searching to discover games and their durations
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Zelda', 'Elden Ring', 'Minecraft', 'GTA V'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors font-medium border border-gray-300 dark:border-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <GameDetails
        gameId={selectedGameId}
        onClose={() => setSelectedGameId(null)}
      />
    </BackgroundPaths>
    </>
  );
}

export default App;
