import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse, getCourses } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div>
        <Link
          href="/courses"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to courses
        </Link>
        <h1 className="text-3xl font-bold mt-2">{course.title}</h1>
      </div>

      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {course.description}
      </p>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Credits: <span className="font-semibold text-gray-700 dark:text-gray-200">{course.credits}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Type: <span className="font-semibold text-gray-700 dark:text-gray-200">{course.isElective ? "Elective" : "Required"}</span>
          </p>
        </div>

        <LikeButton initialLikes={course.likes} />
      </div>
    </div>
  );
}
