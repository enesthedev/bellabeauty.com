import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type Comment } from '../columns';

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    comment: Comment | null;
}

export function ViewCommentDialog({ open, onOpenChange, comment }: Props) {
    const { t } = useTranslation();

    if (!comment) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{t('Comment Details')}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16">
                            <AvatarImage
                                src={comment.avatar_url || undefined}
                                alt={comment.author}
                            />
                            <AvatarFallback className="text-xl">
                                {comment.author.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg leading-none font-semibold">
                                {comment.author}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 ${
                                            i < comment.rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h4 className="font-medium text-muted-foreground">
                            {t('Comment')}
                        </h4>
                        <ScrollArea className="h-40 rounded-md border p-4">
                            <p className="text-sm leading-relaxed">
                                {comment.content}
                            </p>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
