# Course Catalog API — Лабораторная работа 5

REST API бэкенд на **FastAPI** и **Pydantic 2** для каталога курсов.

## 🚀 Запуск сервера

1. Перейдите в каталог бэкенда:
   ```bash
   cd course-catalog-api
   ```
2. Активируйте виртуальное окружение:
   - Windows PowerShell: `.venv\Scripts\Activate.ps1`
   - Linux / macOS: `source .venv/bin/activate`
3. Установите зависимости (при необходимости):
   ```bash
   pip install -r requirements.txt
   ```
4. Запустите dev-сервер:
   ```bash
   fastapi dev main.py
   ```
*API доступен по адресу:* `http://localhost:8000`  
*Swagger UI:* `http://localhost:8000/docs`

---

## 🛠️ Реализованный функционал

- **CORS:** Настроен `CORSMiddleware` для источника `http://localhost:3000`.
- **Сериализация camelCase:** Все ответы и тела запросов используют `camelCase` благодаря `CamelModel` (`isElective`, `studentName`, `courseId`).
- **Маршруты:**
  - `GET /` — приветственное сообщение.
  - `GET /courses` — список курсов с сортировкой, фильтрацией (`is_elective`) и пагинацией.
  - `GET /courses/{id}` — получение курса по ID (404, если не найден).
  - `POST /courses/{id}/like` — инкремент счётчика лайков (200 OK / 404 Not Found).
  - `POST /enrollments` — запись студента на курс (201 Created / 404 Not Found / 422 Unprocessable Entity при имени короче 2 символов).
  - `GET /enrollments` — список всех сделанных записей.
