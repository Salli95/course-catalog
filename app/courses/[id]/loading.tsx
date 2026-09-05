export default function CourseLoading() {
  return (
    <div className="py-12 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span className="text-lg">Loading course...</span>
      </div>
    </div>
  );
}
