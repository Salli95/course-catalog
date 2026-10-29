# 🏛️ Общая структура проекта (Монорепозиторий)

Проект разделён на три логические части: **`frontend/`**, **`backend/`** и **`DB/`**.

```text
course-catalog/
├── frontend/             # Клиентское приложение на Next.js 16 (App Router) + Tailwind CSS
│   ├── app/              # Страницы каталога, фильтра, обработки ошибок
│   ├── components/       # Интерактивные компоненты (лайк, форма записи, SWR-фильтр)
│   ├── lib/              # Сетевой клиент к API, модели данных и утилиты
│   ├── ROUTING.md        # 📖 Подробное описание структуры и маршрутов фронтенда
│   ├── package.json      # Зависимости фронтенда
│   └── .env.local        # Адреса подключения к бэкенду
│
├── backend/              # Серверный REST API на FastAPI + Pydantic 2
│   ├── main.py           # Точка входа, CORS Middleware и эндпоинты
│   ├── models.py         # Модели данных с поддержкой camelCase (CamelModel)
│   ├── data.py           # База курсов в оперативной памяти
│   ├── ROUTING.md        # 📖 Подробное описание эндпоинтов и моделей бэкенда
│   └── requirements.txt  # Зависимости Python
│
├── DB/                   # 🗄️ Реляционная база данных PostgreSQL 18 (Лабораторная 6)
│   ├── schema.sql        # Схема таблиц, ограничения (CHECK, UNIQUE), FK и индексы
│   ├── seed.sql          # Начальное наполнение (6 курсов, 3 студента, 6 записей)
│   ├── queries.sql       # SQL-запросы для API-маршрутов и аналитики
│   ├── experiments/      # Скрипты бенчмарков (idx_data.sql) и нормализации (norm_demo.sql)
│   └── README.md         # Документация схемы, Mermaid ER-диаграмма и логи тестов
│
├── STRUCTURE.md          # 📖 Этот файл (обзор архитектуры)
├── README.md             # Полная документация проекта и журнал 5 поломок CORS
├── package.json          # Корневые команды быстрого запуска
└── .gitignore            # Игнорируемые файлы (node_modules, .next, .venv, .env*)
```

---

## ⚡ Как запускать проект

### 1. Запуск бэкенда (Терминал 1)
```bash
cd backend
.venv\Scripts\Activate.ps1   # для Windows PowerShell
fastapi dev main.py          # сервер запустится на http://localhost:8000
```

### 2. Запуск фронтенда (Терминал 2)
```bash
cd frontend
npm run dev                  # сайт откроется на http://localhost:3000
```
*Либо прямо из корня репозитория:*
```bash
npm run dev
```

---

## 🔗 Маршруты и взаимодействие

1. **Серверные запросы (Next.js Server Components):**
   * `/courses` и `/courses/[id]` запрашивают данные напрямую с `http://localhost:8000/courses` без участия браузера (CORS не требуется).
2. **Клиентские запросы (Браузер):**
   * `/filter` (SWR-запрос `GET /courses?is_elective=true`)
   * Кнопка лайка (`POST /courses/{id}/like` — простой POST)
   * Форма записи (`POST /enrollments` — JSON POST с preflight-запросом `OPTIONS`)
   * Все клиентские запросы защищены и обрабатываются через настроенный `CORSMiddleware`.

