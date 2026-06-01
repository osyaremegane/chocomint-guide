export default function StarRating({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating}点 / ${max}点満点`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-amber-400" : "text-zinc-200"}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}
