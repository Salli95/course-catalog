import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="text-center py-12 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Course Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        The course you are looking for does not exist or has been removed.
      </p>
      <div>
        <Link
          href="/courses"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    </div>
  );
}
