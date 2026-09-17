export type CourseDetails = {
  area: string;
  symbol: string;
  color: string;
  topics: string[];
  outcome: string;
  prerequisites: string;
};

export const courseDetails: Record<string, CourseDetails> = {
  "modern-frontend": {
    area: "Frontend",
    symbol: "</>",
    color: "emerald",
    topics: [
      "React components & composition",
      "Server and Client Components",
      "App Router & dynamic pages",
      "TypeScript & accessible interfaces",
    ],
    outcome: "Научитесь собирать отзывчивые интерфейсы с помощью React 19 и Next.js.",
    prerequisites: "Базовые знания HTML, CSS и современного JavaScript.",
  },
  "backend-fastapi": {
    area: "Backend",
    symbol: "{ }",
    color: "amber",
    topics: [
      "Async Python foundations",
      "REST endpoints & validation",
      "Pydantic data models",
      "API documentation & testing",
    ],
    outcome: "Научитесь проектировать асинхронные REST API и валидировать схемы данных.",
    prerequisites: "Основы Python и понимание протокола HTTP.",
  },
  "databases-postgresql": {
    area: "Databases",
    symbol: "SQL",
    color: "indigo",
    topics: [
      "Relational schema design",
      "Queries, joins & constraints",
      "SQLAlchemy models",
      "Schema migrations with Alembic",
    ],
    outcome: "Научитесь проектировать реляционные базы данных и управлять миграциями.",
    prerequisites: "Базовое понимание программирования и работы серверных приложений.",
  },
  "api-design": {
    area: "Architecture",
    symbol: "REST",
    color: "sky",
    topics: [
      "Resources & HTTP semantics",
      "GraphQL schemas & queries",
      "Pagination & error responses",
      "API design trade-offs",
    ],
    outcome: "Поймёте ключевые различия и сценарии выбора между REST и GraphQL.",
    prerequisites: "Знакомство с форматом JSON и HTTP-запросами.",
  },
  "web-security": {
    area: "Security",
    symbol: "SEC",
    color: "red",
    topics: [
      "Authentication with JWT & OAuth2",
      "XSS prevention",
      "CSRF protection",
      "SQL injection & safe queries",
    ],
    outcome: "Освоите защиту веб-приложений от типовых уязвимостей и атак.",
    prerequisites: "Базовые знания фронтенда, бэкенда и баз данных.",
  },
  "ai-integration": {
    area: "AI",
    symbol: "AI",
    color: "purple",
    topics: [
      "LLM API requests",
      "Prompt structure & context",
      "Structured responses",
      "Errors, cost limits & safe key handling",
    ],
    outcome: "Научитесь интегрировать языковые модели в реальные веб-сервисы.",
    prerequisites: "Опыт работы с JavaScript или Python и вызовами API.",
  },
};

export function detailsFor(id: string): CourseDetails {
  return (
    courseDetails[id] ?? {
      area: "Разработка",
      symbol: "WEB",
      color: "slate",
      topics: [
        "Основы веб-технологий",
        "Архитектура приложений",
        "Работа с данными",
        "Развёртывание проектов",
      ],
      outcome: "Изучение базовых практик создания веб-сервисов.",
      prerequisites: "Основы программирования.",
    }
  );
}
