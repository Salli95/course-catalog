import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Каталог курсов",
    template: "%s | Каталог курсов",
  },
  description: "Учебный проект каталога курсов по веб-разработке",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-slate-900 hover:text-blue-600"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-black text-white">
                CC
              </span>
              <span>CourseCatalog</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-blue-600">
                Главная
              </Link>
              <Link href="/courses" className="text-slate-600 hover:text-blue-600">
                Курсы
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-blue-600">
                О проекте
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
          <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Учебный проект — Каталог курсов</span>
            <span>Лабораторная работа · Продвинутые веб-технологии</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
