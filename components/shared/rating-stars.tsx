import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  size = 'sm',
  showNumber = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  const sizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizes[size],
              star <= Math.round(rating)
                ? 'fill-warning text-warning'
                : 'fill-muted text-muted'
            )}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
