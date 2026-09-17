import type { Course } from "./courses";

export type Query = Record<string, string | string[] | undefined>;

export function first(value: Query[string]): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function filterCourses(courses: Course[], query: Query): Course[] {
  const q = first(query.q).trim().toLowerCase();
  const type = first(query.type);
  const sort = first(query.sort);

  const result = courses.filter((course) => {
    if (q && !course.title.toLowerCase().includes(q)) return false;
    if (type === "required" && course.isElective) return false;
    if (type === "elective" && !course.isElective) return false;
    return true;
  });

  return [...result].sort((a, b) => {
    if (sort === "popular") return b.likes - a.likes || a.title.localeCompare(b.title);
    if (sort === "credits") return b.credits - a.credits || a.title.localeCompare(b.title);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });
}
