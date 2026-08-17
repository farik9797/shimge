import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewsCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewsCount }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-amber-400">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-700 ml-1">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && (
        <span className="text-[11px] text-slate-400">({reviewsCount})</span>
      )}
    </div>
  );
};
