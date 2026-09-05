import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "Next.js Course Catalog project for Advanced Web Technologies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              CourseCatalog
            </Link>
            <div className="flex gap-6">
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                About
              </Link>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
