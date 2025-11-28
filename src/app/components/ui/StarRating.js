import { Star } from "lucide-react";

export default function StarRating({ rating, size = "sm", showCount = false, count = 0, reviewCount = 0, smartRating = false }) {
    const iconSize = size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5";

    // Logic: If smartRating is enabled and reviews are less than 11, show 5 full stars
    const displayRating = (smartRating && reviewCount < 11) ? 5 : rating;

    return (
        <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`${iconSize} ${i < Math.round(displayRating) ? "fill-current" : "text-gray-200"
                            }`}
                    />
                ))}
            </div>
            {showCount && (
                <span className="text-xs text-gray-500 font-medium ml-1">
                    ({count})
                </span>
            )}
        </div>
    );
}
