import PageLayout, { Logo } from "@/components/layouts/page-layout";
import { ActionButtons } from "./_components/action-button";
import { VideoBackground } from "./_components/video-background";

export default function Page() {
  return (
    <PageLayout>
      <VideoBackground />

      <main
        id="main-content"
        className="relative z-10 flex min-h-[55vh] flex-col items-center px-6 pt-4 pb-12 md:fixed md:inset-y-0 md:left-0 md:min-h-screen md:w-1/2 md:items-start md:justify-center md:px-12 lg:w-2/5 lg:px-16"
      >
        <header className="mb-6 flex w-full justify-center md:mb-8 md:justify-start">
          <Logo className="h-20 w-auto md:h-24 lg:h-28" />
        </header>

        <section aria-labelledby="hero-title" className="w-full max-w-md text-center md:max-w-none md:text-left">
          <h1 id="hero-title" className="mb-8 text-2xl font-bold tracking-tight text-gray-900 md:mb-10">
            Kusursuz Anların Adresi
          </h1>

          <ActionButtons />
        </section>
      </main>
    </PageLayout>
  );
}
