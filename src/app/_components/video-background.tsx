"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function VideoBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleLoad = () => setShouldLoad(true);

    if (document.readyState === "complete") {
      setShouldLoad(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none relative h-[45vh] w-full overflow-hidden md:fixed md:inset-y-0 md:right-0 md:left-auto md:z-0 md:h-full md:w-1/2 lg:w-3/5"
      >
        <Image
          src="/media/cover-makeup-video-thumbnail.png"
          alt=""
          fill
          className="object-cover object-top md:object-center"
          priority={true}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        {shouldLoad && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-700 md:object-center"
            onCanPlay={(e) => e.currentTarget.classList.replace("opacity-0", "opacity-100")}
          >
            <source src="/media/cover-makeup-video.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 hidden bg-gradient-to-l from-transparent via-white/10 via-0% to-white/70 md:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent md:hidden" />
      </div>
    </>
  );
}
