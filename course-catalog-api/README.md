# Course Catalog API

A standalone backend project built with FastAPI and Pydantic for the Course Catalog.

## How to run

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```
2. Activate it:
   - Windows: `.venv\Scripts\Activate.ps1` or `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the development server:
   ```bash
   fastapi dev main.py
   ```

## What was verified

- `GET /` returns a welcome message.
- `GET /courses` returns 6 courses, sorted by popularity (ai-integration is first).
- `GET /courses/web-security` returns the correct single course.
- `GET /courses/nope` returns a `404` error with detail "Course not found".
- `GET /courses?is_elective=true` returns 2 courses.
- `GET /courses?is_elective=false` returns 4 courses.
- `GET /courses?sort=title` returns courses sorted alphabetically by title.
- `GET /courses?page=2&page_size=2` returns `web-security` and `backend-fastapi`.

