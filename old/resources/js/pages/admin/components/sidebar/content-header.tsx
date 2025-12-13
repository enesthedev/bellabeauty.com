import { SidebarTrigger } from '@/components/ui/sidebar';
import { BreadcrumbItem } from '@/types';
import { Breadcrumbs } from '../shell/breadcrumbs';

export function ContentHeader({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItem[];
}) {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
