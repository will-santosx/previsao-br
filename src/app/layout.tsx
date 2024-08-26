import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Previsão Brasil 2.0",
  description: "Recode previsao-br",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={poppins.className + " dark:bg-black"}>
        <div className="px-3 lg:px-[100px] xl:px-[300px] py-5">{children}</div>
      </body>
    </html>
  );
}
