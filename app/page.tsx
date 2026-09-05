import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to Course Catalog
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Explore our curated selection of web development and software engineering courses designed to elevate your skills.
      </p>
      <div>
        <Link
          href="/courses"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          View All Courses
        </Link>
      </div>
    </div>
  );
}
