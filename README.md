# 🎓 Каталог курсов — Fullstack Monorepo
### Next.js 16 (App Router) + FastAPI (Python 3.12) + PostgreSQL 18

Учебный полнофункциональный проект, объединяющий современный фронтенд на **Next.js 16 (React 19, Tailwind CSS)**, асинхронный REST API на **FastAPI (Pydantic 2)** и реляционную базу данных **PostgreSQL 18** со строгой схемой данных, ограничениями и индексами.

---

## 🏛️ Архитектура монорепозитория

Проект организован по принципу модульного монорепозитория и состоит из трёх логических частей:

```text
course-catalog/
├── docker-compose.yml     # 🐳 Единый оркестратор запуска всех 3 сервисов
├── package.json           # Корневые команды быстрого запуска
├── STRUCTURE.md           # Обзорная карта архитектуры монорепозитория
├── README.md              # 📖 Главная документация проекта (этот файл)
│
├── frontend/              # 🎨 Клиентское веб-приложение (Next.js 16 + Tailwind CSS)
│   ├── Dockerfile         # Докеризация фронтенда
│   ├── app/               # Страницы: каталог, карточка курса, фильтрация, обработка ошибок
│   ├── components/        # Интерактивные компоненты (LikeButton, EnrollForm, ElectiveFilter)
│   ├── lib/               # Клиент API, модели типов и утилиты
│   ├── ROUTING.md         # Описание маршрутов и компонентов фронтенда
│   └── package.json       # Зависимости Next.js
│
├── backend/               # ⚙️ Асинхронный REST API (FastAPI + Pydantic 2)
│   ├── Dockerfile         # Докеризация бэкенда
│   ├── main.py            # Точка входа, CORS Middleware и эндпоинты
│   ├── models.py          # Модели Pydantic 2 с поддержкой camelCase (CamelModel)
│   ├── data.py            # Мок-хранилище курсов в памяти (до миграции на SQLAlchemy в Лабе 7)
│   ├── ROUTING.md         # Спецификация API-эндпоинтов
│   └── requirements.txt   # Зависимости Python
│
└── DB/                    # 🗄️ База данных PostgreSQL 18 (Лабораторная работа 6)
    ├── docker-init.sql    # Инициализация роли catalog_app и тестовых баз
    ├── schema.sql         # Схема 3 таблиц (courses, students, enrollments) + индексы + FK
    ├── seed.sql           # Начальные данные (6 курсов, 3 студента, 6 записей)
    ├── queries.sql        # SQL-запросы к маршрутам API и аналитика
    ├── experiments/       # Скрипты для EXPLAIN ANALYZE и нормализации
    └── README.md          # Полная документация БД, ER-диаграмма и журнал тестов
```

---

## 🚀 Как запускать проект

Вы можете запустить проект целиком **в одну команду через Docker Compose** (рекомендуется) либо запустить каждый сервис локально по отдельности.

### Способ 1: Всё в один клик через Docker Compose (Рекомендуемый)

Убедитесь, что у вас установлен и запущен **Docker Desktop**. Находясь в корневой папке `course-catalog`:

```bash
# Запуск всех 3 контейнеров (БД + Бэкенд + Фронтенд) в фоновом режиме:
docker compose up -d --build
```
*Либо через npm-скрипт из корня:*
```bash
npm run docker:up
```

#### 🌐 Доступные адреса:
* **Фронтенд (Next.js):** [http://localhost:3000](http://localhost:3000)
* **Бэкенд API (FastAPI):** [http://localhost:8000](http://localhost:8000)
* **Интерактивная документация Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **База данных PostgreSQL:** `localhost:5432`
  * Имя базы: `course_catalog`
  * Пользователь: `catalog_app` (пароль `change-me`) / суперпользователь: `postgres` (пароль `postgres`)
  * При первом старте база автоматически создаёт все таблицы из `schema.sql` и наполняет их данными из `seed.sql`.

#### 🛠️ Полезные команды управления Docker Compose:
```bash
# Посмотреть живые логи всех сервисов:
docker compose logs -f

# Посмотреть логи только бэкенда или БД:
docker compose logs -f backend
docker compose logs -f db

# Остановить все контейнеры:
docker compose down

# Перезапустить контейнеры с очисткой тома базы данных (чистый перезапуск с нуля):
docker compose down -v
docker compose up -d --build
```

---

### Способ 2: Локальный запуск сервисов по отдельности (Для разработки)

Если вы работаете над отдельной частью проекта и хотите запускать код на хост-машине:

#### Шаг 1: Запуск PostgreSQL
Если PostgreSQL не запущен как локальная служба Windows, поднимите контейнер базы:
```bash
docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:18-alpine

# Накатить схему и начальные данные:
# Windows PowerShell:
Get-Content DB\schema.sql -Raw | docker exec -i pg psql -U postgres -d course_catalog -v ON_ERROR_STOP=1
Get-Content DB\seed.sql -Raw | docker exec -i pg psql -U postgres -d course_catalog -v ON_ERROR_STOP=1

# Linux / macOS:
docker exec -i pg psql -U postgres -d course_catalog -v ON_ERROR_STOP=1 < DB/schema.sql
docker exec -i pg psql -U postgres -d course_catalog -v ON_ERROR_STOP=1 < DB/seed.sql
```

#### Шаг 2: Запуск бэкенда на FastAPI (Терминал 1)
```bash
cd backend

# Активация виртуального окружения (при первом запуске: python -m venv .venv):
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# Linux / macOS:
source .venv/bin/activate

# Установка зависимостей:
pip install -r requirements.txt

# Запуск сервера разработки с hot-reload:
fastapi dev main.py
```
*API запустится на `http://localhost:8000` (Swagger: `http://localhost:8000/docs`).*

#### Шаг 3: Запуск фронтенда на Next.js (Терминал 2)
```bash
cd frontend
npm install
npm run dev
```
*Либо прямо из корня репозитория:*
```bash
npm run dev
```
*Интерфейс откроется на `http://localhost:3000`.*

---

## 🏗️ Архитектура запросов и CORS

В приложении чётко разделены сетевые вызовы между сервером Next.js и браузером пользователя:

| № | Действие пользователя | Кто отправляет запрос | Эндпоинт FastAPI | Нужен ли CORS? | Preflight (`OPTIONS`)? |
| :-: | :--- | :--- | :--- | :-: | :-: |
| **1** | Главная `/` и каталог `/courses` | **Сервер Next.js** (Server Component) | `GET /courses` | ❌ Нет (сервер-сервер) | ❌ Нет |
| **2** | Карточка курса `/courses/[id]` | **Сервер Next.js** (Server Component) | `GET /courses/{id}` | ❌ Нет (сервер-сервер) | ❌ Нет |
| **3** | Фильтр элективов `/filter` | **Браузер** (Client Component + SWR) | `GET /courses?is_elective=true` | ✅ **Да** | ❌ Нет (простой GET) |
| **4** | Клик по лайку ❤️ | **Браузер** (Client Component) | `POST /courses/{id}/like` | ✅ **Да** | ❌ Нет (простой POST без тела) |
| **5** | Форма записи на курс | **Браузер** (Client Component) | `POST /enrollments` (JSON) | ✅ **Да** | ✅ **Да (`Content-Type: application/json`)** |

---

## 🗄️ База данных PostgreSQL (Лабораторная работа 6)

Реляционная база данных спроектирована по третьей нормальной форме (3NF) и решает проблему связи «многие-ко-многим» между курсами и студентами через связующую таблицу записей:

```text
[courses] 1 <───── M [enrollments] M ─────> 1 [students]
```

### Ключевые свойства схемы:
1. **Ограничения целостности (Constraints):**
   * `courses.credits > 0` и `courses.likes >= 0` — защита от отрицательных значений.
   * `length(students.name) >= 2` — валидация минимальной длины имени.
   * `UNIQUE (students.email)` — запрет дубликатов email.
   * `UNIQUE (course_id, student_id)` — защита от повторной записи одного студента на один и тот же курс.
2. **Внешние ключи (Foreign Keys):**
   * `course_id REFERENCES courses(id) ON DELETE RESTRICT` — нельзя удалить курс, пока на него записаны студенты.
   * `student_id REFERENCES students(id) ON DELETE CASCADE` — при отчислении студента его записи автоматически удаляются.
3. **Индексы производительности:**
   * `CREATE INDEX enrollments_student_id_idx ON enrollments (student_id);` — ускоряет поиск курсов конкретного студента с линейного поиска `Seq Scan` до логарифмического `Index Scan` при больших объемах данных.

Подробное описание схемы, Mermaid ER-диаграмму и логи экспериментов смотрите в [DB/README.md](file:///c:/Users/Salli95/Desktop/NAS-syn/Bunker/IITU-Уник/Веб/преокт/course-catalog/DB/README.md).

---

## ⚙️ Реализованные компоненты и контракт API (Лабораторная 5)

1. **Контракт API и `CamelModel` (Pydantic 2):**
   * Базовый класс `CamelModel` с `alias_generator=to_camel` и `validate_by_name=True`.
   * Python работает со `snake_case` (`is_elective`, `student_name`, `course_id`), а клиенту отдаёт и принимает строгий `camelCase` (`isElective`, `studentName`, `courseId`).
2. **CORS Middleware:**
   * В FastAPI настроен `CORSMiddleware` с точным списком доверенных источников: `http://localhost:3000` и `http://127.0.0.1:3000`.
3. **Интерактивные клиентские компоненты:**
   * [ElectiveFilter.tsx](file:///c:/Users/Salli95/Desktop/NAS-syn/Bunker/IITU-Уник/Веб/преокт/course-catalog/frontend/components/ElectiveFilter.tsx): фильтрация через библиотеку `swr` с кэшированием и реактивным обновлением.
   * [LikeButton.tsx](file:///c:/Users/Salli95/Desktop/NAS-syn/Bunker/IITU-Уник/Веб/преокт/course-catalog/frontend/components/LikeButton.tsx): отправка простого `POST` без тела, обновляет счётчик лайков из ответа бэкенда.
   * [EnrollForm.tsx](file:///c:/Users/Salli95/Desktop/NAS-syn/Bunker/IITU-Уник/Веб/преокт/course-catalog/frontend/components/EnrollForm.tsx): отправка `POST` с телом `JSON` и заголовком `Content-Type: application/json`. Обрабатывает статус `422 Unprocessable Entity` и `201 Created`.

---

## 🔍 Журнал 5 исследованных поломок CORS и бэкенда

Исследование проводилось по 7-шаговому алгоритму DevTools: анализ строки запроса в **Network**, код статуса, заголовки ответа (`Response Headers`), наличие preflight (`OPTIONS`), логи и traceback в консоли бэкенда.

### Поломка 1: Полное отключение `CORSMiddleware`
* **Действие:** Закомментирован вызов `app.add_middleware(CORSMiddleware, ...)` в `main.py`.
* **Что видно в Console:**
  `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
* **Что видно в Network:**
  * Запросы `/filter` и лайк помечены красным со статусом `CORS error`.
  * Запрос формы `OPTIONS enrollments` получает **405 Method Not Allowed**.
* **Что видно в терминале FastAPI:**
  Сервер выполнил GET и POST запросы и вернул код `200 OK`! Но на запрос `OPTIONS` вернул `405 Method Not Allowed`, так как без middleware маршрут для `OPTIONS` отсутствует.
* **Поведение страницы `/courses` (Server Component):**
  Работает идеально без каких-либо ошибок, так как сервер Next.js обращается напрямую к FastAPI без участия браузера.
* **Причина и диагностика:**
  Бэкенд физически выполняет запросы, но не отправляет браузеру разрешающие заголовки `Access-Control-Allow-Origin`. Статус `405` на `OPTIONS` прямо указывает на отсутствие CORS Middleware.

---

### Поломка 2: Лишний слэш на конце адреса в `allow_origins`
* **Действие:** В `main.py` указано `origins = ["http://localhost:3000/"]`.
* **Что видно в Console:**
  `Access to fetch at 'http://localhost:8000/enrollments' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.`
* **Что видно в Network:**
  Preflight-запрос `OPTIONS` получает ответ **400 Bad Request** (или ответ без `Access-Control-Allow-Origin`), а основной `POST` браузером даже не отправляется.
* **Что видно в терминале FastAPI:**
  Строка лога `INFO: 127.0.0.1:... - "OPTIONS /enrollments HTTP/1.1" 400 Bad Request`.
* **Причина и диагностика:**
  По спецификации W3C/Fetch заголовок `Origin` всегда передаётся **без завершающего слэша** (`http://localhost:3000`). Middleware производит строгое посимвольное сравнение строк (`origin == allowed_origin`), сравнение проваливается, и бэкенд отклоняет запрос.

---

### Поломка 3: Отсутствие метода `OPTIONS` в `allow_methods`
* **Действие:** В `main.py` указано `allow_methods=["GET", "POST"]` без `"OPTIONS"`.
* **Что видно в Console:**
  Браузер блокирует запрос формы: preflight не прошёл проверку разрешённых методов.
* **Что видно в Network:**
  В ответе на `OPTIONS /enrollments` заголовок `Access-Control-Allow-Methods` содержит только `GET, POST` (без `OPTIONS`).
* **Что видно в терминале FastAPI:**
  Запрос `OPTIONS` возвращает 200 OK, но не даёт браузеру права на дальнейший вызов.
* **Причина и диагностика:**
  Для сложных запросов браузер требует явного подтверждения поддержки методов. Рекомендуется использовать `allow_methods=["*"]` или явно перечислять все используемые HTTP-глаголы, включая preflight-проверку.

---

### Поломка 4: Отсутствие заголовка `content-type` в `allow_headers`
* **Действие:** В `main.py` указано `allow_headers=["Authorization"]` (без `Content-Type`).
* **Что видно в Console:**
  `Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.`
* **Что видно в Network:**
  В preflight-запросе браузер отправляет `Access-Control-Request-Headers: content-type`. Бэкенд возвращает ответ, где в `Access-Control-Allow-Headers` отсутствует `content-type`. Основной запрос `POST` блокируется.
* **Поведение GET и лайка:**
  GET-запросы и простой POST-лайк продолжают работать штатно, так как для простых запросов заголовок `Content-Type: application/json` не используется и preflight не инициируется.
* **Причина и диагностика:**
  При отправке JSON-тела заголовок `Content-Type` не является «простым» и требует явного разрешения сервером в `allow_headers`.

---

### Поломка 5: Внутренняя ошибка сервера (500) и маскировка под CORS
* **Действие:** В эндпоинте `/courses` искусственно вызвано исключение `1 / 0` (`ZeroDivisionError`).
* **Что видно в Console:**
  Браузер выдаёт классическую ошибку: `Access to fetch at ... blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
* **Что видно в Network:**
  Статус ответа — **500 Internal Server Error**.
* **Что видно в терминале FastAPI:**
  Полный Python traceback с `ZeroDivisionError: division by zero`.
* **Причина и диагностика:**
  При необработанном падении приложения аварийный ответ 500 генерируется обработчиком ошибок фреймворка в обход `CORSMiddleware`, поэтому ответ не содержит заголовков `access-control-*`. Браузер, не найдя разрешающего заголовка, автоматически выводит стандартную ошибку CORS.
* **Главный вывод:** При возникновении ошибки CORS в браузере первым делом следует проверять числовой код статуса в Network и логи терминала бэкенда, чтобы отличить реальную проблему прав доступа от сбоя логики бэкенда.

---

## 📚 Краткий глоссарий терминов

- **CORS (Cross-Origin Resource Sharing)** — механизм безопасности браузера, запрещающий веб-странице с одного адреса (`origin`) читать ответы сервера с другого адреса, если сервер явно не разрешил это специальными заголовками.
- **Origin (Источник)** — тройка: протокол + хост + порт (например, `http://localhost:3000`). Если хотя бы один элемент отличается, запросы считаются cross-origin.
- **Preflight (Предварительный запрос `OPTIONS`)** — автоматический технический запрос браузера перед отправкой нестандартного запроса (например, с телом JSON). Браузер спрашивает: *«Разрешено ли мне отправить POST с Content-Type: application/json?»*.
- **Simple Request (Простой запрос)** — запрос методами GET, HEAD или POST без нестандартных заголовков и с простым телом (`text/plain`, `x-www-form-urlencoded`, `multipart/form-data`). Для него preflight не требуется.
- **SWR (Stale-While-Revalidate)** — библиотека React для запросов данных: сначала возвращает кэшированные данные (stale), затем отправляет запрос на сервер (revalidate) и обновляет UI свежими данными.
- **CamelModel (Pydantic)** — базовая модель с автоматической трансформацией имен полей из Python `snake_case` в JavaScript `camelCase` при сериализации в JSON.
