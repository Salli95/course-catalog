# 🧭 Навигация и маршрутизация: Backend (FastAPI + Pydantic)

Этот файл описывает архитектуру и структуру папок бэкенда, маршруты API (эндпоинты), модели данных и настройки CORS.

---

## 📁 Структура директории `backend/`

```text
backend/
├── main.py              # Точка входа: инициализация FastAPI, CORS Middleware и все роуты
├── models.py            # Модели Pydantic: CamelModel, Course, Enrollment, EnrollmentIn
├── data.py              # Хранилище данных в оперативной памяти (COURSES, find_course)
├── requirements.txt     # Python-зависимости (fastapi, uvicorn, pydantic)
├── README.md            # Инструкция по установке и ручной проверке
└── .venv/               # Виртуальное окружение Python (не коммитится в Git)
```

---

## 📡 Карта эндпоинтов API (`main.py`)

| Метод | URL (эндпоинт) | Коды ответа | Описание и назначение |
| :--- | :--- | :---: | :--- |
| **`GET`** | **`/`** | `200` | Проверка работоспособности сервиса (Health check) |
| **`GET`** | **`/courses`** | `200` | Получение списка курсов. Поддерживает параметры строки запроса:<br>• `is_elective` (bool) — фильтрация элективов<br>• `sort` (popular / title) — сортировка<br>• `page`, `page_size` — пагинация |
| **`GET`** | **`/courses/{course_id}`** | `200`, `404` | Получение одного курса по его текстовому ID |
| **`POST`** | **`/courses/{course_id}/like`** | `200`, `404` | Инкремент счётчика лайков курса (`course.likes += 1`). Возвращает обновлённый объект курса |
| **`POST`** | **`/enrollments`** | `201`, `404`, `422` | Запись студента на курс. Принимает JSON: `{ "courseId": "...", "studentName": "..." }`. Возвращает созданную запись с новым `id` |
| **`GET`** | **`/enrollments`** | `200` | Получение списка всех сохранённых в памяти записей |

---

## 🧩 Контракт данных и модели (`models.py`)

1. **`CamelModel(BaseModel)`**:
   Базовый класс Pydantic с настройкой `alias_generator=to_camel` и `validate_by_name=True`.
   * **Назначение:** Переводит имена полей из `snake_case` (в Python) в `camelCase` (в JSON для фронтенда).
   * **Пример:** Поле `is_elective` в Python автоматически отдается клиенту как `isElective`.
2. **`Course(CamelModel)`**:
   Модель курса (`id`, `title`, `description`, `credits`, `isElective`, `likes`).
3. **`EnrollmentIn(CamelModel)`**:
   Входные данные заявки (`courseId: str`, `studentName: str = Field(min_length=2)`). При длине имени менее 2 символов FastAPI сам возвращает статус `422`.
4. **`Enrollment(EnrollmentIn)`**:
   Итоговая запись, включающая присвоенный сервером целочисленный `id`.

---

## 🔒 Настройки CORS (`main.py`)

* Разрешённый источник (Origin): `http://localhost:3000` (строго без завершающего слэша!).
* `allow_credentials=True`
* `allow_methods=["*"]` (разрешены все методы, включая GET, POST, OPTIONS)
* `allow_headers=["*"]` (разрешены все заголовки, включая `Content-Type`)

---

## 🚀 Запуск бэкенда

Из папки `backend/`:
```bash
# Активация виртуального окружения (Windows PowerShell):
.venv\Scripts\Activate.ps1

# Запуск сервера разработки:
fastapi dev main.py
```
* **Адрес API:** `http://localhost:8000`
* **Swagger UI (интерактивная документация):** `http://localhost:8000/docs`

