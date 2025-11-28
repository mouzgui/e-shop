"use client";

import { useState } from "react";
import { Star, User } from "lucide-react";
import useSWR, { mutate } from "swr";
import Button from "./ui/Button";
import { useToast } from "../context/ToastContext";
import StarRating from "./ui/StarRating";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductReviews({ productId }) {
    const { addToast } = useToast();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: reviews = [], isLoading } = useSWR(
        `/api/reviews?product_id=${productId}`,
        fetcher
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productId,
                    review: comment,
                    reviewer: name,
                    reviewer_email: "guest@example.com", // Placeholder email as per plan
                    rating,
                }),
            });

            if (!res.ok) throw new Error("Failed to submit review");

            addToast("Review submitted successfully!", "success");
            setComment("");
            setName("");
            setRating(5);
            mutate(`/api/reviews?product_id=${productId}`); // Refresh reviews
        } catch (error) {
            addToast("Failed to submit review. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Reviews List */}
                <div className="space-y-8">
                    {isLoading ? (
                        <div className="text-gray-500">Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div className="text-gray-500 italic">
                            No reviews yet. Be the first to review this product!
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-50 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-500" />
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            {review.reviewer}
                                        </span>
                                    </div>
                                    <StarRating rating={review.rating} size="sm" />
                                </div>
                                <div
                                    className="text-gray-600 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: review.review }}
                                />
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(review.date_created).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                {/* Review Form */}
                <div className="bg-gray-50 rounded-3xl p-8 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Write a Review</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating
                            </label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-6 h-6 ${star <= rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Review
                            </label>
                            <textarea
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Share your thoughts about this product..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full justify-center"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
