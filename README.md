# course-catalog

Учебный fullstack-проект каталога курсов: Next.js (клиент), FastAPI (REST API) и PostgreSQL (база данных).

## Структура репозитория

```text
course-catalog/
├── docker-compose.yml     # запуск сервисов в Docker
├── package.json           # корневые скрипты
├── frontend/              # клиентское приложение (Next.js 16, TypeScript, Tailwind)
├── backend/               # REST API сервис (FastAPI, Python 3.12, Pydantic)
└── DB/                    # база данных PostgreSQL (схема, данные, запросы, тесты)
```

## Запуск проекта

### 1. Через Docker Compose

Для запуска всех сервисов одновременно:

```bash
docker compose up -d --build
```

Адреса сервисов:
- Фронтенд: http://localhost:3000
- API (FastAPI): http://localhost:8000
- Документация Swagger UI: http://localhost:8000/docs
- PostgreSQL: `localhost:5433` (база `course_catalog`, пользователь `catalog_app`, пароль `change-me`)

Остановка:
```bash
docker compose down
```

### 2. Локальный запуск сервисов

#### База данных (PostgreSQL)
Если используется локальный PostgreSQL (порт 5432):
```powershell
# из папки DB:
Get-Content schema.sql -Raw | psql -U catalog_app -d course_catalog
Get-Content seed.sql -Raw | psql -U catalog_app -d course_catalog
```

#### Бэкенд (FastAPI)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/macOS:
source .venv/bin/activate

pip install -r requirements.txt
fastapi dev main.py
```

#### Фронтенд (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## Схема базы данных (Лабораторная 6)

Схема реализует отношение «многие-ко-многим» (M:N) через таблицу `enrollments`:

```text
courses (1) <--- (M) enrollments (M) ---> (1) students
```

- `courses`: каталог учебных курсов (первичный ключ — текстовый слаг `id`).
- `students`: зарегистрированные студенты (первичный ключ — `id bigint identity`, `email` с ограничением `UNIQUE`).
- `enrollments`: связующая таблица записей студентов на курсы (`UNIQUE (course_id, student_id)`, индекс на `student_id`).
- Политики удаления: `ON DELETE RESTRICT` для курсов, `ON DELETE CASCADE` для студентов.

Подробное описание схемы, планы выполнения запросов (`EXPLAIN ANALYZE`) и результаты тестирования констрейнтов приведены в файле `DB/README.md`.
