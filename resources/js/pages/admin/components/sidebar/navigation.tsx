import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function NavItemLink({ item }: { item: NavItem }) {
    const page = usePage();
    const { t } = useTranslation();

    const isActive = item.href
        ? page.url.startsWith(resolveUrl(item.href))
        : false;

    return (
        <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={{ children: t(item.title) }}
        >
            <Link href={item.href ?? '#'} prefetch>
                {item.icon && <item.icon />}
                <span>{t(item.title)}</span>
            </Link>
        </SidebarMenuButton>
    );
}

function NavItemWithChildren({ item }: { item: NavItem }) {
    const page = usePage();
    const { t } = useTranslation();

    return (
        <Collapsible asChild defaultOpen={true} className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={{ children: t(item.title) }}>
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {item.children?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={
                                        child.href
                                            ? page.url.startsWith(
                                                  resolveUrl(child.href),
                                              )
                                            : false
                                    }
                                >
                                    <Link href={child.href ?? '#'} prefetch>
                                        {child.icon && <child.icon />}
                                        <span>{t(child.title)}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

function NavMenuItems({ items }: { items: NavItem[] }) {
    return (
        <SidebarMenu>
            {items.map((item) => {
                if (item.children && item.children.length > 0) {
                    return <NavItemWithChildren key={item.title} item={item} />;
                }

                return (
                    <SidebarMenuItem key={item.title}>
                        <NavItemLink item={item} />
                        {item.badge !== undefined && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                        )}
                    </SidebarMenuItem>
                );
            })}
        </SidebarMenu>
    );
}

export function Navigation({ groups = [] }: { groups: NavGroup[] }) {
    const { t } = useTranslation();

    return (
        <>
            {groups.map((group, groupIndex) => (
                <SidebarGroup key={groupIndex} className="px-2 py-2">
                    {group.title && (
                        <SidebarGroupLabel>{t(group.title)}</SidebarGroupLabel>
                    )}
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <NavMenuItems items={group.items} />
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    );
}
