# 🧭 Навигация и маршрутизация: Frontend (Next.js 16)

Этот файл описывает архитектуру и структуру папок фронтенда, а также назначение каждого файла и маршрута.

---

## 📁 Структура директории `frontend/`

```text
frontend/
├── app/                     # Маршрутизация App Router (страницы и спец-файлы Next.js)
│   ├── layout.tsx           # Корневой шаблон: шапка сайта, меню, подвал
│   ├── page.tsx             # Маршрут '/' — главная страница
│   ├── about/               # Маршрут '/about' — страница о проекте
│   ├── filter/              # Маршрут '/filter' — фильтрация через SWR
│   └── courses/             # Маршруты каталога курсов
│       ├── page.tsx         # Маршрут '/courses' — каталог с поиском и фильтрами
│       ├── loading.tsx      # Скелетон загрузки каталога
│       ├── not-found.tsx    # Экран 404 для несуществующих курсов
│       ├── error.tsx        # Обработчик ошибок с кнопкой retry()
│       └── [id]/            # Динамический маршрут '/courses/[id]'
│           └── page.tsx     # Детальная страница курса (лайк + форма записи)
├── components/              # React-компоненты
│   ├── CourseCard.tsx       # Карточка курса в сетке
│   ├── LikeButton.tsx       # Кнопка лайка (простой POST без preflight)
│   ├── EnrollForm.tsx       # Форма записи на курс (JSON POST + preflight OPTIONS)
│   ├── ElectiveFilter.tsx   # Клиентский фильтр элективов на SWR
│   └── ui/                  # Базовые UI-компоненты (button, card)
├── lib/                     # Логика данных и утилиты
│   ├── courses.ts           # Сетевые функции getCourses, getCourse (кэш: no-store)
│   ├── catalog.ts           # Фильтрация и сортировка курсов на сервере
│   ├── course-details.ts    # Темы, результаты обучения, пререквизиты
│   └── utils.ts             # Утилита объединения классов cn (clsx + twMerge)
├── .env.local               # Переменные API_URL и NEXT_PUBLIC_API_URL
├── package.json             # Зависимости и скрипты запуска фронтенда
└── next.config.ts           # Конфигурация Next.js
```

---

## 🗺️ Карта маршрутов страниц (App Router)

| Путь (URL) | Файл реализации | Тип рендеринга | Описание |
| :--- | :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | Server Component (`ƒ Dynamic`) | Главная страница с кратким анонсом и топ-3 популярными курсами |
| **`/courses`** | `app/courses/page.tsx` | Server Component (`ƒ Dynamic`) | Каталог всех курсов с поиском, радио-фильтрами и сортировкой |
| **`/courses/[id]`** | `app/courses/[id]/page.tsx` | Server Component (`ƒ Dynamic`) | Детальная страница курса. Содержит карточку описания, кнопку `LikeButton` и форму `EnrollForm` |
| **`/filter`** | `app/filter/page.tsx` | Client Component (`use client`) | Страница с интерактивным чекбоксом элективов на базе библиотеки **SWR** |
| **`/about`** | `app/about/page.tsx` | Server Component (Static) | Описание учебного проекта, стек технологий |

---

## ⚡ Специальные файлы Next.js в `app/courses/`

1. **`loading.tsx`** — отображается автоматически фреймворком Next.js, пока серверный компонент ждет ответа от бэкенда FastAPI. Содержит анимированный скелетон (`animate-pulse`).
2. **`not-found.tsx`** — отображается, когда вызывается функция `notFound()`. Например, если бэкенд вернул `404 Not Found` на запрос курса по несуществующему идентификатору.
3. **`error.tsx`** — клиентский перехватчик ошибок (Error Boundary). Срабатывает, если бэкенд отключен или вернул 500 ошибку. Содержит кнопку «Попробовать снова», которая вызывает `retry()`.

---

## 🚀 Запуск фронтенда

Из папки `frontend/`:
```bash
npm install
npm run dev     # dev-сервер на http://localhost:3000
npm run build   # проверка продакшн-сборки
```
Либо из корневой папки проекта:
```bash
npm run dev
npm run build
```

