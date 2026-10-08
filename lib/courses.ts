export type Course = {
  id: string;
  title: string;
  description: string;
  credits: number;
  isElective: boolean;
  likes: number;
};

const API_URL = "http://127.0.0.1:8000";

// Вспомогательная функция для маппинга данных из API (snake_case) во фронтенд (camelCase)
function mapCourseFromApi(apiCourse: any): Course {
  return {
    id: apiCourse.id,
    title: apiCourse.title,
    description: apiCourse.description,
    credits: apiCourse.credits,
    isElective: apiCourse.is_elective, // Важное преобразование!
    likes: apiCourse.likes,
  };
}

export async function getCourses(): Promise<Course[]> {
  try {
    // Делаем запрос к нашему бэкенду на FastAPI
    const res = await fetch(`${API_URL}/courses`, {
      cache: "no-store", // Отключаем кэш, чтобы видеть актуальные данные
    });
    
    if (!res.ok) {
      console.error("Failed to fetch courses from API");
      return [];
    }
    
    const data = await res.json();
    return data.map(mapCourseFromApi);
  } catch (error) {
    console.error("Error connecting to FastAPI:", error);
    return [];
  }
}

export async function getCourse(id: string): Promise<Course | undefined> {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      cache: "no-store",
    });
    
    // Если FastAPI вернул 404 (курс не найден), возвращаем undefined
    // (А Next.js уже сам перехватит это и покажет not-found.tsx)
    if (res.status === 404) {
      return undefined;
    }
    
    if (!res.ok) {
      console.error(`Failed to fetch course ${id}`);
      return undefined;
    }
    
    const data = await res.json();
    return mapCourseFromApi(data);
  } catch (error) {
    console.error(`Error connecting to FastAPI for course ${id}:`, error);
    return undefined;
  }
}
