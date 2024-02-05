import { Metadata } from "next";
import Layout from "../../layout/layout";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'MVP IMS',
    description: 'MVP Inventory Management System',
    // robots: { index: false, follow: false },
    // viewport: { initialScale: 1, width: 'device-width' },
    // openGraph: {
    //     type: 'website',
    //     title: 'MVP',
    //     url: 'https://https://marueivietnam.vn/',
    //     description: 'Maruei Viet Nam Precision',
    //     images: ['https://fe.ifsmvp.com:3001/api/home/get-image/logo_mvp.png'],
    //     // ttl: 604800
    // },
    icons: {
        icon: '/logo/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
