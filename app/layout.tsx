import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html lang="ru" className={cn("font-sans", geist.variable)}>
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased">
        <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white shadow-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-600 transition"
            >
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs sm:text-sm font-black text-white">
                CC
              </span>
              <span className="truncate">CourseCatalog</span>
            </Link>

            {/* Десктопное меню */}
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 transition">
                Главная
              </Link>
              <Link href="/courses" className="text-slate-600 hover:text-emerald-600 transition">
                Курсы
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition">
                О проекте
              </Link>
            </nav>

            {/* Мобильное раскрывающееся меню на нативном details/summary без use client */}
            <details className="sm:hidden group relative">
              <summary
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                aria-label="Меню навигации"
              >
                <svg
                  className="h-5 w-5 block group-open:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className="h-5 w-5 hidden group-open:block text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </summary>
              <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                <Link
                  href="/"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  Главная
                </Link>
                <Link
                  href="/courses"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  Курсы
                </Link>
                <Link
                  href="/about"
                  className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  О проекте
                </Link>
              </div>
            </details>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-6 sm:py-8">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-5 text-center text-xs sm:text-sm text-slate-500">
          <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Учебный проект — Каталог курсов</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
