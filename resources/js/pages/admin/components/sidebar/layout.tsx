import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Content } from '../shell/content';
import { Shell } from '../shell/shell';
import { ContentHeader } from './content-header';
import { Navigation } from './navigation';
import { UserNavigation } from './user-navigation';

export default function Layout({
    children,
    breadcrumbs = [],
    className,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[]; className?: string }>) {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    return (
        <Shell variant="sidebar" className={className}>
            <Sidebar collapsible="icon" variant="inset">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <div className="flex">
                                <Link href={dashboard()} prefetch>
                                    <AppLogo />
                                </Link>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <span className="px-2 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
                        {t('Welcome')},
                        <br />
                        <span className="text-base font-bold">
                            {auth.user.name}
                        </span>
                    </span>
                </SidebarHeader>

                <SidebarContent>
                    <Navigation
                        groups={[
                            {
                                items: [
                                    {
                                        title: 'Overview',
                                        href: dashboard(),
                                    },
                                    {
                                        title: 'Content Management',
                                        children: [
                                            {
                                                title: 'Comments',
                                                href: '/admin/comments',
                                            },
                                            {
                                                title: 'Services',
                                                href: '/admin/services',
                                            },
                                            {
                                                title: 'Posts',
                                                href: '/admin/posts',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </SidebarContent>

                <SidebarFooter>
                    <UserNavigation />
                </SidebarFooter>
            </Sidebar>
            <Content variant="sidebar" className="overflow-x-hidden">
                <ContentHeader breadcrumbs={breadcrumbs} />
                <div className="p-6">{children}</div>
            </Content>
        </Shell>
    );
}
