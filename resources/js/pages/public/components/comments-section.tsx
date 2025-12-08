import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Animated } from './animated';
import { Section } from './section';

interface Comment {
    id: number;
    author: string;
    content: string;
    rating: number;
    avatar_url: string | null;
}

interface Props {
    comments: Comment[];
}

export function CommentsSection({ comments }: Props) {
    const { t } = useTranslation();

    if (comments.length === 0) {
        return null;
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`size-4 ${i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <Section
            id="comments"
            ariaLabel={t('Customer Reviews')}
            className="bg-gradient-to-br from-rose-50 to-pink-100"
        >
            <div className="container mx-auto px-4 py-16 md:py-24">
                <Animated className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                        {t('What Our Clients Say')}
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        {t('Hear from our satisfied customers about their experience')}
                    </p>
                </Animated>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {comments.map((comment, index) => (
                        <Animated
                            key={comment.id}
                            className={`delay-[${(index + 1) * 100}ms]`}
                        >
                            <div className="h-full rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.02]">
                                <div className="mb-4 flex items-center gap-4">
                                    {comment.avatar_url ? (
                                        <img
                                            src={comment.avatar_url}
                                            alt={comment.author}
                                            className="size-14 rounded-full object-cover ring-2 ring-rose-200"
                                        />
                                    ) : (
                                        <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-xl font-bold text-white ring-2 ring-rose-200">
                                            {comment.author.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            {comment.author}
                                        </h3>
                                        <div className="flex items-center gap-0.5">
                                            {renderStars(comment.rating)}
                                        </div>
                                    </div>
                                </div>
                                <blockquote className="relative text-gray-600">
                                    <span className="absolute -top-2 -left-2 text-4xl text-rose-200">
                                        "
                                    </span>
                                    <p className="pl-4 italic">{comment.content}</p>
                                    <span className="absolute -bottom-4 right-0 text-4xl text-rose-200">
                                        "
                                    </span>
                                </blockquote>
                            </div>
                        </Animated>
                    ))}
                </div>
            </div>
        </Section>
    );
}
