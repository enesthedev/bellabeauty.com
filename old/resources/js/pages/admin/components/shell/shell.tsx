import { SidebarProvider } from '@/components/ui/sidebar';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface ShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
    className?: string;
}

export function Shell({ children, variant = 'header', className }: ShellProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    if (variant === 'header') {
        return (
            <div
                className={`flex min-h-screen w-full flex-col ${className ?? ''}`}
            >
                {children}
            </div>
        );
    }

    return (
        <SidebarProvider defaultOpen={isOpen} className={className}>
            {children}
        </SidebarProvider>
    );
}
