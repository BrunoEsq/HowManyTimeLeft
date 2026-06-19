import { useQuery } from '@tanstack/react-query';
import { Star, Clock, Calendar, Gamepad2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { getGameDetails } from '@/services/api';
import type { GameDetails as GameDetailsType } from '@/types/game';

interface GameDetailsProps {
  gameId: number | null;
  onClose: () => void;
}

export function GameDetails({ gameId, onClose }: GameDetailsProps) {
  const { data: game, isLoading } = useQuery<GameDetailsType>({
    queryKey: ['game', gameId],
    queryFn: () => getGameDetails(gameId!),
    enabled: !!gameId,
  });

  if (!gameId) return null;

  return (
    <Dialog open={!!gameId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-black text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : game ? (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-gray-900 dark:text-white">{game.name}</DialogTitle>
            </DialogHeader>

            {game.background_image && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {game.rating > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                    <p className="font-bold text-gray-900 dark:text-white">{game.rating.toFixed(1)}/5</p>
                  </div>
                </div>
              )}

              {game.playtime > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 border-2 border-gray-400 dark:border-gray-600">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-bold text-gray-900 dark:text-white">~{game.playtime}h</p>
                  </div>
                </div>
              )}

              {game.released && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Released</p>
                    <p className="font-bold text-gray-900 dark:text-white">{new Date(game.released).getFullYear()}</p>
                  </div>
                </div>
              )}

              {game.metacritic && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900">
                  <Gamepad2 className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Metacritic</p>
                    <p className="font-bold text-gray-900 dark:text-white">{game.metacritic}</p>
                  </div>
                </div>
              )}
            </div>

            {game.developers && game.developers.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Developer</h3>
                <p className="font-medium text-gray-900 dark:text-white">{game.developers.map(d => d.name).join(', ')}</p>
              </div>
            )}

            {game.description_raw && (
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">About</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{game.description_raw}</p>
              </div>
            )}

            {game.genres && game.genres.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <Badge key={genre.id} className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {game.platforms && game.platforms.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {game.platforms.slice(0, 8).map((p) => (
                    <Badge key={p.platform.id} className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                      {p.platform.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-12 text-gray-600 dark:text-gray-400">
            Failed to load game details
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
