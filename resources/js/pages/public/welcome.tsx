import AppLogoIcon from '@/components/app-logo-icon';
import { Head } from '@inertiajs/react';
import { MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from './components/action-button';
import { Animated } from './components/animated';
import { CommentsSection } from './components/comments-section';
import { Section } from './components/section';
import { VideoBackground } from './components/video-background';

import Layout from './layout';

interface Comment {
    id: number;
    author: string;
    content: string;
    rating: number;
    avatar_url: string | null;
}

interface Props {
    comments: Comment[];
}

export default function Welcome({ comments }: Props) {
    const { t } = useTranslation();

    return (
        <Layout>
            <Head title={t('Welcome')} />
            <Section id="hero" ariaLabel={t('Home Page')} className="relative">
                <VideoBackground />

                <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 md:w-1/2 md:items-start md:justify-center md:px-12 md:pb-0 lg:w-2/5 lg:px-16">
                    <Animated
                        as="header"
                        className="mb-6 flex w-full justify-center delay-200 md:mb-8"
                    >
                        <AppLogoIcon className="h-44 w-auto" />
                    </Animated>

                    <div className="w-full max-w-md text-center md:max-w-none md:text-left">
                        <nav
                            aria-label={t('Quick Actions')}
                            className="flex w-full flex-col gap-4"
                        >
                            <Animated className="delay-300">
                                <ActionButton
                                    href="https://maps.app.goo.gl/ZEXiuMcWRDHEGtNz8"
                                    icon={
                                        <MapPin
                                            className="size-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    }
                                    label={t('Get Directions')}
                                />
                            </Animated>
                            <Animated className="delay-[400ms]">
                                <ActionButton
                                    href="https://wa.me/905438966543?text=Merhaba%20hizmetleriniz%20hakkında%20bilgi%20almak%20istiyorum"
                                    icon={
                                        <Phone
                                            className="size-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    }
                                    label={t('Book Appointment')}
                                />
                            </Animated>
                        </nav>
                    </div>
                </div>
            </Section>

            <CommentsSection comments={comments} />
        </Layout>
    );
}

