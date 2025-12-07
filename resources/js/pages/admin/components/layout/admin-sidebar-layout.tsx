import { AppContent } from '@/pages/admin/components/layout/app-content';
import { AppShell } from '@/pages/admin/components/layout/app-shell';
import { AppSidebar } from '@/pages/admin/components/sidebar/app-sidebar';
import { AppSidebarHeader } from '@/pages/admin/components/layout/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AdminSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}

