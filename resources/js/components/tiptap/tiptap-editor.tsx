import { cn } from '@/lib/utils';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Toolbar } from './toolbar';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    editorClassName?: string;
    uploadEndpoint?: string;
    sessionKey?: string;
}

export function TiptapEditor({
    content,
    onChange,
    placeholder,
    className,
    editorClassName,
    uploadEndpoint,
    sessionKey,
}: TiptapEditorProps) {
    const { t } = useTranslation();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-4 hover:text-primary/80',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-border bg-muted px-4 py-2 text-left font-medium',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-border px-4 py-2',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || t('Start writing...'),
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4',
                    '[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6',
                    '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4',
                    '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3',
                    '[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2',
                    '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic',
                    '[&_p]:mb-2',
                    editorClassName,
                ),
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div
            className={cn(
                'rounded-md border border-input bg-background',
                className,
            )}
        >
            <Toolbar
                editor={editor}
                uploadEndpoint={uploadEndpoint}
                sessionKey={sessionKey}
            />
            <EditorContent editor={editor} />
        </div>
    );
}
