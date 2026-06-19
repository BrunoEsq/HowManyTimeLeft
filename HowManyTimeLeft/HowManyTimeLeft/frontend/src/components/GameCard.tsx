import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden h-full relative group border-2 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all bg-white dark:bg-gray-900">
        <div className="relative aspect-[3/4] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${game.background_image || 'https://via.placeholder.com/300x400?text=No+Image'})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
              {game.name}
            </h3>

            <div className="flex flex-wrap gap-2 items-center">
              {game.rating > 0 && (
                <Badge variant="secondary" className="backdrop-blur-sm bg-white/20 text-white border-white/30">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {game.rating.toFixed(1)}
                </Badge>
              )}

              {game.playtime > 0 && (
                <Badge variant="secondary" className="backdrop-blur-sm bg-white/20 text-white border-white/30">
                  <Clock className="w-3 h-3 mr-1" />
                  {game.playtime}h
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {game.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="text-xs backdrop-blur-sm bg-black/30 text-white border-white/20"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
