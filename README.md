# Каталог курсов — Лабораторная работа 5
## Интеграция Next.js и FastAPI: CORS и контракт API

Учебный полнофункциональный проект, объединяющий фронтенд на **Next.js 16 (App Router)** и REST API бэкенд на **FastAPI (Python 3.12)**.

---

## 🏗️ Архитектура запросов

В приложении четко разделены потоки данных между сервером Next.js и браузером:

| № | Действие пользователя | Кто отправляет запрос | Эндпоинт FastAPI | Нужен ли CORS? | Preflight (`OPTIONS`)? |
| :-: | :--- | :--- | :--- | :-: | :-: |
| **1** | Главная `/` и каталог `/courses` | **Сервер Next.js** (Server Component) | `GET /courses` | ❌ Нет (сервер-сервер) | ❌ Нет |
| **2** | Карточка курса `/courses/[id]` | **Сервер Next.js** (Server Component) | `GET /courses/{id}` | ❌ Нет (сервер-сервер) | ❌ Нет |
| **3** | Фильтр элективов `/filter` | **Браузер** (Client Component + SWR) | `GET /courses?is_elective=true` | ✅ **Да** | ❌ Нет (простой GET) |
| **4** | Клик по лайку ❤ | **Браузер** (Client Component) | `POST /courses/{id}/like` | ✅ **Да** | ❌ Нет (простой POST без тела) |
| **5** | Форма записи на курс | **Браузер** (Client Component) | `POST /enrollments` (JSON) | ✅ **Да** | ✅ **Да (`Content-Type: application/json`)** |

---

## 🚀 Запуск проектов

### 1. Бэкенд (`course-catalog-api`)
```bash
cd backend
# Активация виртуального окружения:
# Windows (PowerShell):
.venv\Scripts\Activate.ps1
# Linux / macOS:
source .venv/bin/activate

# Запуск сервера разработки:
fastapi dev main.py
```
*API будет доступен по адресу:* `http://localhost:8000`  
*Интерактивная документация Swagger UI:* `http://localhost:8000/docs`

### 2. Фронтенд (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```
*Приложение будет доступно по адресу:* `http://localhost:3000`

---

## ⚙️ Реализованные компоненты и логика

1. **Контракт API и `CamelModel` (Pydantic 2):**
   - На бэкенде создан базовый класс `CamelModel` с `alias_generator=to_camel` и `validate_by_name=True`.
   - Python работает со `snake_case` (`is_elective`, `student_name`, `course_id`), а клиенту отдаёт и принимает строгий `camelCase` (`isElective`, `studentName`, `courseId`).
   - Query-параметры объявляются в сигнатуре функций FastAPI и остаются в `snake_case` (`/courses?is_elective=true`).

2. **CORS Middleware:**
   - На бэкенде подключен `CORSMiddleware` с точным адресом фронтенда `origins = ["http://localhost:3000"]` (без завершающего слэша!).
   - Чужие origins (например, `evil.com` или несоответствующий `127.0.0.1:3000`) отсекаются браузером.

3. **Сборка без бэкенда (`npm run build`):**
   - Из `app/courses/[id]/page.tsx` удален `generateStaticParams`.
   - Страницы курсов переведены на серверный рендеринг по требованию (`ƒ Dynamic`), благодаря чему сборка завершается успешно даже при выключенном API.

4. **Обработка состояний:**
   - `loading.tsx`: скелетон при ожидании ответа сервера.
   - `not-found.tsx`: страница 404, если бэкенд вернул 404 для неизвестного курса.
   - `error.tsx`: клиентский компонент обработки сбоев с кнопкой `retry()`, позволяющей повторить запрос без перезагрузки всей страницы.

5. **Клиентские компоненты:**
   - `ElectiveFilter.tsx`: динамическая фильтрация через библиотеку `swr` с кэшированием и реактивным обновлением.
   - `LikeButton.tsx`: отправка простого `POST` без тела, обновляет счётчик лайков из ответа бэкенда.
   - `EnrollForm.tsx`: отправка `POST` с телом `JSON` и заголовком `Content-Type: application/json`. Обрабатывает статус `422 Unprocessable Entity` (валидация имени от 2 символов) и статус `201 Created`.

---

## 🔍 Журнал 5 исследованных поломок CORS и бэкенда

Исследование проводилось по 7-шаговому алгоритму DevTools: анализ строки запроса в **Network**, код статуса, заголовки ответа (`Response Headers`), наличие preflight (`OPTIONS`), логи и traceback в консоли бэкенда.

### Поломка 1: Полное отключение `CORSMiddleware`
* **Действие:** Закомментирован вызов `app.add_middleware(CORSMiddleware, ...)` в `main.py`.
* **Что видно в Console:**
  `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
* **Что видно в Network:**
  - Запросы `/filter` и лайк помечены красным со статусом `CORS error`.
  - Запрос формы `OPTIONS enrollments` получает **405 Method Not Allowed**.
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
  Preflight-запрос `OPTIONS enrollments` завершается с кодом **400 Bad Request**. В теле ответа: `Disallowed CORS origin`. Сам целевой `POST`-запрос браузером даже не отправляется.
* **Что видно в терминале FastAPI:**
  `INFO: 127.0.0.1:xxxxx - "OPTIONS /enrollments HTTP/1.1" 400 Bad Request`.
* **Причина и диагностика:**
  Стандарт CORS требует строгого посимвольного совпадения Origin (схема + хост + порт без пути и слэша). Браузер шлёт `Origin: http://localhost:3000`, а бэкенд ожидает `http://localhost:3000/`. Из-за несовпадения preflight отклоняется.

---

### Поломка 3: Отсутствие метода `POST` в `allow_methods`
* **Действие:** В `main.py` указано `allow_methods=["GET"]` вместо `["*"]`.
* **Что видно при клике на LikeButton (простой POST):**
  Лайк проходит успешно (`200 OK`)! Потому что простой POST без тела не требует предварительного согласования `OPTIONS`, а заголовок `Origin: http://localhost:3000` совпадает с разрешённым.
* **Что видно при отправке формы записи (POST с JSON):**
  - Preflight-запрос `OPTIONS enrollments` завершается с кодом **400 Bad Request**.
  - В заголовках ответа приходит `access-control-allow-methods: GET`.
  - В консоли браузера: `Response to preflight request doesn't pass access control check: It does not have HTTP ok status.`
* **Причина и диагностика:**
  Запрос с `Content-Type: application/json` не является простым и требует preflight. Браузер отправляет заголовок `Access-Control-Request-Method: POST`. Так как метод `POST` отсутствует в `allow_methods`, бэкенд возвращает статус 400 (`Disallowed CORS method`).

---

### Поломка 4: Несовпадение хостов (`localhost:3000` против `127.0.0.1:3000`)
* **Действие:** Фронтенд открыт в браузере по адресу `http://127.0.0.1:3000`, тогда как в бэкенде разрешён только `http://localhost:3000`.
* **Что видно в Console:**
  `Access to fetch at 'http://localhost:8000/courses' from origin 'http://127.0.0.1:3000' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:3000' that is not equal to the supplied origin.`
* **Что видно в Network:**
  Запрос красный со статусом `CORS error`.
* **Что видно в заголовках ответа:**
  Бэкенд вернул `access-control-allow-origin: http://localhost:3000`, но браузер сравнил его с текущим origin страницы (`http://127.0.0.1:3000`), обнаружил несовпадение и заблокировал передачу данных в JS.
* **Причина и диагностика:**
  В правиле Same-Origin Policy доменные имена `localhost` и `127.0.0.1` считаются абсолютно разными источниками. Необходимо либо открывать сайт по адресу из списка разрешённых, либо явно добавлять оба варианта в `origins`.

---

### Поломка 5: Внутренняя ошибка сервера (500 Python), маскирующаяся под ошибку CORS
* **Действие:** В функции `list_courses` в `main.py` допущена опечатка в словаре: `p["ofset"]` вместо `p["offset"]`.
* **Что видно в браузере на странице `/filter`:**
  В интерфейсе сообщение «Не удалось загрузить курсы». В консоли браузера красная ошибка:
  `Access to fetch at 'http://localhost:8000/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
  В Network строка `courses` красная со статусом `500 Internal Server Error`.
* **Что видно на странице `/courses` (Server Component):**
  Next.js сервер перехватывает сбой `fetch` и показывает компонент `app/courses/error.tsx` («Что-то пошло не так»). CORS здесь вообще ни при чём!
* **Что видно в терминале FastAPI:**
  Статус `500 Internal Server Error` и красный Python traceback:
  `KeyError: 'ofset'`.
* **Причина и диагностика:**
  Необработанное исключение Python в роуте привело к падению сервера. Аварийный ответ 500 генерируется обработчиком ошибок фреймворка в обход `CORSMiddleware`, поэтому ответ не содержит заголовков `access-control-*`. Браузер, не найдя разрешающего заголовка, автоматически выводит стандартную ошибку CORS.
* **Главный вывод:** При возникновении ошибки CORS в браузере первым делом следует проверять числовой код статуса в Network и логи терминала бэкенда, чтобы отличить реальную проблему прав доступа от сбоя логики бэкенда.

---

## 📚 Краткий глоссарий терминов

- **CORS (Cross-Origin Resource Sharing)** — механизм безопасности браузера, запрещающий веб-странице с одного адреса (`origin`) читать ответы сервера с другого адреса, если сервер явно не разрешил это специальными заголовками.
- **Origin (Источник)** — тройка: протокол + хост + порт (например, `http://localhost:3000`). Если хотя бы один элемент отличается, запросы считаются cross-origin.
- **Preflight (Предварительный запрос `OPTIONS`)** — автоматический технический запрос браузера перед отправкой нестандартного запроса (например, с телом JSON). Браузер спрашивает: «Разрешено ли мне отправить POST с Content-Type: application/json?».
- **Simple Request (Простой запрос)** — запрос методами GET, HEAD или POST без нестандартных заголовков и с простым телом (`text/plain`, `x-www-form-urlencoded`, `multipart/form-data`). Для него preflight не требуется.
- **SWR (Stale-While-Revalidate)** — библиотека React для запросов данных: сначала возвращает кэшированные данные (stale), затем отправляет запрос на сервер (revalidate) и обновляет UI свежими данными.
- **CamelModel (Pydantic)** — базовая модель с автоматической трансформацией имен полей из Python `snake_case` в JavaScript `camelCase` при сериализации в JSON.
