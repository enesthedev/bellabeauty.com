import Image from "next/image";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/media/logo.png"
      alt="Belle Güzellik Logo"
      width={280}
      height={112}
      className={`object-contain ${className}`}
      priority
    />
  );
}
