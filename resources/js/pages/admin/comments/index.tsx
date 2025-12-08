import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { MessageSquare, Plus, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layout';
import { CreateCommentDialog } from './components/create-comment-dialog';

interface Comment {
    id: number;
    author: string;
    content: string;
    rating: number;
    is_active: boolean;
    avatar_url: string | null;
    created_at: string;
}

interface Props {
    comments: Comment[];
}

export default function CommentsIndex({ comments }: Props) {
    const { t } = useTranslation();
    const [dialogOpen, setDialogOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Comments'),
            href: '/admin/comments',
        },
    ];

    const handleDelete = (id: number) => {
        if (confirm(t('Are you sure you want to delete this comment?'))) {
            router.delete(`/admin/comments/${id}`);
        }
    };

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
        <Layout breadcrumbs={breadcrumbs}>
            <Head title={t('Comments')} />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageSquare className="size-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">
                                {t('Comments')}
                            </h1>
                            <p className="text-muted-foreground">
                                {t('Manage customer reviews and testimonials')}
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => setDialogOpen(true)}>
                        <Plus className="mr-2 size-4" />
                        {t('Add Comment')}
                    </Button>
                </div>

                {comments.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center py-12">
                        <MessageSquare className="mb-4 size-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-medium">
                            {t('No comments yet')}
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                            {t('Add your first customer comment')}
                        </p>
                        <Button onClick={() => setDialogOpen(true)}>
                            <Plus className="mr-2 size-4" />
                            {t('Add Comment')}
                        </Button>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {comments.map((comment) => (
                            <Card key={comment.id} className="relative">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage
                                                    src={
                                                        comment.avatar_url ||
                                                        undefined
                                                    }
                                                    alt={comment.author}
                                                />
                                                <AvatarFallback>
                                                    {comment.author
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-base">
                                                    {comment.author}
                                                </CardTitle>
                                                <div className="flex items-center gap-1 pt-1">
                                                    {renderStars(
                                                        comment.rating,
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                comment.is_active
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {comment.is_active
                                                ? t('Active')
                                                : t('Inactive')}
                                        </Badge>
                                    </div>
                                    <CardDescription className="mt-3 line-clamp-3">
                                        "{comment.content}"
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(
                                            comment.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        <Trash2 className="mr-1 size-4" />
                                        {t('Delete')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <CreateCommentDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </Layout>
    );
}
