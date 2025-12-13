import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import Layout from './components/sidebar/layout';

interface LayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: LayoutProps) => (
    <Layout breadcrumbs={breadcrumbs} className="font-inter" {...props}>
        {children}
    </Layout>
);
