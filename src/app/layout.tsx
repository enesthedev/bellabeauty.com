import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://belleguzellik.com"),
  title: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon Hizmetleri",
  description:
    "Belle Güzellik ile profesyonel bakım ve lazer epilasyon hizmetlerimizden yararlanın. Randevu alın ve yol tarifi alın.",
  openGraph: {
    title: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon",
    description: "Belle Güzellik ile profesyonel bakım ve lazer epilasyon hizmetlerimizden yararlanın.",
    images: ["/media/cover-makeup-video-thumbnail.png"],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon",
    description: "Belle Güzellik ile profesyonel bakım ve lazer epilasyon hizmetlerimizden yararlanın.",
    images: ["/media/cover-makeup-video-thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`relative flex flex-col antialiased`}>{children}</body>
    </html>
  );
}
